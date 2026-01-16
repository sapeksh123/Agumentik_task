import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../model/product.dart';
import '../widgets/product_tile.dart';
import '../services/socket_service.dart';

class ProductListScreen extends StatefulWidget {
  const ProductListScreen({Key? key}) : super(key: key);

  @override
  State<ProductListScreen> createState() => _ProductListScreenState();
}

class _ProductListScreenState extends State<ProductListScreen> {
  List<Product> products = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    loadProducts();

    SocketService.socket.on("stockUpdated", (_) {
      loadProducts();
    });
  }

  Future<void> loadProducts() async {
    setState(() => isLoading = true);
    products = await ApiService.getProducts();
    if (mounted) {
      setState(() => isLoading = false);
    }
  }

  void showOrderDialog(Product product) {
    final qtyController = TextEditingController();

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Place Order"),
        content: TextField(
          controller: qtyController,
          keyboardType: TextInputType.number,
          decoration: InputDecoration(
            labelText: "Enter quantity",
            hintText: "Available: ${product.stock}",
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () async {
              final qty = int.tryParse(qtyController.text) ?? 0;
              Navigator.pop(context);

              final result = await ApiService.placeOrder(product.id, qty);

              if (!mounted) return;

              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    result == "success" ? "Order placed successfully" : result,
                  ),
                  backgroundColor: result == "success"
                      ? Colors.green
                      : Colors.red,
                ),
              );

              if (result == "success") {
                loadProducts();
              }
            },
            child: const Text("Place Order"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Inventory")),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                final product = products[index];
                return ProductTile(
                  product: product,
                  onTap: () => showOrderDialog(product),
                );
              },
            ),
    );
  }
}

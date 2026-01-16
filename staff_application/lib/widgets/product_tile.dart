import 'package:flutter/material.dart';
import '../model/product.dart';

class ProductTile extends StatelessWidget {
  final Product product;
  final VoidCallback onTap;

  const ProductTile({Key? key, required this.product, required this.onTap})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(product.name),
      subtitle: Text("Available: ${product.stock}"),
      trailing: const Icon(Icons.shopping_cart),
      onTap: onTap,
    );
  }
}

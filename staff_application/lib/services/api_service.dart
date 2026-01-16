import 'dart:convert';
import 'package:http/http.dart' as http;
import '../model/product.dart';

class ApiService {
  static const baseUrl = "http://10.0.2.2:5000/api";

  static Future<List<Product>> getProducts() async {
    final res = await http.get(Uri.parse("$baseUrl/products"));

    print("📥 Status Code: ${res.statusCode}");
    print("📥 Body: ${res.body}");

    if (res.statusCode == 200) {
      final decoded = jsonDecode(res.body);

      // extract only the list
      final List data = decoded['data'];

      return data.map((e) => Product.fromJson(e)).toList();
    } else {
      throw Exception("Failed to load products");
    }
  }

  static Future<String> placeOrder(String productId, int qty) async {
    final res = await http.post(
      Uri.parse("$baseUrl/orders"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"productId": productId, "quantity": qty}),
    );

    final data = jsonDecode(res.body);

    if (res.statusCode == 200 && data['success'] == true) {
      return "success";
    } else {
      return data['message'] ?? "Order failed";
    }
  }
}

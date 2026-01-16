class Product {
  final String id;
  final String name;
  final int stock;

  Product({required this.id, required this.name, required this.stock});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(id: json['_id'], name: json['name'], stock: json['stock']);
  }
}

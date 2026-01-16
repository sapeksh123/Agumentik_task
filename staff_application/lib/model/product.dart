// class Product {
//   final String id;
//   final String name;
//   final int stock;

//   Product({required this.id, required this.name, required this.stock});

//   factory Product.fromJson(Map<String, dynamic> json) {
//     return Product(id: json['_id'], name: json['name'], stock: json['stock']);
//   }
// }

class Product {
  final String id;
  final String name;
  final String description;
  final int stock;
  final double price;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.stock,
    required this.price,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['_id'],
      name: json['name'],
      description: json['description'] ?? '',
      stock: json['stock'],
      price: (json['price'] as num).toDouble(),
    );
  }
}

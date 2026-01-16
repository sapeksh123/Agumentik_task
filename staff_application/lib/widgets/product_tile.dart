import 'package:flutter/material.dart';
import '../model/product.dart';

class ProductTile extends StatefulWidget {
  final Product product;
  final VoidCallback onTap;

  const ProductTile({Key? key, required this.product, required this.onTap})
    : super(key: key);

  @override
  State<ProductTile> createState() => _ProductTileState();
}

class _ProductTileState extends State<ProductTile>
    with SingleTickerProviderStateMixin {
  late AnimationController _scaleController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _scaleController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 100),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _scaleController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _scaleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bool outOfStock = widget.product.stock <= 0;
    final bool lowStock =
        widget.product.stock > 0 && widget.product.stock <= 10;

    return ScaleTransition(
      scale: _scaleAnimation,
      child: GestureDetector(
        onTapDown: outOfStock ? null : (_) => _scaleController.forward(),
        onTapUp: outOfStock
            ? null
            : (_) {
                _scaleController.reverse();
                widget.onTap();
              },
        onTapCancel: outOfStock ? null : () => _scaleController.reverse(),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                // Product Icon
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    color: outOfStock
                        ? Colors.grey.shade100
                        : Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.inventory_2_rounded,
                    size: 30,
                    color: outOfStock
                        ? Colors.grey.shade400
                        : Colors.blue.shade600,
                  ),
                ),
                const SizedBox(width: 16),

                // Product Details
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.product.name,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: outOfStock
                              ? Colors.grey.shade500
                              : const Color(0xFF2D3748),
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 6),
                      Row(
                        children: [
                          Icon(
                            Icons.currency_rupee,
                            size: 14,
                            color: Colors.grey.shade600,
                          ),
                          Text(
                            widget.product.price.toStringAsFixed(2),
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w600,
                              color: Colors.grey.shade700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: outOfStock
                              ? Colors.red.shade50
                              : lowStock
                              ? Colors.orange.shade50
                              : Colors.green.shade50,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: outOfStock
                                ? Colors.red.shade200
                                : lowStock
                                ? Colors.orange.shade200
                                : Colors.green.shade200,
                          ),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              outOfStock
                                  ? Icons.cancel_outlined
                                  : lowStock
                                  ? Icons.warning_amber_rounded
                                  : Icons.check_circle_outline,
                              size: 14,
                              color: outOfStock
                                  ? Colors.red.shade700
                                  : lowStock
                                  ? Colors.orange.shade700
                                  : Colors.green.shade700,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              outOfStock
                                  ? "Out of stock"
                                  : lowStock
                                  ? "Low: ${widget.product.stock}"
                                  : "Stock: ${widget.product.stock}",
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: outOfStock
                                    ? Colors.red.shade700
                                    : lowStock
                                    ? Colors.orange.shade700
                                    : Colors.green.shade700,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                // Action Button
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: outOfStock
                        ? Colors.grey.shade100
                        : Colors.blue.shade600,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.shopping_cart_rounded,
                    color: outOfStock ? Colors.grey.shade400 : Colors.white,
                    size: 22,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

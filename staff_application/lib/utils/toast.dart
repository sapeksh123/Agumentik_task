import 'package:flutter/material.dart';

void showToast(BuildContext context, String msg, {bool error = false}) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(msg),
      backgroundColor: error ? Colors.red : Colors.green,
      duration: const Duration(seconds: 2),
    ),
  );
}

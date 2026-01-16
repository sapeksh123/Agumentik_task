import dotenv from "dotenv";
import connectDB from "./db.js";
import Product from "../models/productModel.js";

dotenv.config();

const sampleProducts = [
    {
        name: "Laptop",
        description: "High-performance laptop for professionals",
        price: 1299.99,
        stock: 15
    },
    {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with long battery life",
        price: 29.99,
        stock: 2
    },
    {
        name: "USB-C Cable",
        description: "Fast charging USB-C cable",
        price: 12.99,
        stock: 0
    },
    {
        name: "Monitor",
        description: "27-inch 4K monitor with HDR support",
        price: 449.99,
        stock: 8
    },
    {
        name: "Keyboard",
        description: "Mechanical keyboard with RGB lighting",
        price: 89.99,
        stock: 1
    },
    {
        name: "Webcam",
        description: "1080p HD webcam for video calls",
        price: 79.99,
        stock: 0
    },
    {
        name: "Headphones",
        description: "Noise-cancelling wireless headphones",
        price: 199.99,
        stock: 12
    },
    {
        name: "External SSD",
        description: "1TB portable SSD with USB 3.2",
        price: 129.99,
        stock: 20
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log("Sample products created successfully");

        process.exit();
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedProducts();

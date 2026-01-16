import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "../config/db.js"
import User from "../models/userModel.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await User.findOne({ role: "admin" });

        if (adminExists) {
            console.log("Admin already exists");
            process.exit();
        }

        await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: await bcrypt.hash("admin123", 10),
            role: "admin",
        });

        console.log("Admin user created successfully");
        process.exit();

    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();

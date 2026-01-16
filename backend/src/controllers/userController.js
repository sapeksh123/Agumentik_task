import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// GET ALL USERS 
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  CREATE USER 
export const createUser = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        if (role === "admin") {
            return res.status(403).json({ message: "Cannot create admin user" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            role: "staff",
            password: hashedPassword,
        });

        req.io.emit("userCreated", {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, password } = req.body;

        if (role === "admin") {
            return res.status(403).json({ message: "Cannot assign admin role" });
        }

        const updateData = { name, email, role };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(id, updateData, {
            new: true,
        }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.io.emit("userUpdated", user);
        res.json(user);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.io.emit("userDeleted", { _id: id });
        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(403).json({ message: "Admin cannot be deactivated" });
        }

        user.active = !user.active;
        await user.save();

        req.io.emit("userUpdated", {
            _id: user._id,
            active: user.active,
        });

        res.json({
            message: `User ${user.active ? "activated" : "deactivated"}`,
            active: user.active,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

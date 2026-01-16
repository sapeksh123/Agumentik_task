import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// STAFF SIGNUP
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: "staff", // IMPORTANT
    });

    res.json({ message: "Signup successful" });
};

// LOGIN (ADMIN + STAFF)
export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.active) {
        return res.status(403).json({
            message: "Your account is inactive. Contact admin."
        });
    }


    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        token,
        role: user.role,
        name: user.name,
    });
};

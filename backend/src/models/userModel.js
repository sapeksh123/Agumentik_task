import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'staff'], required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);

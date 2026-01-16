import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getKPIs = async (req, res) => {
    try {
        console.log("📊 Fetching KPIs...");

        const products = await Product.find();

        const totalProducts = products.length;
        const lowStock = products.filter(p => p.stock > 0 && p.stock < 3).length;
        const outOfStock = products.filter(p => p.stock === 0).length;

        const totalUsers = await User.countDocuments();

        const kpiData = {
            totalProducts,
            lowStock,
            outOfStock,
            totalUsers
        };

        console.log("KPIs fetched successfully:", kpiData);
        res.json(kpiData);
    } catch (error) {
        console.error("Error fetching KPIs:", error);
        res.status(500).json({ message: "Error fetching KPIs" });
    }
};

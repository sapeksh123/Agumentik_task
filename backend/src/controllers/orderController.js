
// import Product from "../models/productModel.js";

// export const placeOrder = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;

//         if (!productId || quantity <= 0) {
//             return res.status(400).json({
//                 message: "Invalid order data"
//             });
//         }

//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({
//                 message: "Product not found"
//             });
//         }

//         if (product.stock < quantity) {
//             return res.status(400).json({
//                 message: "Insufficient stock"
//             });
//         }


//         product.stock -= quantity;
//         await product.save();

//         res.status(200).json({
//             message: "Order placed successfully"
//         });

//         req.io.emit("stockUpdated");

//     } catch (error) {
//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// };


import Product from "../models/productModel.js";

export const placeOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({
                message: "Invalid order data",
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: productId,
                stock: { $gte: quantity },
            },
            {
                $inc: { stock: -quantity },
            },
            {
                new: true,
            }
        );

        if (!product) {
            return res.status(400).json({
                message: "Insufficient stock",
            });
        }

        req.io.emit("stockUpdated");

        return res.status(200).json({
            message: "Order placed successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};

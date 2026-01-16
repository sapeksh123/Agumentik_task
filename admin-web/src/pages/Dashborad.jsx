import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import socket from "../services/socket";
import ProductTable from "../components/ProductTable";
import "./Dashboard.css";

export default function Dashboard() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();

        socket.on("stockUpdated", () => {
            loadProducts();
        });

        return () => socket.off("stockUpdated");
    }, []);

    return (
        <div className="dashboard">
            <h1 className="title">Inventory Dashboard</h1>
            <p className="subtitle">
                Real-time stock monitoring (Auto-updates enabled)
            </p>

            <ProductTable products={products} />
        </div>
    );
}

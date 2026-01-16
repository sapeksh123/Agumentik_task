
import { getToken } from "./auth";
const BASE_URL = "http://localhost:5000/api";

/* ================= PRODUCTS ================= */

export const getProducts = async () => {
    const res = await fetch(`${BASE_URL}/products/`);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

export const createProduct = async (productData) => {
    const res = await fetch(`${BASE_URL}/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

export const updateProduct = async (id, productData) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

export const deleteProduct = async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

/* ================= DASHBOARD ================= */

export const getKPIs = async () => {
    console.log("🔍 Fetching KPIs from:", `${BASE_URL}/dashboard/kpis`);
    const res = await fetch(`${BASE_URL}/dashboard/kpis`);

    if (!res.ok) {
        const text = await res.text();
        console.error("❌ Failed to fetch KPIs:", text);
        throw new Error(text);
    }

    const data = await res.json();
    console.log("✅ KPIs received:", data);
    return data;
};

/* ================= USERS ================= */

export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
};

export const createUser = async (userData) => {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

export const updateUser = async (id, userData) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

export const deleteUser = async (id) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};


export const toggleUserStatus = async (id) => {
    const res = await fetch(`${BASE_URL}/users/${id}/toggle-status`, {
        method: "PATCH",
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
};
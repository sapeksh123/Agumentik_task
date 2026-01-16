import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/api";
import socket from "../services/socket";
import ProductTable from "../components/ProductTable";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { Plus } from "lucide-react";
import { showSuccess, showError } from "../utils/toast";

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts();
            console.log(res);

            // ✅ FIX HERE
            setProducts(res.data);

        } catch (error) {
            console.error("Error loading products:", error);
            showError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadProducts();

        // Listen for WebSocket events
        socket.on("stockUpdated", () => {
            loadProducts();
        });

        socket.on("productCreated", () => {
            loadProducts();
        });

        socket.on("productDeleted", () => {
            loadProducts();
        });

        return () => {
            socket.off("stockUpdated");
            socket.off("productCreated");
            socket.off("productDeleted");
        };
    }, []);

    const handleCreate = () => {
        setModalMode('create');
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setModalMode('edit');
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (product) => {
        setProductToDelete(product);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalMode(null);
        setSelectedProduct(null);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        setIsDeleting(true);
        try {
            await deleteProduct(productToDelete._id);
            showSuccess("Product deleted successfully!");
            handleCloseDeleteDialog();
            loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            showError(error.message || "Failed to delete product");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (modalMode === 'create') {
                await createProduct(formData);
                showSuccess("Product created successfully!");
            } else if (modalMode === 'edit') {
                await updateProduct(selectedProduct._id, formData);
                showSuccess("Product updated successfully!");
            }
            handleCloseModal();
            loadProducts();
        } catch (error) {
            console.error("Error saving product:", error);
            showError(error.message || "Failed to save product");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="mb-4 md:mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                    Inventory Management
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                    Manage your product inventory with real-time updates
                </p>
            </div>

            <div className="mb-4 md:mb-6">
                <button
                    onClick={handleCreate}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm min-h-[44px]"
                >
                    <Plus className="w-5 h-5" />
                    Create Product
                </button>
            </div>

            <ProductTable
                products={products}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === 'create' ? 'Create New Product' : 'Edit Product'}
                size="md"
            >
                <ProductForm
                    product={selectedProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseModal}
                    isSubmitting={isSubmitting}
                />
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
}

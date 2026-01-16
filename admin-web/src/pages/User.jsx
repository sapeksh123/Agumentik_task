import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser, toggleUserStatus } from "../services/api";
import socket from "../services/socket";
import UserTable from "../components/UserTable";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { Plus } from "lucide-react";
import { showSuccess, showError } from "../utils/toast";

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error loading users:", error);
            showError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();

        // Listen for WebSocket events
        socket.on("userCreated", () => {
            loadUsers();
        });

        socket.on("userUpdated", () => {
            loadUsers();
        });

        socket.on("userDeleted", () => {
            loadUsers();
        });

        return () => {
            socket.off("userCreated");
            socket.off("userUpdated");
            socket.off("userDeleted");
        };
    }, []);

    const handleCreate = () => {
        setModalMode('create');
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setModalMode('edit');
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
        setIsDeleteDialogOpen(true);
    };
    const handleToggleStatus = async (userId) => {
        try {
            await toggleUserStatus(userId);
            await fetchUsers(); // refresh list after toggle
        } catch (err) {
            console.error("Failed to toggle user status:", err);
        }
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalMode(null);
        setSelectedUser(null);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        try {
            await deleteUser(userToDelete._id);
            showSuccess("User deleted successfully!");
            handleCloseDeleteDialog();
            loadUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            showError(error.message || "Failed to delete user");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (modalMode === 'create') {
                await createUser(formData);
                showSuccess("User created successfully!");
            } else if (modalMode === 'edit') {
                await updateUser(selectedUser._id, formData);
                showSuccess("User updated successfully!");
            }
            handleCloseModal();
            loadUsers();
        } catch (error) {
            console.error("Error saving user:", error);
            showError(error.message || "Failed to save user");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="mb-4 md:mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                    User Management
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                    Manage system users with real-time updates
                </p>
            </div>

            <div className="mb-4 md:mb-6">
                <button
                    onClick={handleCreate}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm min-h-[44px]"
                >
                    <Plus className="w-5 h-5" />
                    Create User
                </button>
            </div>

            <UserTable
                users={users}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === 'create' ? 'Create New User' : 'Edit User'}
                size="md"
            >
                <UserForm
                    user={selectedUser}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseModal}
                    isSubmitting={isSubmitting}
                />
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
}

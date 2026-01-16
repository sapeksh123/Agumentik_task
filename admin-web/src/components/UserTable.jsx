import { Edit, Trash2 } from "lucide-react";

export default function UserTable({
    users,
    loading,
    onEdit,
    onDelete,
    onToggleStatus, // ✅ NEW
}) {
    /* -------------------- LOADING STATE -------------------- */
    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {["#", "Name", "Email", "Role", "Status", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[1, 2, 3].map((i) => (
                                <tr key={i}>
                                    {Array.from({ length: 6 }).map((_, idx) => (
                                        <td key={idx} className="px-4 py-4">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    /* -------------------- EMPTY STATE -------------------- */
    if (users.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">
                    No users found. Create your first user to get started.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {["#", "Name", "Email", "Role", "Status", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-4 text-sm">{index + 1}</td>

                                    <td className="px-4 py-4 text-sm font-medium">
                                        {user.name}
                                    </td>

                                    <td className="px-4 py-4 text-sm text-gray-600">
                                        {user.email}
                                    </td>

                                    {/* ROLE */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === "admin"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : "bg-blue-100 text-blue-800"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.active
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {user.active ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-4 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEdit(user)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => onDelete(user)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>

                                            {user.role !== "admin" && (
                                                <button
                                                    onClick={() => onToggleStatus(user._id)}
                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${user.active
                                                            ? "text-orange-700 bg-orange-100 hover:bg-orange-200"
                                                            : "text-green-700 bg-green-100 hover:bg-green-200"
                                                        }`}
                                                >
                                                    {user.active ? "Deactivate" : "Activate"}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-4">
                {users.map((user, index) => (
                    <div
                        key={user._id}
                        className="bg-white rounded-lg shadow-sm p-4"
                    >
                        <div className="flex justify-between mb-2">
                            <div>
                                <div className="text-xs text-gray-500">#{index + 1}</div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-600 break-all">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-3">
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${user.role === "admin"
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                            >
                                {user.role}
                            </span>

                            <span
                                className={`px-2 py-1 text-xs rounded-full ${user.active
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {user.active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(user)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg"
                            >
                                <Edit className="w-4 h-4" /> Edit
                            </button>

                            <button
                                onClick={() => onDelete(user)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg"
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>

                            {user.role !== "admin" && (
                                <button
                                    onClick={() => onToggleStatus(user._id)}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${user.active
                                            ? "bg-orange-50 text-orange-600"
                                            : "bg-green-50 text-green-600"
                                        }`}
                                >
                                    {user.active ? "Deactivate" : "Activate"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

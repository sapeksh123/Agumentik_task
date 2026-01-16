import { Edit2, Trash2 } from "lucide-react";

export default function ProductTable({
  products = [],
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">
          No products available. Create your first product.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ================= DESKTOP / TABLET ================= */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {product.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600 max-w-[280px] truncate">
                    {product.description || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${product.stock === 0
                          ? "bg-red-100 text-red-700"
                          : product.stock < 10
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    ₹{Number(product.price || 0).toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        aria-label="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h3 className="text-base font-semibold mb-1">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              {product.description || "No description"}
            </p>

            <div className="flex justify-between items-center text-sm mb-3">
              <span className="text-gray-600">
                Stock:{" "}
                <span className="font-medium">{product.stock}</span>
              </span>
              <span className="font-semibold">
                ₹{Number(product.price || 0).toFixed(2)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded"
              >
                <Edit2 size={16} /> Edit
              </button>
              <button
                onClick={() => onDelete(product)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

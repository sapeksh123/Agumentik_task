import "./ProductTable.css";

export default function ProductTable({ products }) {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                No products available
              </td>
            </tr>
          ) : (
            products.map((p, index) => (
              <tr key={p._id} className="table-row">
                <td data-label="No">{index + 1}</td>
                <td data-label="Product">{p.name}</td>
                <td
                  data-label="Stock"
                  className={p.stock === 0 ? "out" : "in"}
                >
                  {p.stock}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

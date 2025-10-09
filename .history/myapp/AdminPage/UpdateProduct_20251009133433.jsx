import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../baseUrl";

export default function UpdateProduct() {
  const location = useLocation();
  const product = location.state; // navigate ilə göndərilən element

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    stock_code: product?.uniqueStockCode || "",
    description: product?.description || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    active: product?.isActive || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = {
      ...formData,
      unique_stock_code: formData.stock_code,
      is_active: formData.active,
    };

    try {
      const res = await axios.post(
        `${API_URL}/admin/products/update/${product.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Məhsul uğurla yeniləndi!");
      console.log("Server cavabı:", res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Məhsul yenilənə bilmədi!");
    }
  };

  return (
    <div className="admin-products-wide w-screen min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>

        <form className="space-y-4 w-140" onSubmit={handleSubmit}>
          {/* Form elementləri eyni */}
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="slug" value={formData.slug} onChange={handleChange} />
          <input name="stock_code" value={formData.stock_code} onChange={handleChange} />
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <input name="price" value={formData.price} onChange={handleChange} />
          <input name="quantity" value={formData.quantity} onChange={handleChange} />
          <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./AdminProductsWide.css";
import axios from "axios";
export default function AddProduct() {


  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    stock_code: "",
    description: "",
    price: "",
    quantity: "",
    active: false,
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
    if (!token) {
      alert("Token tapılmadı. Zəhmət olmasa yenidən daxil olun.");
      return;
    }
     const payload = {
      ...formData,
      unique_stock_code: formData.stock_code, 
      is_active: formData.active, 
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/products/add",
         payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Məhsul uğurla əlavə olundu!");
      console.log("Server cavabı:", response.data);

      setFormData({
        name: "",
        slug: "",
        stock_code: "",
        description: "",
        price: "",
        quantity: "",
        active: false,
      });
    } catch (error) {
      console.error("❌ Xəta:", error.response?.data || error.message);
      alert("❌ Məhsul əlavə edilə bilmədi!");
    }
  };
  return (
    <div className=" admin-products-wide w-screen  xl:w-full 2xl:w-full min-h-screen flex justify-center items-center p-4 xl:ml-[60%] 2xl:ml-[67%] ">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

 <form className="space-y-4 w-140" onSubmit={handleSubmit}>
  <div>
    <label className="block mb-1 font-medium">Name</label>
    <input
      type="text"
      name="name"
      placeholder="Product Name"
      value={formData.name || ""}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Slug</label>
    <input
      type="text"
      name="slug"
      placeholder="product-slug"
      value={formData.slug || ""}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Unique Stock Code</label>
    <input
      type="text"
      name="stock_code"
      placeholder="ABC123"
      value={formData.stock_code || ""}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Description</label>
    <textarea
      name="description"
      placeholder="Product Description"
      value={formData.description || ""}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block mb-1 font-medium">Price</label>
      <input
        type="number"
        name="price"
        placeholder="100"
        value={formData.price || ""}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
    <div>
      <label className="block mb-1 font-medium">Quantity</label>
      <input
        type="number"
        name="quantity"
        placeholder="10"
        value={formData.quantity || ""}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  </div>

  <div>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="active"
  checked={!!formData.active}
        onChange={handleChange}
        className="form-checkbox text-red-500"
      />
      <span className="ml-2 font-medium">Active</span>
    </label>
  </div>

  <div className="text-right ">
    <button
      type="submit"
      className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
    >
      Add Product
    </button>
  </div>
</form>

      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../baseUrl";

export default function UserProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Zəhmət olmasa login olun!");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        alert("Məhsullar çəkilə bilmədi!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="relative h-screen bg-gray-100 w-screen overflow-y-auto xl:overflow-hidden ">
      {/* Background image */}
      <img
        src="/images/mainuserpage.jpg"
        alt="Background"
        className="absolute inset-0  h-full object-cover z-0 w-full "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      {/* Products grid */}
<div className="relative z-10 p-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.length === 0 ? (
    <div className="col-span-full text-center text-white text-lg">
      Məhsul tapılmadı
    </div>
  ) : (
    products.map((product) => (
      <div
        key={product.id}
        className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        {/* Şəkil */}
        <img
          src={product.image ||  "/images/laptop.png"} // internetdən şəkil
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />

        <h2 className="text-xl font-bold mb-2 truncate">{product.name}</h2>
        <p className="text-gray-100 mb-4 line-clamp-3">{product.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <p className="font-semibold">Price: ${product.price}</p>
          <p className="font-semibold">Qty: {product.quantity}</p>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
}

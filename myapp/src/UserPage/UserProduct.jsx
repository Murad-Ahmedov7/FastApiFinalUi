import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../baseUrl";

export default function UserProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); 


   const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

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

  // Səbətə əlavə funksiyası
  async function addToBasket(product) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Zəhmət olmasa əvvəlcə daxil olun.");
        return;
      }

      const payload = {
        product_id: product.id,
        quantity: quantities[product.id] || 1,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/basket/items/",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`${product.name} səbətə əlavə olundu (${payload.quantity} ədəd).`);
      console.log("Basket response:", response.data);
    } catch (error) {
      if (error.response)
        alert(error.response.data.detail || "Səbətə əlavə edilmədi");
      else alert("Şəbəkə xətası");
    }
  }

  return (
    <div className="relative h-screen bg-gray-100 w-screen overflow-y-auto xl:overflow-hidden ">
      {/* Background image */}
      <img
        src="/images/mainuserpage.jpg"
        alt="Background"
        className="absolute inset-0 h-full object-cover z-0 w-full"
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
              className="bg-gradient-to-br from-red-500 to-black text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Şəkil */}
              <img
                src={
                  product.image
                    ? product.image
                    : product.name === "laptop"
                    ? "/images/laptop.png"
                    : "https://i02.appmifile.com/976_operatorx_operatorx_opx/23/02/2024/c4866f7bdd20c6ed7acf6082417dd340.png?thumb=1&w=500&q=85"
                }
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              <h2 className="text-xl font-bold mb-2 truncate">
                {product.name}
              </h2>
              <p className="text-gray-100 mb-4 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-auto flex justify-between items-center mb-4">
                <p className="font-semibold">Price: ${product.price}</p>
                <p className="font-semibold">Qty: {product.quantity}</p>
              </div>

              
              {/* Qty artır/azalt bölməsi */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  onClick={() => decreaseQty(product.id)}
                  className="bg-white text-black font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  −
                </button>
                <span className="text-lg font-semibold">
                  {quantities[product.id] || 1}
                </span>
                <button
                  onClick={() => increaseQty(product.id)}
                  className="bg-white text-black font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>

              {/* Add to Basket düyməsi */}
              <button
                onClick={() => addToBasket(product)}
                className="mt-2 bg-white text-black font-semibold py-2 rounded-lg hover:bg-white transition-colors"
              >
                Add to Basket
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

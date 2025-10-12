import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../baseUrl";

export default function UserProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProducts, setAddedProducts] = useState([]); // ✅ əlavə olunan məhsulları izləyir

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

  // ✅ Səbətə əlavə funksiyası
  async function addToBasket(product) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Zəhmət olmasa əvvəlcə daxil olun.");
        return;
      }

      const payload = { product_id: product.id, quantity: 1 };

      await axios.post(`${API_URL}/user/basket/items/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Added statusuna keçid
      setAddedProducts((prev) => [...prev, product.id]);

      // “Added” statusu 2 saniyə sonra yenidən “Add to Basket” olacaq (optional)
      setTimeout(() => {
        setAddedProducts((prev) => prev.filter((id) => id !== product.id));
      }, 2500);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Səbətə əlavə edilmədi");
    }
  }

  return (
    <div className="relative h-screen bg-gray-100 w-screen overflow-y-auto xl:overflow-hidden">
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
        {loading ? (
          <div className="col-span-full text-center text-white text-lg">
            Yüklənir...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-white text-lg">
            Məhsul tapılmadı
          </div>
        ) : (
          products.map((product) => {
            const isAdded = addedProducts.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-gradient-to-br from-red-500 to-black text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
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
                </div>

                {/* Add to Basket / Added düyməsi */}
                <button
                  onClick={() => !isAdded && addToBasket(product)}
                  className={`mt-2 py-2 rounded-lg font-semibold transition-all duration-500 transform ${
                    isAdded
                      ? "bg-green-500 text-white scale-105 shadow-md"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {isAdded ? "Added ✓" : "Add to Basket"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
A
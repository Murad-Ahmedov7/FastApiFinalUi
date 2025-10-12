import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../baseUrl";

export default function Basket() {
  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchBasket = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/basket/`, config);
      setBasket(res.data);
    } catch (err) {
      console.error(err);
      alert("Basket çəkilə bilmədi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Zəhmət olmasa login olun!");
      return;
    }
    fetchBasket();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.put(
        `${API_URL}/user/basket/items/${itemId}`,
        { product_id: itemId, quantity },
        config
      );
      fetchBasket();
    } catch (err) {
      alert(err.response?.data?.detail || "Update mümkün olmadı!");
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/user/basket/items/${itemId}`, config);
      fetchBasket();
    } catch {
      alert("Item silinə bilmədi!");
    }
  };

  const totalPrice =
    basket?.items?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;

  if (loading)
    return <div className="text-center text-xl p-10 text-gray-600">Yüklənir...</div>;

  if (!basket || basket.items.length === 0)
    return (
      <div className="text-center text-lg text-gray-700 mt-10">
        Sənin səbətin hazırda boşdur 🛒
      </div>
    );

  return (
    <div className="relative min-h-screen w-screen flex justify-end bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Sağ panel səbət */}
      <div className="w-full sm:w-[450px] md:w-[480px] lg:w-[520px] xl:w-[550px] bg-white/10 backdrop-blur-lg shadow-2xl p-6 rounded-l-3xl overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-400 drop-shadow">
          🛍️ Sənin Səbətin
        </h1>

        {/* Məhsul siyahısı */}
        <div className="flex flex-col gap-5">
          {basket.items.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image || "/images/default-product.png"}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg shadow"
                />
                <div>
                  <h2 className="font-bold text-lg">{item.product.name}</h2>
                  <p className="text-sm text-gray-300">${item.product.price}</p>
                </div>
              </div>

              {/* Qty və Sil */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center font-bold hover:bg-gray-200"
                  >
                    −
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center font-bold hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-sm text-red-400 hover:text-red-500 font-semibold"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cəmi qiymət və sifariş */}
        <div className="mt-8 border-t border-white/20 pt-4">
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Ümumi məbləğ:</span>
            <span className="text-red-400">${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => alert("Sifariş tamamlandı ✅")}
            className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white shadow-md transition-all duration-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

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
<div className="min-h-screen w-screen flex flex-col lg:flex-row bg-gray-900 text-white p-4 lg:p-8 gap-4 lg:gap-8">
  {/* Sol panel – məhsullar alt-alta */}
  <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-screen">
    {basket.items.map((item) => (
      <div
        key={item.id}
 className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 flex flex-col sm:flex-row justify-between items-center gap-2"
>      >
        {/* Şəkil və ad */}
        <div className="flex items-center gap-4 w-full sm:w-1/3 mb-2 sm:mb-0">
          <img
            src={item.product.image || "/images/default-product.png"}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded-lg shadow"
          />
          <div>
            <h2 className="font-bold">{item.product.name}</h2>
            <p className="text-gray-300 text-sm">${item.product.price}</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2 w-full sm:w-1/3 justify-center mb-2 sm:mb-0">
          <button
            onClick={() =>
              updateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
            className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-gray-200"
          >
            −
          </button>
          <span className="font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-gray-200"
          >
            +
          </button>
        </div>

        {/* Sil */}
        <div className="flex flex-col items-center gap-2 w-full sm:w-1/3 justify-end">
          <button
            onClick={() => deleteItem(item.id)}
            className="text-red-400 hover:text-red-500 font-semibold"
          >
            Sil
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Sağ panel – ümumi qiymət + xülasə */}
  <div className="w-full lg:w-[320px] bg-white/10 backdrop-blur-lg p-4 rounded-2xl flex flex-col gap-4 self-start sticky top-4">
    <h2 className="text-xl font-bold text-red-400 text-center">Səbət Xülasəsi</h2>

    {/* Məhsul xülasəsi */}
    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
      {basket.items.map((item) => (
        <div key={item.id} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={item.product.image || "/images/default-product.png"}
              alt={item.product.name}
              className="w-10 h-10 object-cover rounded"
            />
            <span className="text-sm">{item.quantity}x {item.product.name}</span>
          </div>
          <span className="text-red-400 text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>

    {/* Ümumi məbləğ */}
    <div className="flex justify-between font-semibold text-lg">
      <span>Ümumi məbləğ:</span>
      <span className="text-red-400">${totalPrice.toFixed(2)}</span>
    </div>

    {/* Order */}
    <button
      onClick={() => alert("Sifariş tamamlandı ✅")}
      className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white shadow-md transition-all duration-300"
    >
      Order Now
    </button>
  </div>
</div>


  );
}

import { useEffect, useState } from "react";
import axios from "axios";


export default function Basket() {
  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // --------------------------
  // Basket-i çəkmək
  // --------------------------
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

  // --------------------------
  // Quantity update
  // --------------------------
  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await axios.put(
        `${API_URL}/user/basket/items/${itemId}`,
        { product_id: itemId, quantity },
        config
      );
      fetchBasket(); // yenilə
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Update mümkün olmadı!");
    }
  };

  // --------------------------
  // Delete item
  // --------------------------
  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/user/basket/items/${itemId}`, config);
      fetchBasket(); // yenilə
    } catch (err) {
      console.error(err);
      alert("Item silinə bilmədi!");
    }
  };

  if (loading) {
    return <div className="text-center p-4 text-xl">Yüklənir...</div>;
  }

  if (!basket || basket.items.length === 0) {
    return <div className="text-center p-4 text-lg">Sənin basket-in boşdur</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sənin Basket-in</h1>
      <div className="grid grid-cols-1 gap-4">
        {basket.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image || "https://via.placeholder.com/80"}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-bold">{item.product.name}</h2>
                <p>${item.product.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="w-16 p-1 border rounded"
              />
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

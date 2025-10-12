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
D
}

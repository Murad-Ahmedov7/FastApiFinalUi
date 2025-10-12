
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../baseUrl";

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/`, config);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Order-lar gətirilə bilmədi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Zəhmət olmasa login olun!");
      return;
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center text-xl p-10 text-gray-600">Yüklənir...</div>;

  if (!orders.length) return (
  <div className="flex items-center justify-center text-gray-700 bg-gray-900 min-h-screen w-screen fixed">
    <p className="text-4xl 2xl:text-7xl text-white font-bold">
      You don't have any onders 🛒
    </p>
  </div>
);

  return (

    <div className="w-screen ">
<div className="p-4 lg:p-8 min-h-screen ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">MyOrders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Sifariş ID</th>
              <th className="py-3 px-4 text-left">Məhsullar</th>
              <th className="py-3 px-4 text-left">Ümumi Məbləğ</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const totalPrice = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
              return (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between gap-2">
                        <span>{item.quantity}x {item.product.name}</span>
                        <span className="text-red-500">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">${totalPrice.toFixed(2)}</td>
                  <td className={`py-3 px-4 font-bold ${
                    order.status === "pending" ? "text-yellow-500" :
                    order.status === "approved" ? "text-green-500" :
                    "text-red-500"
                  }`}>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
}

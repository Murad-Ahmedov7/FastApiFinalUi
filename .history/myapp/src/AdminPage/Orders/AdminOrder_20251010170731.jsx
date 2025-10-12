import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../baseUrl";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/admin/orders/`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const updateStatus = (orderId, status) => {
    axios
      .put(
        `${API_URL}/admin/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        alert(`Order #${orderId} status updated to ${status}`);
        // state-i güncəllə
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Created At</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.user_id}</td>
                <td className="p-3 border">{order.status}</td>
                <td className="p-3 border">
                  {new Date(order.created_at).toLocaleString()}
                </td>
                <td className="p-3 border">
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.product.name} x {item.quantity} (${item.price})
                    </div>
                  ))}
                </td>
                <td className="p-3 border flex gap-2">
                  <button
                    className="bg-green-600 px-2 py-1 rounded"
                    onClick={() => updateStatus(order.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 px-2 py-1 rounded"
                    onClick={() => updateStatus(order.id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

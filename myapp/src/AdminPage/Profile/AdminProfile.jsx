import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../baseUrl";

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      navigate("/"); // token yoxdursa, login-ə yönləndir
      return;
    }

    axios
      .get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        setUser({
          username: res.data.username,
          email: res.data.email,
          money: 5000,
        });
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [navigate]);

  // Logout funksiyası
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You Logout!!!")
    navigate("/"); // əsas səhifəyə yönləndir
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6">
        {/* Profil şəkli */}
        <img
          src={`https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 100
          )}.jpg`}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-md"
        />

        <h2 className="text-2xl font-semibold">User Profile</h2>

        {user ? (
          <div className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={user.username}
                disabled
                className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="text"
                value={user.email}
                disabled
                className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Money</label>
              <input
                type="text"
                value={`$${user.money}`}
                disabled
                className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none"
              />
            </div>

            {/* Logout düyməsi */}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Loading user info...</p>
        )}
      </div>
    </div>
  );
}

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL-ə görə rol təyin et
  const role = location.pathname.startsWith("/admin") ? "admin" : "user";

  return (
    <div
      className="bg-gradient-to-b from-red-700 via-red-900 to-black min-h-screen p-4 flex flex-col shrink-0
                 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72
                transition-all duration-300"
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent">
          {role === "admin" ? "Admin Sidebar" : "User Sidebar"}
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3">
          {role === "admin" ? (
            <>
              <li onClick={() => navigate("/admin/dashboard")} className="sidebar-item">Dashboard</li>
              <li onClick={() => navigate("/admin/products")} className="sidebar-item">Products</li>
              <li onClick={() => navigate("/admin/orders")} className="sidebar-item">Orders</li>
              <li onClick={() => navigate("/admin/settings")} className="sidebar-item">Settings</li>
            </>
          ) : (
            <>
              <li onClick={() => navigate("/user/home")} className="sidebar-item">Home</li>
              <li onClick={() => navigate("/user/products")} className="sidebar-item">Products</li>
              <li onClick={() => navigate("/user/orders")} className="sidebar-item">My Orders</li>
              <li onClick={() => navigate("/user/profile")} className="sidebar-item">Profile</li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

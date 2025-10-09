import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Yeni hissə: rol təyin etmək
  const role = location.pathname.startsWith("/admin") ? "admin" : "user";

  return (
    <div className="bg-gradient-to-b from-red-700 via-red-900 to-black min-h-screen p-4 flex flex-col shrink-0
                    w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72
                    transition-all duration-300">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent">
          {role === "admin" ? "Admin Sidebar" : "User Sidebar"} {/* Yeni hissə */}
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3">
          {/* Mövcud sidebar elementləri qalır */}
          <li
            onClick={() => navigate(role === "admin" ? "/admin/dashboard" : "/user/home")}
            className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                       hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300"
          >
            {role === "admin" ? "Dashboard" : ""} {/* Yeni hissə */}
          </li>

          <li
            onClick={() => navigate(role === "admin" ? "/admin/products" : "/user/products")}
            className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                       hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300"
          >
            Products
          </li>

          {role === "admin" ? (
            <>
              <li
                onClick={() => navigate("/admin/orders")}
                className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                           hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300"
              >
                Orders
              </li>
              <li
                onClick={() => navigate("/admin/settings")}
                className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                           hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300"
              >
                Settings
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => navigate("/user/basket")}
                className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                           hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300"
              >
                My Basket
              </li>
              <li
                onClick={() => navigate("/user/profile")}
                className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                           hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300"
              >
                Profile
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

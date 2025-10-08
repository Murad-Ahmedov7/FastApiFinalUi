export default function Sidebar() {
  return (
<div className="bg-gray-800 text-white h-screen p-4 flex flex-col shrink-0
                 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72
                transition-all duration-300">
  {/* Sidebar content */}


      {/* Logo və Başlıq */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">MyApp</h1>
      </div>

      {/* Navigasiya menyusu */}
      <nav className="flex-1">
        <ul className="space-y-3">
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition">
            Dashboard
          </li>
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition">
            Products
          </li>
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition">
            Orders
          </li>
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition">
            Settings
          </li>
        </ul>
      </nav>
    </div>
  );
}

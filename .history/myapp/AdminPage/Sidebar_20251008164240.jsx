export default function Sidebar() {
  return (
<div className="bg-gray-800 text-white h-screen p-4 flex flex-col
                w-40 sm:w-52 md:w-60 lg:w-72 xl:w-80
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

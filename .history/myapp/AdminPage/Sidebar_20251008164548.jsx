export default function Sidebar() {
  return (
<div className="bg-red-500 w-40 sm:bg-green-500 md:bg-blue-500 lg:bg-yellow-500 xl:bg-purple-500 h-40">

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

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white min-h-screen p-4 flex flex-col
    sm
                    transition-all duration-300">
   
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">MyApp</h1>
      </div>

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

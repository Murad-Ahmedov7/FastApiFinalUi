export default function Sidebar() {
  return (
<div className="bg-gray-800 text-white min-h-screen p-4 flex flex-col shrink-0
                 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72
                transition-all duration-300">
  


      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Products Sidebar</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3">
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition font-bold">
            Dashboard
          </li>
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition font-bold">
            Products
          </li>
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition font-bold">
            Orders
          </li>
          <li className="p-3 rounded hover:bg-gray-700 cursor-pointer transition font-bold">
            Settings
          </li>
        </ul>
      </nav>
    </div>
  );
}


//min-h-screen ici ici nece olour ve ya yan-yana
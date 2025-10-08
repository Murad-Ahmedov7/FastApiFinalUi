export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white h-full p-4 flex flex-col
                    w-48       /* default: kiçik ekran üçün daha böyük */
                    sm:w-56    /* kiçik ekran (≥640px) */
                    md:w-64    /* orta ekran və yuxarı */
                    transition-all duration-300">
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

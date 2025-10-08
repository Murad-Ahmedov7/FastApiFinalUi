export default function Sidebar() {
    return (
        <div className="bg-gradient-to-b from-red-700 via-red-900 to-black min-h-screen p-4 flex flex-col shrink-0
                 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72
                transition-all duration-300">



            <div className="mb-6 text-center">
<h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-400 to-black bg-clip-text text-transparent">Products Sidebar</h1>
            </div>

            <nav className="flex-1">
                <ul className="space-y-3">
                    <li className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                         hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300">
                        Dashboard
                    </li>
                    <li className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                         hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300">
                        Products
                    </li>
                    <li className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                         hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300">
                        Orders
                    </li>
                    <li className="p-3 rounded font-bold text-white text-[20px] cursor-pointer
                         hover:bg-gradient-to-r hover:from-red-800 hover:to-black transition-all duration-300">
                        Settings
                    </li>
                </ul>
            </nav>
        </div>
    );
}


//min-h-screen ici ici nece olour ve ya yan-yana
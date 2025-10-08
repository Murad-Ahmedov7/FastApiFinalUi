export default function Sidebar {
  return (
    <div
      className={`bg-gray-800 text-white h-screen p-4 ${className}`}
    >
      <h2 className="text-xl font-bold mb-4">Sidebar All</h2>
      <ul>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Dashboard</li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Products</li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Orders</li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Settings</li>
      </ul>
    </div>
  );
}

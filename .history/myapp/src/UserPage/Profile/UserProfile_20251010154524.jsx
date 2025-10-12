export default function UserProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6">
        {/* Profil şəkli */}
        <img
          src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-md"
        />

        {/* Başlıq */}
        <h2 className="text-2xl font-semibold">User Profile</h2>

        {/* Form sahələri */}
        <div className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Save düyməsi */}
        <button className="mt-4 bg-red-500 hover:bg-red-600 transition-colors py-2 px-6 rounded-lg font-semibold shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}

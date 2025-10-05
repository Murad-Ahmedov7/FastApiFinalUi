export default function RegisterPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-5  bg-gradient-to-br from-red-500 to-black">
      <div className="w-full max-w-md border-4 border-red-700 p-10 rounded-4xl ">
        <h1 className="text-3xl font-semibold text-center mb-8">Register</h1>

        <label className="block text-lg font-bold mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white focus:outline-none"
        />

        
        <label className="block text-lg font-bold mb-1">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white focus:outline-none"
        />

        <label className="block text-lg font-bold mb-1">Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg bg-white mb-6">
          <input
            type="password"
            placeholder="Enter password"
            className="flex-1 p-4 rounded-l-lg "
          />
          <button className="px-4 text-blue-600 font-bold">Show</button>
        </div>


        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign up
        </button>

        <p className="text-center mt-6 text-blue-600 cursor-pointer">
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

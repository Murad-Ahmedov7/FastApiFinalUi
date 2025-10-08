import axios from "axios";
import { useState } from "react";
import API_URL from "../../baseUrl";
import { Link } from "react-router-dom";
export default function RegisterPage() {




  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [activeRole, setActiveRole] = useState("")

  const getToken = async () => {
const res = await axios.post(`${API_URL}/users/login`, {      email: email,
      password: password
    })
    const data = res.data.access_token
    setToken(data)
    localStorage.setItem("token", token)   //sehvlik var burada
  }

  const handleSelectRole = (role) => {
    etIsInputDisabled(false)
    setActiveRole(role)
  }

  const inputStyle =
    "w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white  focus:ring-4 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="flex items-center justify-center overflow-y-hidden  h-screen w-screen relative">
      <img
        src="/images/registerlogin.jpg"
        alt="Şirkət loqosu"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div className="w-full absolute max-w-md p-10 rounded-3xl border border-red-600/10 bg-red-600/10  shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-8 text-white">
          Login
        </h1>

        <label className=" text-lg font-bold text-white mb-1">Username</label>
        <input
          type="email"
          placeholder="Enter username"
          disabled={isInputDisabled}
          className={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className=" text-lg font-bold mb-1 text-white">Password</label>
        <div
          className="flex items-center border border-gray-300 rounded-lg bg-white mb-6  focus-within:ring-4 focus-within:ring-blue-400"
        >
          <input
            type="password"
            placeholder="Enter password"
            disabled={isInputDisabled}
            className="flex-1 p-4 rounded-l-lg focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="px-4 text-blue-600 font-bold">Show</button>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign up
        </button>

        <p className="text-center mt-6 text-blue-600 cursor-pointer">
          Don't have an account? Register
        </p>
      </div>

      <div className="flex justify-center items-center h-full absolute gap-3 top-[300px]  ">
        <button onClick={() => handleSelectRole("admin")} className="text-white w-30    bg-gradient-to-r from-red-300 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2  ">
          Admin
        </button>

        <Link to='/user/login' onClick={() => handleSelectRole("user")} className="text-white w-30 bg-gradient-to-r from-red-300 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 ">
          User
        </Link>
      </div>
    </div>
  );
}

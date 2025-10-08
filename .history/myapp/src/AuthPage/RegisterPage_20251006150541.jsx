import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_URL from "../../baseUrl";

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeRole, setActiveRole] = useState("")

const location=useLocation()

const role=location.pathname.includes("/user")?"user":"admin"
  
  const handleSelectRole = (role) => {
    setActiveRole(role)
  }

const handleRegister = async () => {
  if (!username || !email || !password) {
    console.log("Bütün sahələr doldurulmalıdır");
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/users/register`, {
      username,
      email,
      password,
      role: role
    });
    console.log("Register uğurla oldu:", res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};




  const inputStyle="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white  focus:ring-4 focus:ring-blue-500 focus:outline-none"

  return (
    <div className="flex items-center justify-center  h-screen w-screen relative overflow-y-hidden">
      <img
        src="/images/registerlogin.jpg"
        alt="Şirkət loqosu"
        className="w-full h-full object-cover"
      />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>


      <div className="w-full absolute max-w-md p-10  rounded-3xl border border-red-600/10 bg-red-600/10  shadow-lg  ">
        <h1 className="text-3xl font-semibold text-center mb-8 text-white">Register</h1>

        <label className=" text-lg font-bold text-white mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className={inputStyle}
          />

        <label className="text-lg font-bold mb-1 text-white">Email</label>
        <input
          type="text"
          placeholder="Enter email"
           value={email}
          onChange={(e)=>setEmail(e.target.value)}
         
         className={inputStyle}        
         />

        <label className=" text-lg font-bold mb-1 text-white">Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg bg-white mb-6  focus-within:ring-4 focus-within:ring-blue-400
">
          <input
            // type="password"
            type="text"
            placeholder="Enter password"
          
            className="flex-1 p-4 rounded-l-lg focus:outline-none "
               value={password}
          onChange={(e)=>setPassword(e.target.value)}
         
          />
          <button className="px-4 text-blue-600 font-bold">Show</button>
        </div>

        <button onClick={()=>handleRegister()} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition relative z-10">
          Sign up
        </button>
<div className="flex justify-center mt-6 relative z-10">
  <Link
    to={activeRole ? (activeRole === 'admin' ? '/admin/login' : '/user/login') :`/${role}/login` }
    className="text-blue-600 cursor-pointer"
    onClick={(e)=>isInputDisabled && e.preventDefault()}
    
  >
       Already have an account? Login
  </Link>
</div>
      </div>

      <div className="flex justify-center items-center h-full absolute gap-3 top-[320px]  ">
           <Link to='/admin/register' onClick={() => handleSelectRole("admin")} className="text-white w-30    bg-gradient-to-r from-red-300 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2  ">
          Admin
        </Link>

        <Link to='/user/register' onClick={() => handleSelectRole("user")} className="text-white w-30 bg-gradient-to-r from-red-300 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 ">
          User
        </Link>
        
      </div>
         
    </div>
  );
}

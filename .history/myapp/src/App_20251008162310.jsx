import "./App.css";
import RegisterPage from "./AuthPage/RegisterPage";
import LoginPage from "./AuthPage/LoginPage";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Product from "../AdminPage/Product";
import Sidebar from "../AdminPage/Sidebar";

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname.includes("/login") || location.pathname.includes("/register");

  return (
    <div className="flex min-h-screen">

      {!hideSidebar &&     <Sidebar className="
          w-44         
          md:w-70    
          sm:w-20     
          hidden sm:block
        " />}


      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/products" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}




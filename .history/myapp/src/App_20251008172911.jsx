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
    <div className="flex ">

      {!hideSidebar && (
        <Sidebar/>
      )}


      <div className=" p-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/products/add" element={<AddProduct />} />

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




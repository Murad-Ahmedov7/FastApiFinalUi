import "./App.css";
import RegisterPage from "./AuthPage/RegisterPage";
import LoginPage from "./AuthPage/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "../AdminPage/Product";
import Sidebar from "../AdminPage/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        {/* Sidebar sol tərəfdə */}
        <Sidebar className="w-64" />

        {/* Content sağ tərəfdə */}
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
    </BrowserRouter>
  );
}


export default App;

import "./App.css";
import RegisterPage from "./AuthPage/RegisterPage";
import LoginPage from "./AuthPage/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "../AdminPage/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/products" element={<Product />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

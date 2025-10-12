import "./App.css";
import RegisterPage from "./AuthPage/RegisterPage";
import LoginPage from "./AuthPage/LoginPage";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Product from "./AdminPage/Product";
import Sidebar from "./AdminPage/Sidebar";
import AddProduct from "./AdminPage/AddProduct";
import UpdateProduct from "./AdminPage/UpdateProduct";
import UserProduct from "./UserPage/UserProduct";
import UserOrder from "./UserPage/UserOrder";

import Basket from "./UserPage/Basket";



function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname.includes("/login") || location.pathname.includes("/register") ||location.pathname===("/");

  return (
    <div className="flex overflow-y-hidden ">

      {!hideSidebar && (
        <Sidebar/>
      )}


      <div className="">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/user/products" element={<UserProduct/>} />
          <Route path='user/basket' element={<Basket/>} />
          <Route path='/user/order' element={<UserOrder/>} />

          <Route path="/admin/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/update/:id" element={<UpdateProduct/>} />
    

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




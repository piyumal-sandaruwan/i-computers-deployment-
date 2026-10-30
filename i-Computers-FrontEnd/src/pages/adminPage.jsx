import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { HiOutlineUsers } from "react-icons/hi";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import AdminOrdersPage from "./admin/adminOrdersPage.jsx";
import AdminProductsPage from "./admin/adminProductsPage.jsx";
import AdminUsersPage from "./admin/adminUsersPage.jsx";
import Loader from "../components/loader.jsx";
import AdminAddProductPage from "./admin/adminAddProductPage.jsx";
import AdminUpdateProduct from "./admin/adminUpdateProduct.jsx";
export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      window.location.href = "/login";
      return;
    } 
    
    // FIX: URL is /users/me
    axios.get(import.meta.env.VITE_BACKEND_URL + "/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response.data.role === "admin") {
        setUser(response.data);
      } else {
        window.location.href = "/";
      }
    }).catch(() => {
      // Clear token and redirect if it's invalid
      localStorage.removeItem("token");
      window.location.href = "/login";
    });
  }, []);

  if (!user) return <Loader />;

  return (
    <div className="w-full pl-[20px] pt-[10px] h-full flex bg-accent">
      <div className="w-[200px] pl-[10px] h-full bg-accent rounded-2xl">
        <div className="w-full h-[100px] flex items-center text-white font-bold">
           <h1 className="text-2xl">Admin Panel</h1>
        </div>
        <div className="w-full flex flex-col gap-4 text-white font-bold">
          <Link to="/admin" className="flex items-center gap-2"><LuClipboardList />Orders</Link>
          <Link to="/admin/products" className="flex items-center gap-2"><LiaBoxOpenSolid />Products</Link>
          <Link to="/admin/users" className="flex items-center gap-2"><HiOutlineUsers />Users</Link>
          <Link to="/admin/reviews" className="flex items-center gap-2"><MdOutlineRateReview />Reviews</Link>
        </div>
      </div>

      <div className="w-[calc(100%-200px)] h-full rounded-2xl border-[10px] border-accent bg-primary overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminOrdersPage />} />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/reviews" element={<h1>Reviews Content</h1>} />
           <Route path="/add-product" element={<AdminAddProductPage />} />
        <Route path="/update-product" element={<AdminUpdateProduct />} /> 
        </Routes>
      </div>
    </div>
  );
}
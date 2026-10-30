import { BiShoppingBag } from "react-icons/bi";
import { LuListCollapse } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <header className="w-full h-[100px] bg-accent text-white  flex items-center px-4 relative">
      
      {/* 1. Left Side: Menu Icon & Logo */}
      <div className="flex items-center z-10">
        <LuListCollapse
          className="text-2xl lg:hidden mr-3 cursor-pointer"
          onClick={() => setSideBarOpen(true)}
        />
        <Link to="/">
            <img
             src="/logo.png"
             className="h-[100px] w-auto object-contain"
             alt="iComputers Logo"
             />
</Link>
      </div>

      {/* 2. Center Navigation (Desktop Only) */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
        <nav className="flex gap-[30px] pointer-events-auto">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-300 transition-colors">
            Products
          </Link>
          <Link to="/contact" className="hover:text-gray-300 transition-colors">
            Contact Us
          </Link>
          <Link to="/about" className="hover:text-gray-300 transition-colors">
            About Us
          </Link>
        </nav>
      </div>

      {/* Right Side: User Icon + Shopping Bag */}
<div className="ml-auto flex items-center gap-6 z-[999] relative">
  
  {/* Apply hidden on mobile, block on large screens */}
  <div className="hidden lg:block">
      <UserData />
  </div>
          
  <Link
    to="/cart"
    className="text-primary text-3xl hover:scale-110 transition-transform"
  >
    <BiShoppingBag />
  </Link>
</div>

      {/* Sidebar */}
      {sideBarOpen && (
        <div className="fixed w-[100vw] h-screen top-0 left-0 bg-black/50 z-30 transition-all lg:hidden duration-300">
          <div className="w-[250px] h-screen flex-col relative">
            <div className="absolute left-[-250px] bg-white transform-flat translate-x-[250px] transition-transform duration-300 w-full h-full flex flex-col">
              
              <div className="w-full h-[100px] bg-accent text-white flex items-center px-4">
                <img
                  src="/logo.png"
                  className="h-full w-auto object-contain"
                  alt="iComputers Logo"
                />
                <LuListCollapse
                  className="text-2xl my-auto ml-[85px] lg:hidden cursor-pointer rotate-180"
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                />
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-col text-accent text-lg mt-8 px-6 gap-6">
                <Link to="/" onClick={() => setSideBarOpen(false)}>
                  Home
                </Link>

                <Link to="/products" onClick={() => setSideBarOpen(false)}>
                  Products
                </Link>

                <Link to="/contact" onClick={() => setSideBarOpen(false)}>
                  Contact Us
                </Link>

                <Link to="/about" onClick={() => setSideBarOpen(false)}>
                  About Us
                </Link>

                <Link to="/cart" onClick={() => setSideBarOpen(false)}>
                  Cart
                </Link>
                  <div className="lg:hidden flex justify-center bg-accent p-4 rounded-full">
                    <UserData />
                   </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
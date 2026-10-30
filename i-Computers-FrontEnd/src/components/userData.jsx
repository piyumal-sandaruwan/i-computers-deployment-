import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiLogOut, FiShoppingBag, FiChevronDown } from "react-icons/fi";

export default function UserData() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            const userData = Array.isArray(response.data) ? response.data[0] : response.data;
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        });
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        setUser(null);
        setIsOpen(false);
        window.location.href = "/login";
    };

    return (
        <div className="flex items-center gap-4 relative z-[999]">
            {user ? (
                <div className="relative" ref={dropdownRef}>
                    {/* Avatar Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/10 transition-all duration-200"
                    >
                        <img
                            src={user.image || "/default.png"}
                            referrerPolicy="no-referrer"
                            alt="Profile"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-white/40"
                        />
                        <span className="text-white font-medium text-sm hidden sm:block">{user.firstName}</span>
                        <FiChevronDown className={`text-white/70 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[9999]">
                            {/* User Info Header */}
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
    <img
        src={user.image || "/default.png"}
        referrerPolicy="no-referrer"
        alt="Profile"
        className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200"
    />
    <div className="overflow-hidden">
        <p className="text-xs font-semibold text-gray-800 truncate">{user.firstName} {user.lastName}</p>
        <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
    </div>
</div>

                            {/* Menu Items */}
                            <div className="py-1">
                                <Link
                                    to="/orders"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                        <FiShoppingBag className="text-blue-500 text-sm" />
                                    </span>
                                    My Orders
                                </Link>

                                <div className="mx-3 border-t border-gray-100"></div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                        <FiLogOut className="text-red-500 text-sm" />
                                    </span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link to="/login" className="px-5 py-2 text-sm font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-accent transition-all duration-300">Login</Link>
                    <Link to="/register" className="px-5 py-2 text-sm font-semibold bg-accent text-primary rounded-full hover:scale-105 transition-all duration-300">Register</Link>
                </div>
            )}
        </div>
    );
}
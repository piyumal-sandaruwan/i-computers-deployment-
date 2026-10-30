import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md p-8 rounded-3xl shadow-2xl relative animate-in zoom-in duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
                
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white">i-<span className="text-blue-500">Computers</span></h2>
                    <p className="text-gray-400 mt-2">
                        {isLogin ? "Please login to continue" : "Create an account to order"}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* These would normally be your actual Login/Register forms */}
                    <button 
                        onClick={() => navigate("/login")}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
                    >
                        Go to Login Page
                    </button>
                    <button 
                        onClick={() => navigate("/register")}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition border border-slate-600"
                    >
                        Register New Account
                    </button>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    By continuing, you agree to i-Computers Terms of Service.
                </p>
            </div>
        </div>
    );
}
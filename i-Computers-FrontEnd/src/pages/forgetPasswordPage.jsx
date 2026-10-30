import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader';

export default function ForgetPasswordPage() {
   // --- Logic States ---
   const [otpSent, setOtpSent] = useState(false);
   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState(""); 
   const [otp, setOtp] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const navigate = useNavigate();

   // --- Function: Final Password Reset ---
   async function resetPassword() {
    // Basic frontend check for password matching
    if (newPassword !== confirmPassword) {
        toast.error("Passwords Do Not Match");
        return;
    }
    
    setLoading(true);
    try {
            // Sending the verification data to the backend
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
                email: email,
                otp: otp,
                newPassword: newPassword                
            });
            
            toast.success("Password Reset Successful");
            setLoading(false);
            navigate("/login"); // Redirect to login on success
    } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Error resetting password");
        setLoading(false);
    }
   }

   // --- Function: Requesting the OTP ---
   async function sendOtp() {
    setLoading(true);
    try {
        // GET request to trigger the OTP email
        await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email);
        
        toast.success("OTP Sent To Your Email ");
        setLoading(false);
        setOtpSent(true); // Switch view to Reset form

    } catch (err) {
        console.log(err);
        toast.error("Error Sending Otp Try Again Later");
        setLoading(false);
    }
   }
    
   return (
        /* Full Page Background Container */
        <div className="w-full h-screen bg-[url('background.jpg')] bg-cover bg-center flex flex-col justify-center items-center font-sans">

           {/* Full Screen Loader Overlay */}
           {loading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-center items-center">
                    <Loader />
                </div>
           )}
           
           {
                otpSent ? (
                /* VIEW 2: Reset Password Form (Visible after OTP is sent) */
                <div className="w-[450px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl flex flex-col p-10 text-white">
                    <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
                    <p className="text-white/70 mb-8 text-sm">Please enter the code sent to your email and choose a new password.</p>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-white/50 px-1">VERIFICATION CODE</label>
                            <input
                                type="text"
                                placeholder='Enter OTP'
                                className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-accent transition-all placeholder:text-white/20"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-white/50 px-1">NEW PASSWORD</label>
                            <input
                                type='password'
                                placeholder='Enter New Password'
                                className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-accent transition-all placeholder:text-white/20"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-white/50 px-1">CONFIRM PASSWORD</label>
                            <input
                                type='password'
                                placeholder='Confirm New Password'
                                className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-accent transition-all placeholder:text-white/20"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={resetPassword}
                            className="w-full h-14 bg-accent hover:bg-transparent hover:text-accent border border-accent text-white font-bold rounded-xl mt-4 transition-all shadow-lg active:scale-95"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
                ) : (
                /* VIEW 1: Email Request Form (Initial View) */
                <div className="w-[450px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl flex flex-col p-10 text-white">
                    <h2 className="text-4xl font-bold mb-2">Forgot?</h2>
                    <p className="text-white/70 mb-8">Enter your email address and we'll send you a recovery code.</p>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium mb-1 px-1">Email Address</label>
                        <input
                            type="email"
                            placeholder='Enter Your Email'
                            className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-accent transition-all mb-6 placeholder:text-white/20"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>

                    <button 
                        onClick={sendOtp}
                        className="w-full h-14 bg-accent hover:bg-transparent hover:text-accent border border-accent text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                    >
                        Send OTP
                    </button>                       
                </div>
                )
            }
        </div>
   );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";

export default function RegisterPage(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate();

    async function handleRegister() {

    if (firstName.trim() === "") { toast.error("First Name Required"); return; }
    if (lastName.trim() === "") { toast.error("Last Name Required"); return; }
    if (email.trim() === "") { toast.error("Email is Required"); return; }
    if (password.trim() === "") { toast.error("Password is Required"); return; }
    if (confirmPassword.trim() === "") { toast.error("Confirm Password is Required"); return; }
    
    if (password !== confirmPassword) {
        toast.error("Passwords Do Not Match");
        return;
    }

    setIsLoading(true);
    try {
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", { 
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: password.trim()
        });

        toast.success("Registration successful!");
        navigate("/login"); 
    } catch (err) {
        toast.error("Registration failed. Please check your details.");
        console.error(err);
    } finally {
        setIsLoading(false);
    }
}
        
    return (
        <div className="w-full min-h-screen bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row">
           
           {/* Left Branding */}
           <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 text-center">
                <Link to="/">
                 <img src="logo (1).png" className="w-[140px] md:w-[200px] h-auto object-contain mb-4" alt="Logo" />
               </Link>

                <h1 className="font-bold text-white text-2xl md:text-4xl">
                    Your one-stop shop for all your computer needs
                </h1>

                <h1 className="font-bold text-blue-300 text-sm md:text-xl mt-2">
                    Grow your digital world, Join us today
                </h1>
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                <div className="w-full max-w-[500px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl flex flex-col p-6 md:p-8 text-white">

                    <h2 className="text-2xl md:text-3xl font-semibold mb-1">Register</h2>
                    <p className="text-white/70 mb-6 text-sm">
                        Create an account to get started.
                    </p>

                    <div className="flex flex-col gap-4">

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium">First Name</label>
                                <input 
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text" 
                                    placeholder="First Name" 
                                    className="w-full h-11 px-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-all text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium">Last Name</label>
                                <input 
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text" 
                                    placeholder="Last Name" 
                                    className="w-full h-11 px-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium">Email Address</label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full h-11 px-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-all text-sm"
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full h-11 px-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-all text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium">Confirm</label>
                                <input
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full h-11 px-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleRegister}
                            className="w-full h-12 bg-accent hover:bg-white hover:text-accent border border-accent text-white font-bold rounded-xl mt-4 transition-all duration-300 shadow-lg"
                        >
                            Register
                        </button>
                        
                        <p className="text-center text-xs text-white/60">
                            Already have an account?{" "}
                            <Link to={"/login"} className="text-white font-bold cursor-pointer hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {isLoading && <Loader/>}
        </div>
    );
}
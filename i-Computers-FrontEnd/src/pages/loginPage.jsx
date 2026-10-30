import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    // Helper: decode JWT payload to extract user info as fallback
    function decodeToken(token) {
        try {
            const base64Payload = token.split(".")[1];
            const decoded = JSON.parse(atob(base64Payload));
            return {
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email,
                image: decoded.image || null
            };
        } catch {
            return null;
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            setIsLoading(true);
            axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
                token: response.access_token
            }).then((res) => {
                console.log("Google login response:", res.data);
                localStorage.setItem("token", res.data.token);

                // Save user: prefer res.data.user, fallback to decoded token
                const userData = res.data.user || decodeToken(res.data.token);
                if (userData) {
                    localStorage.setItem("user", JSON.stringify(userData));
                }

                toast.success("Login Successful");

                if (res.data.role === "admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            }).catch((err) => {
                console.log(err);
                toast.error("Google Login Failed");
            }).finally(() => {
                setIsLoading(false);
            });
        },
        onError: () => { toast.error("Google Login Failed "); },
        onNonOAuthError: () => { toast.error("Google Login Failed"); }
    });

    async function handleLogin() {
        if (email.trim() === "" || password.trim() === "") {
            toast.error("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                email: email.trim(),
                password: password.trim()
            });

            console.log("Login response:", res.data);
            localStorage.setItem("token", res.data.token);

            // Save user: prefer res.data.user, fallback to decoded token
            const userData = res.data.user || decodeToken(res.data.token);
            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
            }

            toast.success("Login successful!");

            if (res.data.role === "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/products"
            }
        } catch (err) {
            toast.error("Login failed. Please check your credentials.");
            console.error("Error during login:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row">

            {/* Left Side Branding */}
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

            {/* Right Side Login Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                <div className="w-full max-w-[500px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl flex flex-col p-6 md:p-8 text-white">

                    <h2 className="text-2xl md:text-3xl font-semibold mb-1">Login</h2>
                    <p className="text-white/70 mb-6 text-sm">
                        Welcome back! Please enter your details.
                    </p>

                    <div className="flex flex-col gap-4">

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

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="w-full h-11 px-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-all text-sm"
                            />

                            <div className="text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-accent hover:underline text-xs font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className={`w-full h-12 bg-accent hover:bg-white hover:text-accent border border-accent text-white font-bold rounded-xl mt-4 transition-all duration-300 shadow-lg ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        {/* Google Login */}
                        <button
                            onClick={googleLogin}
                            disabled={isLoading}
                            className="w-full h-12 bg-accent hover:bg-transparent hover:text-accent border border-accent text-white font-bold rounded-xl mt-1 transition-all duration-300 shadow-lg"
                        >
                            Login With <GrGoogle className="inline ml-2 mb-1"/>
                        </button>

                        <p className="text-center text-xs text-red/600">
                            Don't have an account?{" "}
                            <Link
                                to={"/register"}
                                className="text-accent font-bold cursor-pointer hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>

                    </div>
                </div>
            </div>

            {/* Loader */}
            {isLoading && <Loader />}
        </div>
    );
}
import { useState } from "react";
import { login } from "../services/auth";
import { showError, showSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showError("Please enter both email and password");
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            showSuccess("Login successful");
            navigate("/dashboard");
        } catch (err) {
            showError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/aglogofull.png"
                        alt="Logo"
                        className="h-16 object-contain"
                    />
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
                    Admin Login
                </h2>
                <p className="text-center text-gray-500 mt-1 mb-8">
                    Sign in to access your dashboard
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white font-semibold text-lg
              hover:from-blue-700 hover:to-indigo-700
              transition-all duration-300
              disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-8">
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
            </div>
        </div>
    );
}

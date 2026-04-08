import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useAuth(); // ✅ Correct

  const onSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await handleLogin({ email, password });
    } catch (err) {
      console.log(err.response?.data); // ✅ ADD THIS
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#FAF3E1]/60">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-[#FAF3E1]/40" size={18} />
          <input
            type="email"
            required
            autoComplete="email" // ✅ FIX (removes warning)
            className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#FAF3E1]/60">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-[#FAF3E1]/40" size={18} />
          <input
            type="password"
            required
            autoComplete="current-password" // ✅ FIX (removes warning)
            className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FA8112] py-3 font-bold text-[#222222] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;

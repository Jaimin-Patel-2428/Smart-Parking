import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Car,
  Lock,
  Loader2,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    vehicleNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.register(formData);
      // Backend returns { message: "OTP sent to email" }
      // We navigate to verify page and pass the email via state
      toast.success("OTP sent to your email");
      navigate("/auth/verify", { state: { email: formData.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-wider">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-[#FA8112]" size={18} />
          <input
            name="fullName"
            type="text"
            required
            onChange={handleChange}
            className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-wider">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-[#FA8112]" size={18} />
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-wider">
            Mobile
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-[#FA8112]" size={18} />
            <input
              name="mobile"
              type="tel"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
              placeholder="+1 234 567 890"
            />
          </div>
        </div>
      </div>

      {/* Vehicle Number */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-wider">
          Vehicle Number
        </label>
        <div className="relative">
          <Car className="absolute left-3 top-3 text-[#FA8112]" size={18} />
          <input
            name="vehicleNumber"
            type="text"
            required
            onChange={handleChange}
            className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
            placeholder="ABC-1234"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-wider">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-[#FA8112]" size={18} />
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FA8112] py-4 font-bold text-[#222222] transition-all hover:bg-[#fa8112]/90 active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Create Account
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;

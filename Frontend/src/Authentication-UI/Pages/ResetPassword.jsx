import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const email = location.state?.email;

  // Guard: Ensure user came from the VerifyOTP flow
  useEffect(() => {
    if (!email) {
      navigate("/auth/login");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Logic: Send email and new password to your backend
      await authService.resetPassword({ email, password: formData.password });
      toast.success("Password reset successful! Please login.");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  // Basic validation checks
  const hasMinLength = formData.password.length >= 8;
  const hasMatch =
    formData.password === formData.confirmPassword && formData.password !== "";

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FA8112]/10 text-[#FA8112]">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl font-bold text-[#FAF3E1]">
              Set New Password
            </h2>
            <p className="mt-2 text-sm text-[#FAF3E1]/60">
              Almost there! Choose a strong password for{" "}
              <span className="text-[#FAF3E1] font-medium">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-widest">
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-[#FA8112]"
                  size={18}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] py-3 pl-10 pr-12 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#FAF3E1]/30 hover:text-[#FAF3E1]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-widest">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-[#FA8112]"
                  size={18}
                />
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Password Requirements UI */}
            <div className="space-y-2 py-2">
              <div
                className={`flex items-center gap-2 text-xs ${hasMinLength ? "text-green-500" : "text-[#FAF3E1]/30"}`}
              >
                <CheckCircle2 size={14} /> At least 8 characters
              </div>
              <div
                className={`flex items-center gap-2 text-xs ${hasMatch ? "text-green-500" : "text-[#FAF3E1]/30"}`}
              >
                <CheckCircle2 size={14} /> Passwords match
              </div>
            </div>

            <button
              disabled={loading || !hasMinLength || !hasMatch}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FA8112] py-4 font-bold text-[#222222] transition-all hover:bg-[#fa8112]/90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

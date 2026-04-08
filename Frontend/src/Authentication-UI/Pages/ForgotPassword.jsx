import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend: exports.forgotPassword = async (req, res) => { ... }
      await authService.forgotPassword(email);

      // Navigate to verify-otp page, but we pass a 'reset' flag
      // so the verify page knows to redirect to 'ResetPassword' instead of 'Login'
      toast.success("Reset OTP sent to your email");
      navigate("/auth/verify", { state: { email, flow: "reset" } });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Navigation */}
        <Link
          to="/auth/login"
          className="mb-6 flex items-center gap-2 text-sm text-[#FAF3E1]/40 hover:text-[#FA8112] transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 backdrop-blur-sm shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FA8112]/10 text-[#FA8112]">
              <KeyRound size={28} />
            </div>
            <h2 className="text-2xl font-bold text-[#FAF3E1]">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-[#FAF3E1]/60">
              No worries! Enter your email and we'll send you an OTP to reset
              your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#FAF3E1]/50 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-[#FA8112]"
                  size={18}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] py-3 pl-10 pr-4 text-[#FAF3E1] focus:border-[#FA8112] focus:outline-none transition-all placeholder:text-[#FAF3E1]/20"
                  placeholder="Enter your registered email"
                />
              </div>
            </div>

            <button
              disabled={loading || !email}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#FA8112] py-4 font-bold text-[#222222] transition-all hover:bg-[#fa8112]/90 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Send Reset OTP"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#FAF3E1]/30">
              Need help? Contact{" "}
              <span className="text-[#FA8112]/60 cursor-pointer">Support</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

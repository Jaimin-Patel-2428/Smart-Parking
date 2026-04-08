import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, RefreshCcw, ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

  // Get email and flow from navigation state
  const email = location.state?.email;
  const flow = location.state?.flow || "register"; // default to register

  // Security: If no email is found, redirect back to register or login
  useEffect(() => {
    if (!email) {
      navigate(flow === "reset" ? "/auth/login" : "/auth/register");
    }
  }, [email, navigate, flow]);

  // Resend Timer logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setLoading(true);
    try {
      await authService.verifyOTP(email, otp, flow);
      if (flow === "reset") {
        navigate("/auth/reset-password", { state: { email } });
      } else {
        toast.success("Account verified successfully!");
        navigate("/auth/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authService.resendOTP(email);
      setTimer(60); // Reset timer to 60 seconds
      toast.success("A new OTP has been sent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button
          onClick={() => navigate(flow === "reset" ? "/auth/forgot-password" : "/auth/register")}
          className="mb-6 flex items-center gap-2 text-sm text-[#FAF3E1]/40 hover:text-[#FA8112] transition-colors"
        >
          <ArrowLeft size={16} /> Back to {flow === "reset" ? "Forgot Password" : "Register"}
        </button>

        <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 backdrop-blur-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FA8112]/10 text-[#FA8112]">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#FAF3E1]">
              {flow === "reset" ? "Verify Reset Code" : "Check your email"}
            </h2>
            <p className="mt-2 text-sm text-[#FAF3E1]/60">
              {flow === "reset"
                ? "Enter the 6-digit code sent to your email to reset your password."
                : "We've sent a 6-digit verification code to"
              }
              {flow === "register" && (
                <>
                  <br />
                  <span className="font-semibold text-[#FAF3E1]">{email}</span>
                </>
              )}
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center">
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-transparent text-center text-4xl font-bold tracking-[0.75rem] text-[#FA8112] placeholder:text-[#FAF3E1]/10 focus:outline-none"
                placeholder="000000"
                autoFocus
              />
            </div>

            <button
              disabled={loading || otp.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FA8112] py-4 font-bold text-[#222222] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                flow === "reset" ? "Verify & Reset" : "Verify Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#FAF3E1]/60">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={timer > 0 || resending}
              className="mt-2 flex items-center justify-center gap-2 w-full text-sm font-semibold text-[#FA8112] disabled:text-[#FAF3E1]/20"
            >
              {resending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <RefreshCcw size={16} />
                  {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

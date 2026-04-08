import React, { useState } from "react";
import authService from "../Services/authService";
import toast from "react-hot-toast";

const OTPInput = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      await authService.verifyOTP(email, otp);
      onVerified();
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-bold text-[#FAF3E1]">Verify your Email</h2>
      <p className="text-sm text-[#FAF3E1]/60">
        Enter the 6-digit code sent to {email}
      </p>

      <input
        type="text"
        maxLength="6"
        className="w-full bg-transparent text-center text-4xl font-bold tracking-[1rem] text-[#FA8112] focus:outline-none"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="w-full rounded-xl bg-[#FA8112] py-3 font-bold text-[#222222]"
      >
        Complete Registration
      </button>
    </div>
  );
};

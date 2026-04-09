import { useState } from "react";
import {
  sendDeleteOTP,
  verifyDeleteOTP,
  deleteAccount,
} from "../Services/settingsService";

const useDeleteAccount = () => {
  const [step, setStep] = useState("idle");
  const [deleting, setDeleting] = useState(false);
  // idle → otp → verified

  const handleSendOTP = async () => {
    try {
      await sendDeleteOTP();
      setStep("otp");
      return true;
    } catch (error) {
      console.error("Send OTP error:", error);
      throw error;
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      await verifyDeleteOTP(otp);
      setStep("verified");
      return true;
    } catch (error) {
      console.error("Verify OTP error:", error);
      throw error;
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const response = await deleteAccount();
      return response;
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    } finally {
      setDeleting(false);
    }
  };

  return {
    step,
    deleting,
    handleSendOTP,
    handleVerifyOTP,
    handleDeleteAccount,
  };
};

export default useDeleteAccount;

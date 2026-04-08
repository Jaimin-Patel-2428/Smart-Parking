import React from "react";
import { X } from "lucide-react";

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  intent = "default",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  const intentStyles = {
    default: "bg-[#FA8112] text-[#222222] hover:bg-[#FAF3E1]",
    danger: "bg-rose-500 text-white hover:bg-rose-400",
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-[#222222]/75 backdrop-blur-md px-4">
      <div className="w-full max-w-md overflow-hidden rounded-4xl border border-[#F5E7C6]/10 bg-[#1a1a1a] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#F5E7C6]/5 p-6">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#FAF3E1]">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[#FAF3E1]/60">{message}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl p-2 text-[#FAF3E1]/30 transition-colors hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 p-6">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#F5E7C6]/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-[#FAF3E1]/50 transition-colors hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-5 py-3 text-xs font-black uppercase tracking-widest transition-colors ${intentStyles[intent] || intentStyles.default}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

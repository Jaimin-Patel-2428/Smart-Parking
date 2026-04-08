import React from "react";
import { X } from "lucide-react";

const InputDialog = ({
  open,
  title,
  message,
  value,
  onChange,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  placeholder = "",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#222222]/75 backdrop-blur-md px-4">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-[#F5E7C6]/10 bg-[#1a1a1a] shadow-2xl">
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

        <div className="space-y-4 p-6">
          <input
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.03] px-4 py-3 text-sm font-medium text-[#FAF3E1] outline-none transition-colors placeholder:text-[#FAF3E1]/20 focus:border-[#FA8112]"
          />

          <div className="flex items-center justify-end gap-3">
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
              className="rounded-xl bg-[#FA8112] px-5 py-3 text-xs font-black uppercase tracking-widest text-[#222222] transition-colors hover:bg-[#FAF3E1]"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDialog;

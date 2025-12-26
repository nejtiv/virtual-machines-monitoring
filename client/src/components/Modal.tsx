import React from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function Modal({ isOpen, title, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-600 hover:text-gray-900" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

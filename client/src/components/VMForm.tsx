import React, { useState } from "react";
import type { VMCreateProps, VMUpdateProps } from "../services/virtualMachinesService";

type VMFormProps = {
  initialData?: VMCreateProps | VMUpdateProps;
  submitLabel?: string;
  onSubmit: (data: VMCreateProps | VMUpdateProps) => void | Promise<void>;
  onCancel: () => void;
};

export default function VMForm({ initialData, submitLabel = "Save", onSubmit, onCancel }: VMFormProps) {
  const [vmName, setVmName] = useState(initialData?.vm_name ?? "");
  const [ipv4, setIpv4] = useState(initialData?.ipv4 ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ vm_name: vmName, ipv4 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          name="vm_name"
          value={vmName}
          onChange={(e) => setVmName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">IPv4</label>
        <input
          name="ipv4"
          value={ipv4}
          onChange={(e) => setIpv4(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-400 transition-colors rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
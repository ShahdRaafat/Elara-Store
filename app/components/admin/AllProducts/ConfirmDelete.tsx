"use client";

import { TrashIcon } from "lucide-react";

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-stone-100 border  rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-brand-500">
          Confirm Delete
        </h2>

        <p className="text-brand-500 mb-6">
          Are you sure you want to delete this reservation? This action cannot
          be undone.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-brand-500 bg-brand-100 rounded hover:bg-brand-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-brand-500 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            <>
              <TrashIcon className="h-4 w-4" />
              Delete
            </>
          </button>
        </div>
      </div>
    </div>
  );
}

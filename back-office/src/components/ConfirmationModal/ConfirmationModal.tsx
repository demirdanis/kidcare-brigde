import { IConfirmationModal } from "./ConfirmationModal.types";

export const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: IConfirmationModal) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onCancel}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-gray-600 text-sm leading-6">{message}</p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              İptal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-ring py-3 rounded-lg text-primary-foreground font-medium hover:bg-primary-hover transition-colors duration-200"
            >
              Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

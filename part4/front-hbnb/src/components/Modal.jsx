import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl ${className || 'max-w-md'} w-full mx-4`}>
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-6 dark:text-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

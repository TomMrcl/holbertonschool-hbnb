import { useState, useEffect } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toasts, addToast };
}

export default function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg text-white font-medium animate-fade-in dark:shadow-lg ${
            toast.type === 'error' ? 'bg-red-500 dark:bg-red-600' : 'bg-green-500 dark:bg-green-600'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

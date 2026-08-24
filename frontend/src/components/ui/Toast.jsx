import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, variant = "success") => {
    const id = Date.now();

    setToasts((actuales) => [...actuales, { id, message, variant }]);

    setTimeout(() => {
      setToasts((actuales) => actuales.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div className="sh-toast-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className={`sh-toast sh-toast--${toast.variant}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
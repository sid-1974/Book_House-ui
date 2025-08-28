import { useState, useEffect, ReactNode } from 'react';


export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;


export type ToastType = typeof TOAST_TYPES[keyof typeof TOAST_TYPES];

export interface Toast {
  id: number;
  message: ReactNode;
  type: ToastType;
}

export interface ToastProps {
  message: ReactNode;
  type: ToastType;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export interface ToastContainerProps {
  // You can add props here if needed
}


const Toast = ({ 
  message, 
  type, 
  onClose, 
  autoClose = true, 
  autoCloseTime = 5000 
}: ToastProps) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return {
          bgColor: 'var(--success)',
          icon: '✓',
          border: '1px solid var(--success)',
        };
      case TOAST_TYPES.ERROR:
        return {
          bgColor: 'var(--error)',
          icon: '✕',
          border: '1px solid var(--error)',
        };
      case TOAST_TYPES.WARNING:
        return {
          bgColor: 'var(--warning)',
          icon: '⚠',
          border: '1px solid var(--warning)',
        };
      case TOAST_TYPES.INFO:
      default:
        return {
          bgColor: 'var(--primary)',
          icon: 'ℹ',
          border: '1px solid var(--primary)',
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div 
      className="toast-notification"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        border: styles.border,
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        minWidth: '20rem',
        maxWidth: '25rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          backgroundColor: styles.bgColor,
          color: 'white',
          borderRadius: '50%',
          width: '1.5rem',
          height: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '0.875rem',
          fontWeight: 'bold',
        }}
      >
        {styles.icon}
      </div>
      <div style={{ flex: 1, fontSize: '0.875rem' }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: '1.25rem',
          padding: 0,
          marginLeft: '0.5rem',
            lineHeight: 1,
        }}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};


interface ToastAPI {
  success: (message: ReactNode) => number;
  error: (message: ReactNode) => number;
  warning: (message: ReactNode) => number;
  info: (message: ReactNode) => number;
  dismiss: (id: number) => void;
}

const ToastContainer = ({}: ToastContainerProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: ReactNode, type: ToastType = TOAST_TYPES.INFO): number => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    return id;
  };

  const removeToast = (id: number): void => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };


  const toastAPI: ToastAPI = {
    success: (message: ReactNode) => addToast(message, TOAST_TYPES.SUCCESS),
    error: (message: ReactNode) => addToast(message, TOAST_TYPES.ERROR),
    warning: (message: ReactNode) => addToast(message, TOAST_TYPES.WARNING),
    info: (message: ReactNode) => addToast(message, TOAST_TYPES.INFO),
    dismiss: (id: number) => removeToast(id),
  };

  useEffect(() => {
    const event = new CustomEvent('toastAPIReady', { detail: toastAPI });
    window.dispatchEvent(event);
    
    (window as any).toast = toastAPI;
    
    return () => {
      (window as any).toast = null;
    };
  }, []);

  return (
  <div
  className="
    fixed
    top-4
    z-[9999]
    flex
    flex-col      
    space-y-2       
    w-full
    items-center          
    sm:items-end          
    sm:w-auto
    sm:right-4
    sm:top-0.5
  "
>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          autoClose={true}
          autoCloseTime={5000}
        />
      ))}
    </div>
  );
};


let toastAPI: ToastAPI | null = null;


if (typeof window !== 'undefined') {
  window.addEventListener('toastAPIReady', ((event: CustomEvent<ToastAPI>) => {
    toastAPI = event.detail;
  }) as EventListener);
}


export default ToastContainer;


export const toast: ToastAPI = {
  success: (message: ReactNode): number => {
    if (toastAPI) return toastAPI.success(message);
    return Date.now();
  },
  error: (message: ReactNode): number => {
    if (toastAPI) return toastAPI.error(message);
    return Date.now();
  },
  warning: (message: ReactNode): number => {
    if (toastAPI) return toastAPI.warning(message);
    return Date.now();
  },
  info: (message: ReactNode): number => {
    if (toastAPI) return toastAPI.info(message);
    return Date.now();
  },
  dismiss: (id: number): void => {
    if (toastAPI) toastAPI.dismiss(id);
  },
};
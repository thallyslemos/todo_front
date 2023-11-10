'use client'
import React, { useState, createContext, ReactNode } from 'react';
import Toast from './Toast';

type ToastContextType = {
  toastData: { message: string; type: string };
  setToastData: React.Dispatch<React.SetStateAction<{ message: string; type: string }>>;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastData, setToastData] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  return (
    <ToastContext.Provider value={{ toastData, setToastData, showToast, setShowToast }}>
      {children}
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          interval={5000}
          onClose={() => setShowToast(false)}
        />
      )}
    </ToastContext.Provider>
  );
};
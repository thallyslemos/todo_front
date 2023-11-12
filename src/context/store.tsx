"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

type ToastData = {
  message: string;
  type: string;
};

interface ContextProps {
  toastData: ToastData;
  setToastData: Dispatch<SetStateAction<ToastData>>;
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  toastData: { message: "", type: "" },
  setToastData: () => {},
  showToast: false,
  setShowToast: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData>({
    message: "",
    type: "",
  });
  const [showToast, setShowToast] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ toastData, setToastData, showToast, setShowToast }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);

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

type UserData = {
  id: number;
  name: string | null;
  email: string;
};

interface ContextProps {
  toastData: ToastData;
  setToastData: Dispatch<SetStateAction<ToastData>>;
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  toastData: { message: "", type: "" },
  setToastData: () => {},
  showToast: false,
  setShowToast: () => {},
  userData: { id: 0, name: null, email: "" },
  setUserData: () => {},
  token: "",
  setToken: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData>({
    message: "",
    type: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    name: null,
    email: "",
  });
  const [token, setToken] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        toastData,
        setToastData,
        showToast,
        setShowToast,
        userData,
        setUserData,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);

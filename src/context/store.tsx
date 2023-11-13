"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
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
  logout: () => void;
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
  logout: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData>({
    message: "",
    type: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [userData, setUserData] = useState<UserData>(() => {
    if (typeof window !== "undefined") {
      const localData = window.localStorage.getItem("userData");
      return localData
        ? JSON.parse(localData)
        : { id: 0, name: null, email: "" };
    }
    return { id: 0, name: null, email: "" };
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const logout = () => {
    setUserData({ id: 0, name: null, email: "" });
    window.localStorage.removeItem("userData");
  };

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
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);

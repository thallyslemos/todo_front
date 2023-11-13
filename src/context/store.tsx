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
import { useRouter } from "next/navigation";

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
  isLogged: () => boolean;
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
  isLogged: () => false,
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

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && userData.id !== 0) {
      window.localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const logout = () => {
    window.localStorage.removeItem("userData");
    router.push('/');
    router.refresh();
  };

  const isLogged = () => {
    const localData = window.localStorage.getItem("userData");
    if (localData) {
      return true;
    }
    return false;
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
        isLogged,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);

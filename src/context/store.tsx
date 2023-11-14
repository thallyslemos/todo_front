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
import NoSSRWrapper from "@/components/NoSSRWrapper";

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
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
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
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData>({
    message: "",
    type: "",
  });

  const [showToast, setShowToast] = useState(false);

  const [userData, setUserData] = useState<UserData>(() => {
    if (typeof window !== "undefined") {
      const localData = window.sessionStorage.getItem("userData");
      return localData
        ? JSON.parse(localData)
        : { id: 0, name: null, email: "" };
    }
    return { id: null, name: null, email: null };
  });

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      const localData = window.sessionStorage.getItem("token");
      return localData ? localData : "";
    }
    return "";
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && userData.id !== 0) {
      window.sessionStorage.setItem("userData", JSON.stringify(userData));
      window.sessionStorage.setItem("token", token);
    }
  }, [userData, token]);

  const logout = () => {
    window.sessionStorage.removeItem("userData");
    window.sessionStorage.removeItem("token");
    setUserData({ id: 0, name: null, email: "" });
    setToken("");
    setIsLoggedIn(false);
    router.push("/");
    // router.refresh();
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
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <NoSSRWrapper>{children}</NoSSRWrapper>
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);

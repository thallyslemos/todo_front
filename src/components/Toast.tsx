"use cleint";
import { CheckIcon, ExclamationIcon } from "@/app/assets/icons";
import { Alert, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";

type ToastProps = {
  message: string;
  type: string;
  interval?: number;
  onClose: () => void;
};

const Toast = ({ message, type, interval = 5000, onClose }: ToastProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [interval, onClose]);

  return (
    <Alert
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      icon={type === "success" ? <CheckIcon /> : <ExclamationIcon />}
      className={`z-50 flex justify-center m-5 fixed top-0 max-w-xs ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <Typography color="white">{message}</Typography>
    </Alert>
  );
};

export default Toast;

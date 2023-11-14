"use client";
import { CheckIcon, ExclamationIcon } from "@/app/assets/icons";
import { useGlobalContext } from "@/context/store";
import { Alert, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";

const Toast = () => {
  const { toastData, setShowToast, showToast } = useGlobalContext();

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showToast, setShowToast]);

  if (!showToast) {
    return null;
  }

  return (
    <div className="flex w-full justify-center">
      <Alert
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        icon={
          toastData.type === "success" ? <CheckIcon /> : <ExclamationIcon />
        }
        className={`z-50 flex mt-5 mx-auto fixed top-0 max-w-xs ${
          toastData.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <Typography color="white">{toastData.message}</Typography>
      </Alert>
    </div>
  );
};
export default Toast;

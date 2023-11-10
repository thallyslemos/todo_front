"use client";
import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="min-h-screen-main justify-center flex-col flex ">
      <Spinner color="deep-orange" />
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";
import { useGlobalContext } from "@/context/store";
import { LogOUtIcon, UserIcon } from "@/app/assets/icons";

const StickyNavbar = () => {
  const [openNav, setOpenNav] = useState(false);

  const { isLoggedIn, logout, userData } = useGlobalContext();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link href="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      {!isLoggedIn && (
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-normal"
        >
          <Link href="/login" className="flex items-center">
            Login
          </Link>
        </Typography>
      )}
      {isLoggedIn && (
        <>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-normal"
          >
            <Link href="/todo" className="flex items-center">
              Listas
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-normal flex gap-2"
          >
            {" "}
            <UserIcon />
            {userData.name}
          </Typography>
          <Tooltip content="Sair">
            <IconButton
              size="sm"
              variant="text"
              className="text-secondary "
              onClick={() => handleLogout()}
            >
              <LogOUtIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 bg-primary shadow-lg">
      <div className="flex items-center justify-between text-secondary">
        <Typography
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-extrabold text-lg text-transparent bg-orange-gradient bg-clip-text"
        >
          V360 TODOLIST
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>{navList}</Collapse>
    </Navbar>
  );
};
export default StickyNavbar;

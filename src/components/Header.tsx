"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { status, data } = useSession();

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);
  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  };

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <div className="relative h-[32px] w-[183px]">
        <Image src="/logo.png" alt="Full Stack Week" fill />
      </div>

      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}

      {status === "authenticated" && data.user && (
        <div className="flex items-center gap-3 rounded-full border-grayLighter border border-solid px-3 p-2 relative">
          <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer"/>

          <Image
            height={32}
            width={32}
            alt={data.user.name!}
            src={data.user.image!}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="absolute top-14 left=0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <button
                className="text-primary text-sm font-semibold"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

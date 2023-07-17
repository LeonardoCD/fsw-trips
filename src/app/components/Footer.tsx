import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-walterWhite p-5">
      <Image src="/logo.png" width={133} height={23} alt="Full stack week" />

      <p className="text-sm font-medium text-primaryDarker mt-1">
        Todos os direitos reservados.
      </p>
    </div>
  );
}

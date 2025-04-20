import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  column?: boolean;
}

const Phone = ({ className, imgSrc, column = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-40 overflow-hidden h-[500px] flex items-center justify-center",
        column && "lg:h-[500px] h-[530px]",
        className
      )}
      {...props}
    >
      <Image
        src={"/phone-template.png"}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
        fill
        sizes="1"
      />
      <div className="relative h-[99%] w-[98%]">
        <Image
          sizes="1"
          src={imgSrc}
          alt="overlaying phone image"
          className={cn(
            "object-cover absolute -z-10 inset-0 rounded-[2.1rem]",
            column && "rounded-[2.5rem] lg:rounded-[2.1rem]"
          )}
          fill
        />
      </div>
    </div>
  );
};

export default Phone;

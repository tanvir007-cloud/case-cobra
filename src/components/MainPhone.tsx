import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface MainPhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

const MainPhone = ({ imgSrc, className, ...props }: MainPhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-40 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        src={"/phone-template-white-edges-removebg-preview.png"}
        className="pointer-events-none z-40 select-none"
        alt="phone image"
      />

      <div className={cn("absolute -z-10 inset-0")}>
        <img
          className="object-cover min-w-full min-h-full z-10"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};

export default MainPhone;

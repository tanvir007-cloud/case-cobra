import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Social from "./Social";
import LoginForm from "./login/components/LoginForm";
import { cn } from "@/lib/utils";
import SigninForm from "./signin/components/SigninForm";

const LoginModal = ({
  open,
  setOpen,
  currentUser,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentUser: boolean;
}) => {
  const [varient, setVarient] = useState<"LOGIN" | "SIGIN">("LOGIN");

  useEffect(() => {
    if (currentUser) setOpen(false);
  }, [currentUser,setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader
          className={cn(
            "flex flex-col justify-center",
            varient === "LOGIN" && "items-center"
          )}
        >
          <DialogTitle>
            {varient === "LOGIN" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription>
            {varient === "LOGIN"
              ? "Login with your GitHub or Google account"
              : "Enter your email below to create your account"}
          </DialogDescription>
        </DialogHeader>
        <Social />
        {varient === "LOGIN" ? (
          <LoginForm />
        ) : (
          <SigninForm setVarient={setVarient} varient={varient} />
        )}
        <div className="text-center text-sm mt-3">
          {varient === "LOGIN"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="underline underline-offset-4 cursor-pointer"
            onClick={() =>
              varient === "LOGIN" ? setVarient("SIGIN") : setVarient("LOGIN")
            }
          >
            {varient === "LOGIN" ? "Signin" : "Login"}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

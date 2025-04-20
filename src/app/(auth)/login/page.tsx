import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import Social from "../Social";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="sm:max-w-sm w-[90%]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Social />
          <LoginForm />
          <div className="text-center text-sm mt-3">
            Don&apos;t have an account?{" "}
            <Link href="/signin" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

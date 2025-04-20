import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import SigninForm from "./components/SigninForm";
import Link from "next/link";
import Social from "../Social";

const SigninPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="md:max-w-md sm:max-w-md w-[90%]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Social />
          <SigninForm />
          <div className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;

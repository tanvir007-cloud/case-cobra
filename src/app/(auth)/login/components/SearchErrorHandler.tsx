"use client";

import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchErrorHandler = () => {
  const searchParams = useSearchParams();

  const error =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  useEffect(() => {
    if (error) {
      toast({ title: error });
    }
  }, [error]);

  return null;
};

export default SearchErrorHandler;

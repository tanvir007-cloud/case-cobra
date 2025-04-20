"use client";
import React, {
  Fragment,
  useTransition,
} from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Social = () => {
  const [transition, startTransition] = useTransition();

  const onClick = (provider: "github" | "google") => {
    try {
      startTransition(async () => {
        await signIn(provider);
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Fragment>
      <div className="flex items-center gap-4">
        <Button
          disabled={transition}
          variant={"outline"}
          className="w-full"
          onClick={() => onClick("github")}
        >
          <FaGithub />
          GitHub
        </Button>
        <Button
          disabled={transition}
          variant={"outline"}
          className="w-full"
          onClick={() => onClick("google")}
        >
          <FaGoogle />
          Google
        </Button>
      </div>
      <div className="relative mt-3 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-zinc-200 after:dark:border-zinc-800">
        <span className="relative z-10 bg-white dark:bg-zinc-950 px-2 text-zinc-600 dark:text-zinc-400">
          OR CONTINUE WITH
        </span>
      </div>
    </Fragment>
  );
};

export default Social;

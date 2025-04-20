import React, { Fragment } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Avatar from "./Avatar";
import getCurrentUser from "@/app/getActions/getCurrentUser";
import { signOut } from "@/auth/auth";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <Link
            href={"/"}
            className={"flex z-40 font-bold outline-none items-center text-2xl"}
          >
            case{" "}
            <span className="text-green-600 dark:text-green-500">cobra</span>
          </Link>
          <div className="h-full flex items-center gap-4">
            {currentUser ? (
              <Fragment>
                <ModeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar
                      src={currentUser?.image || ""}
                      className="size-10"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium capitalize w-[200px] truncate">
                          {currentUser.name}
                        </p>
                        <p className="w-[200px] truncate text-sm text-gray-700 dark:text-slate-300">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={"/configure/upload"}
                        className="cursor-pointer"
                      >
                        Create case
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href={""}>Dashboard ✨</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href={"/settings"}>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <DropdownMenuItem>
                        <button type="submit" className="w-full text-start">
                          Log out
                        </button>
                      </DropdownMenuItem>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Fragment>
            ) : (
              <Fragment>
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
                <Link
                  href={"/login"}
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                >
                  Log in
                </Link>
                <ModeToggle size="sm" />
              </Fragment>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

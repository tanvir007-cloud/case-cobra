"use client";
import { signinSchema } from "@/lib/zodValidation";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import signin from "@/app/actions/signin";
import { toast } from "@/hooks/use-toast";

const SigninForm = ({
  setVarient,
  varient,
}: {
  setVarient?: Dispatch<SetStateAction<"LOGIN" | "SIGIN">>;
  varient?: "SIGIN";
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    const data = await signin(values);

    if (data.success) {
      toast({
        title: data.success,
      });
      if (varient !== undefined && setVarient !== undefined) {
        setVarient("LOGIN");
      } else {
        router.push("/login");
      }
    }

    if (data.error) {
      toast({
        title: data.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label>Name</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="username"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label>Password</Label>
              <FormControl>
                <Input
                  type="password"
                  placeholder="your password"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full mt-3">
          {loading && <Loader2 className="animate-spin" />}
          Create account
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;

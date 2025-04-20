"use server";
import { loginSchema } from "@/lib/zodValidation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { signIn } from "@/auth/auth";

const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalied credentials" };

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.email)
    return { error: "Email does not exist!" };

  const checkPassword = await bcrypt.compare(
    password,
    existingUser.password as string
  );

  if (!checkPassword) return { error: "Incorrect password" };

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalied credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export default login;

"use server";

import { prisma } from "@/prisma";
import { saltAndHashPassword } from "@/lib/password-utills";

export const signUp = async (email: string, password: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { status: "error", message: "이미 존재하는 이메일입니다." };
    }

    const hashedPassword = await saltAndHashPassword(password);

    const user = await prisma.user.create({
      data: { email, hashedPassword },
    });

    if (user) {
      return { status: "ok" };
    }
  } catch (error) {
    return { status: "error", message: "회원가입 실패" };
  }
};

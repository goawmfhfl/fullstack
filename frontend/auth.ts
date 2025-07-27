import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "./lib/password-utills";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // 프로덕션 환경에서는 쿠키를 보안 쿠키로 설정
  useSecureCookies: process.env.NODE_ENV === "production",
  // 프로덕션 환경에서는 트러스트 호스트를 설정
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email", placeholder: "이메일 입력" },
        password: {
          label: "비밀번호",
          type: "password",
        },
      },
      async authorize(credentials) {
        // 이메일과 비밀번호가 비어있으면 에러 발생
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        // DB에서 유저 조회
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // 유저가 존재하지 않으면 에러 발생
        if (!user) {
          throw new Error("존재하지 않는 이메일입니다.");
        }

        const passwordsMatch = await comparePassword(
          credentials.password as string,
          user.hashedPassword as string
        );

        if (!passwordsMatch) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        // 로그인 성공 시 유저 정보 반환
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {},
  callbacks: {},
});

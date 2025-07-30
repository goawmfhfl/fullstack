"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
      });
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* 로고 및 헤더 */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
        </div>

        {/* 로그인 카드 */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이메일 입력 */}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    className="pl-10 h-12 text-base"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    className="pl-10 pr-10 h-12 text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base"
              >
                로그인
              </Button>
            </form>

            {/* 추가 링크들 */}
            <div className="flex justify-center space-x-4 text-sm">
              <a
                href="/forgot-password"
                className="text-gray-600 hover:text-gray-800 hover:underline"
              >
                비밀번호 찾기
              </a>
              <a
                href="/signup"
                className="text-gray-600 hover:text-gray-800 hover:underline"
              >
                회원가입
              </a>
              <a
                href="/forgot-email"
                className="text-gray-600 hover:text-gray-800 hover:underline"
              >
                아이디(이메일) 찾기
              </a>
            </div>

            {/* 구분선 */}
            <div className="relative">
              <Separator />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                간편 로그인
              </span>
            </div>

            {/* 간편 로그인 버튼들 */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50"
                onClick={() => console.log("카카오 로그인")}
              >
                <div className="w-6 h-6 bg-yellow-400 rounded-sm mr-2"></div>
                카카오
              </Button>
              <Button
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50"
                onClick={() => console.log("네이버 로그인")}
              >
                <div className="w-6 h-6 bg-green-500 rounded-sm mr-2"></div>
                네이버
              </Button>
              <Button
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50"
                onClick={() => console.log("구글 로그인")}
              >
                <div className="w-6 h-6 bg-red-500 rounded-sm mr-2"></div>
                구글
              </Button>
              <Button
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50"
                onClick={() => console.log("애플 로그인")}
              >
                <div className="w-6 h-6 bg-black rounded-sm mr-2"></div>
                애플
              </Button>
            </div>

            {/* 약관 설명 */}
            <div className="text-xs text-gray-500 text-center leading-relaxed">
              로그인하면{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                이용약관
              </a>{" "}
              및{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                개인정보처리방침
              </a>
              에 동의하는 것으로 간주됩니다.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

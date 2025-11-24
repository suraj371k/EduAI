"use client";

import AnimatedText from "@/components/ui/AnimateText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { mutate, isPending, isError } = useLogin();

  const [form, setForm] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        toast.success("Login successfully");
        router.push("/");
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  return (
    <div className="flex w-full h-screen">
      {/* right content */}
      <div className="w-full flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-xl p-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Welcome to <span className="text-blue-600">EduAI</span>
            </CardTitle>
            <AnimatedText text="Welcome back! you can continue your learning where you left." />
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* email field */}
              <div className="flex flex-col space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* password field */}
              <div className="flex flex-col space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <Button className="flex center w-full cursor-pointer">
                {isPending ? "Loading..." : "Login"}
              </Button>

              <p className="text-center">
                Already have an account?{" "}
                <Link className="text-blue-500" href={"/signup"}>
                  Signup
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

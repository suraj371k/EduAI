"use client";

import AnimatedText from "@/components/ui/AnimateText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const signupMutate = useSignup();


  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutate.mutate(form, {
      onSuccess: (data) => {
        toast.success("Signup successfully")
        router.push('/login')
      },
      onError: (err:any) => {
        toast.error(err)
        console.log(err);
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
            <AnimatedText text="Create your account to start learning smarter." />
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* name field */}
              <div className="flex flex-col space-y-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

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
                {signupMutate.isPending ? "Loading..." : " Sign up"}
              </Button>

              <p className="text-center">
                Already have an account?{" "}
                <Link className="text-blue-500" href={"/login"}>
                  Login
                </Link>
              </p>
              <p className="text-xs text-gray-400 text-center pt-2">
                By signing up, you agree to EduAI&apos;s Terms & Privacy Policy.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;

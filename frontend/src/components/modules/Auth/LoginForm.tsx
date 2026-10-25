/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginAction } from "@/actions/auth.action";
import AppField from "@/components/shared/form/AppField";
import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import {
  Eye,
  EyeOff,
  LogInIcon,
  ShieldCheck,
  User,
  Wrench,
  KeyRound,
  ShieldUser,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
    onSuccess: (result) => {
      if ("success" in result && result.success === false) {
        setServerError(result.message || "Invalid credentials");
      } else {
        toast.success("Welcome back! Logging you in...");
      }
    },
    onError: (error: any) => {
      setServerError(error?.message || "Something went wrong during login");
    },
  });

  useEffect(() => {
    if (serverError) {
      toast.error(serverError);
    }
  }, [serverError]);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginZodSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await mutateAsync(value);
    },
  });

  const fillCredentials = (email: string, pass: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", pass);
    toast.info(`Auto-filled credentials for testing.`);
  };

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const frontendRedirect = encodeURIComponent(redirectPath || "/dashboard");
    window.location.href = `${baseUrl}/auth/login/google?redirect=${frontendRedirect}`;
  };

  const credentials = [
    {
      label: "Admin",
      email: "admin@servicehub.com",
      pass: "Admin123",
      icon: <ShieldCheck />,
    },
    {
      label: "Manager",
      email: "manager@servicehub.com",
      pass: "Manager123",
      icon: <ShieldUser />,
    },
    {
      label: "Service Provider",
      email: "sprovider@servicehub.com",
      pass: "Provider123",
      icon: <Wrench />,
    },
    {
      label: "Job Candidate",
      email: "jcandidate@servicehub.com",
      pass: "Candidate123",
      icon: <UserPlus />,
    },
    {
      label: "Customer",
      email: "customer@servicehub.com",
      pass: "Customer123",
      icon: <User />,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-[85vh] p-4">
      <Card className="w-full max-w-5xl shadow-2xl border-none overflow-hidden bg-white dark:bg-slate-950 flex flex-col md:flex-row">
        <div className="md:w-3/5 px-8 py-4 md:px-14 md:py-8 bg-white dark:bg-slate-950">
          <div className="mb-10 text-center">
            <CardTitle className="text-4xl font-black tracking-tight mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Sign In
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Access the ServiceHub dashboard with your account.
            </CardDescription>
          </div>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <form.Field
              name="email"
              validators={{ onChange: loginZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12"
                />
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{ onChange: loginZodSchema.shape.password }}
            >
              {(field) => (
                <div className="space-y-1">
                  <AppField
                    field={field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12"
                    append={
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size="sm"
                        className="h-full px-3 hover:bg-transparent text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </Button>
                    }
                  />
                  <div className="flex justify-end mt-3">
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline font-bold"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <CustomSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Authenticating..."
                  disabled={!canSubmit}
                  className="w-full h-12 text-base font-extrabold"
                >
                  <LogInIcon className="mr-2 size-5" /> Login to Account
                </CustomSubmitButton>
              )}
            </form.Subscribe>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-slate-400 tracking-widest">
              <span className="bg-white dark:bg-slate-950 px-4">
                Social Login
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            className="w-full h-12 font-bold border-2"
            onClick={handleGoogleLogin}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 488 512">
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-black text-primary hover:underline underline-offset-4"
            >
              Sign Up Free
            </Link>
          </p>
        </div>

        <div className="md:w-2/5 px-6 py-8 md:px-8 border-l border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center text-center mb-6">
            <h3 className="text-2xl font-black flex items-center gap-2">
              <KeyRound className="size-5 text-primary" /> Test Accounts
            </h3>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Select a role to auto-fill credentials
            </p>
          </div>

          <div className="grid gap-3">
            {credentials?.map((role) => (
              <button
                key={role.label}
                type="button"
                onClick={() => fillCredentials(role.email, role.pass)}
                className="w-full group flex items-center gap-3 p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md hover:border-primary/50 hover:shadow-lg transition-all text-left cursor-pointer"
              >
                <div className="shrink-0 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                  {role.icon}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-200">
                    {role.label}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 truncate group-hover:text-primary transition-colors">
                    {role.email}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="animate-bounce duration-5000 mt-6 p-3 rounded-xl bg-primary/5 border border-primary/10  overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-10">
              <KeyRound size={40} />
            </div>
            <p className="text-[11px] dark:text-yellow-500 text-red-600 font-bold leading-relaxed relative z-10">
              Use these shortcuts during development to switch between user
              roles instantly.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;

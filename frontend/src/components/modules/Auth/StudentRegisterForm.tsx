/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { registerStudentAction } from "@/actions/auth.action";
import AppField from "@/components/shared/form/AppField";
import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IRegisterStudentPayload,
  registerStudentZodSchema,
} from "@/zod/auth.validation";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RegisterProps {
  redirectPath?: string;
}

const StudentRegisterForm = ({ redirectPath }: RegisterProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterStudentPayload) =>
      registerStudentAction(payload, redirectPath),
    onSuccess: (result) => {
      if ("success" in result && result.success === false) {
        setServerError(result.message || "Registration failed");
      } else {
        toast.success("Account created successfully!");
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
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },

    validators: {
      onSubmit: registerStudentZodSchema,
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      await mutateAsync(value);
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-t-4 border-t-primary bg-slate-100 dark:bg-slate-900">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Register
        </CardTitle>
        <CardDescription>Join Dev Submit</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="name"
            validators={{ onChange: registerStudentZodSchema.shape.name }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                type="text"
                placeholder="Mr. Student"
                autoComplete="name"
              />
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{ onChange: registerStudentZodSchema.shape.email }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
              />
            )}
          </form.Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="password"
              validators={{
                onChange: registerStudentZodSchema.shape.password,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  append={
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                      className="h-full px-3 py-2 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4 text-muted-foreground" />
                      ) : (
                        <Eye className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="phone"
              validators={{ onChange: registerStudentZodSchema.shape.phone }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Contact Number"
                  type="text"
                  placeholder="+88 01725 124578"
                  autoComplete="phone"
                />
              )}
            </form.Field>
          </div>

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <CustomSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Register..."
                disabled={!canSubmit}
                className="w-full"
              >
                <UserPlus className="ml-2 size-4" /> Create Account
              </CustomSubmitButton>
            )}
          </form.Subscribe>
          <div className="text-center text-sm mt-4 text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-bold"
            >
              Login here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentRegisterForm;

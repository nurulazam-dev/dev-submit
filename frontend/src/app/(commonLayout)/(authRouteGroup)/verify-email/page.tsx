"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmailAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MailCheck, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleVerify = () => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      return;
    }

    if (otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    startTransition(async () => {
      const res = await verifyEmailAction({ email, otp });

      if (res?.success) {
        toast.success("Email verified successfully! Redirecting to login...");
        router.push("/login");
      } else {
        toast.error(res?.message || "Verification failed");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-primary rounded-[2rem] overflow-hidden">
        <CardHeader className="text-center space-y-4 bg-muted/20 pb-8">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
            <MailCheck className="size-8 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black">Verify Email</CardTitle>
            <CardDescription className="text-base font-medium">
              We&apos;ve sent a code to <br />
              <span className="text-foreground font-bold">
                {email || "your email"}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => setOtp(val)}
              disabled={isPending}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="rounded-xl border-2 size-12 text-lg font-bold"
                />
                <InputOTPSlot
                  index={1}
                  className="rounded-xl border-2 size-12 text-lg font-bold"
                />
                <InputOTPSlot
                  index={2}
                  className="rounded-xl border-2 size-12 text-lg font-bold"
                />
                <InputOTPSlot
                  index={3}
                  className="rounded-xl border-2 size-12 text-lg font-bold"
                />
                <InputOTPSlot
                  index={4}
                  className="rounded-xl border-2 size-12 text-lg font-bold"
                />
                <InputOTPSlot
                  index={5}
                  className="rounded-xl border-2 size-12 text-lg font-bold"
                />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground font-medium">
              Didn&apos;t receive code?{" "}
              <button className="text-primary font-bold hover:underline">
                Resend Code
              </button>
            </p>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isPending || otp.length < 6}
            className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </Button>

          <Link
            href="/register"
            className="flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Register
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;

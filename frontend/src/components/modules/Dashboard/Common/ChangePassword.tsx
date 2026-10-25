/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  KeyRound,
  Lock,
  // ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { changePasswordService } from "@/services/auth.services";
import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/actions/auth.action";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);

    try {
      const res = await changePasswordService(payload);

      if (res.success) {
        toast.success("Security updated! Your password has been changed.");
        (e.target as HTMLFormElement).reset();

        logoutUserAction();
      } else {
        toast.error(res.message || "Failed to update password");
      }
    } catch (error: any) {
      toast.error("Internal server error. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm border border-indigo-100 dark:border-indigo-900">
          <ShieldCheck size={32} />
        </div> */}
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Security Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Protect your account by using a strong, unique password.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-3xl" />

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
              Current Password
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <KeyRound size={18} />
              </div>
              <Input
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                required
                className="pl-11 pr-12 h-13 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
              New Secure Password
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock size={18} />
              </div>
              <Input
                name="newPassword"
                type={showNew ? "text" : "password"}
                required
                className="pl-11 pr-12 h-13 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 italic ml-1">
              * Minimum 8 characters with a mix of letters and numbers.
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-13 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Updating Security...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </div>

      <p className="text-center text-slate-400 text-xs mt-6">
        Forgot your password?{" "}
        <span className="text-indigo-500 font-bold cursor-pointer hover:underline">
          Contact Support
        </span>
      </p>
    </div>
  );
}

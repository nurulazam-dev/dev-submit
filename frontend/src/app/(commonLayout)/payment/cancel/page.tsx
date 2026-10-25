"use client";

import Link from "next/link";
import { XCircle, AlertCircle, RefreshCcw } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          Payment Cancelled
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The payment process was not completed. No funds have been deducted
          from your account.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 p-4 rounded-xl mb-8 flex items-start gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            If this was a mistake, you can try paying again from your service
            request activity list.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard/my-bookings"
            className="inline-flex items-center justify-center w-full bg-slate-900 dark:bg-white dark:text-black text-white rounded-xl h-12"
          >
            <RefreshCcw className="mr-2 w-4 h-4" /> Try Again
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center w-full rounded-xl h-12 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

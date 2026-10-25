"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Thank you for your payment. Your service request has been updated, and
          an invoice has been sent to your email.
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12"
          >
            Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            href="/dashboard/my-bookings"
            className="inline-flex items-center justify-center w-full rounded-xl h-12 border border-slate-200 dark:border-slate-700"
          >
            View All Requests
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400 italic">
          If you don&apos;t see the update immediately, please refresh your
          dashboard in a few moments.
        </p>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createPaymentAction } from "@/actions/payment.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function PayButton({ requestId }: { requestId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await createPaymentAction({ requestId: requestId });

      if (res.success && "data" in res && res.data?.checkoutUrl) {
        toast.success("Redirecting to Stripe...");
        window.location.href = res.data.checkoutUrl;
      } else {
        toast.error(res.message || "Could not get checkout URL");
      }
    } catch (err: any) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full mt-3 bg-white text-indigo-600 hover:bg-slate-700 hover:text-white font-black rounded-lg h-10 border border-indigo-600 hover:border-slate-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
    >
      {loading ? "Please wait..." : "Pay Now"}
      {!loading && <ArrowRight className="w-4 h-4" />}
    </Button>
  );
}

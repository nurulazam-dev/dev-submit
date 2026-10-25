"use client";

import { Zap, Clock3, Gift, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const SpecialOffersBanner = () => {
  const handleClaimOffer = () => {
    toast.success("Offer Code 'MNA50' copied! Apply at checkout.");
  };

  return (
    <section className="py-20 px-6 bg-slate-50/50 dark:bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-indigo-600 to-blue-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 pointer-events-none" />

        <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-10 md:p-14 lg:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 shadow-2xl shadow-indigo-500/5">
          <div className="w-full md:w-2/5 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6 relative overflow-hidden">
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Clock3 className="size-4" /> Limited Time Offer
            </div>

            <h3 className="text-8xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2 relative">
              <span className="absolute -top-6 -right-6 md:-right-8 p-1.5 rounded-full bg-amber-400 text-white animate-pulse">
                <Star className="size-6 fill-white" />
              </span>
              90%
            </h3>
            <p className="text-3xl font-extrabold text-slate-700 dark:text-slate-200 tracking-tight leading-tight">
              Instant Cashback <br />{" "}
              <span className="text-slate-400">on first booking.</span>
            </p>
          </div>

          <div className="hidden md:block w-px h-32 bg-slate-100 dark:bg-slate-800 shrink-0" />

          <div className="w-full md:w-3/5 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 shadow-inner">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 text-indigo-500">
                <Gift className="size-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Welcome Bonus for New Users
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Use Code:{" "}
                  <strong className="font-extrabold text-slate-900 dark:text-white font-mono bg-indigo-50 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded-md">
                    MNA50
                  </strong>
                </p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Unlock a smarter way <br />
              <span className="text-indigo-600">
                to take care of your home.
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
              MNA-ServiceHub connects you with top-rated home services in
              Bangladesh. From cleaning to AC repair, book your first service
              today and save big!
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={handleClaimOffer}
                className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-slate-900 text-white font-black text-lg transition-all group shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <Zap className="size-5" /> Claim Cashback Now
              </Button>
              <Link
                href="/services"
                className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5 group"
              >
                Browse services{" "}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersBanner;

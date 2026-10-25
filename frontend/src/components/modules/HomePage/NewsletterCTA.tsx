"use client";

import React from "react";
import { Mail, Send, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const NewsletterCTA = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    if (email) {
      toast.success(`Success! Check your inbox at ${email}`);
      e.currentTarget.reset();
    }
  };

  return (
    <section className="py-12 px-6 bg-white dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[1rem] border border-slate-800">
          <div className="absolute top-0 right-0 size-96 bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 size-80 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row items-center p-10 md:p-16 lg:p-20 gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold uppercase tracking-widest">
                <Zap className="size-3 fill-current" /> Weekly Insights
              </div>

              <h2 className="text-4xl md:text-5xl font-black  tracking-tight leading-[1.1]">
                Master your home <br />
                <span className="text-slate-500">with expert tips.</span>
              </h2>

              <p className="dark:text-slate-400 text-slate-600 text-lg md:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                Join our elite circle. Get exclusive service discounts and
                professional maintenance hacks every Tuesday.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-2">
                {["Verified Pros", "Safe & Secure"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 dark:text-slate-300 text-slate-500 text-sm font-semibold"
                  >
                    <CheckCircle2 className="size-4 text-indigo-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[42%]">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative dark:bg-slate-800/50 backdrop-blur-xl p-3 rounded-[1.8rem] border border-white/10 shadow-2xl">
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col gap-3"
                  >
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Mail className="size-5 text-slate-500" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        placeholder="yourname@email.com"
                        className="w-full h-16 pl-14 pr-5 rounded-2xl dark:bg-slate-900/50 border border-slate-700  placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-bold"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-3 group"
                    >
                      Subscribe to Updates
                      <Send className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </form>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-500 font-medium">
                By subscribing, you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="dark:text-slate-300 text-indigo-500 underline underline-offset-4 hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
                . No marketing fluff, just value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;

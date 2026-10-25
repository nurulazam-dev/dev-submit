"use client";

import Image from "next/image";
import { ArrowRight, Zap, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
          alt="MNA ServiceHub"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="size-3 fill-current" /> The Future of Services
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight animate-in fade-in slide-in-from-left-8 duration-1000">
            Connecting Talent <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-blue-500">
              With Opportunity.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-12 duration-1000 delay-200">
            MNA ServiceHub is Bangladesh&apos;s premier digital marketplace
            designed to bridge the gap between{" "}
            <span className="text-white font-semibold">
              world-class professionals
            </span>{" "}
            and everyday service needs.
          </p>

          <div className="flex flex-wrap gap-5 pt-4 animate-in fade-in slide-in-from-left-16 duration-1000 delay-300">
            <Link href="/services">
              <Button
                size="lg"
                className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg shadow-xl shadow-indigo-900/40 transition-all group"
              >
                Explore Services
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>

            <Link href="/job-posts">
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-bold text-lg transition-all"
              >
                Join as Provider
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-12 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="size-5" />
              </div>
              <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                Verified Pros
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <Star className="size-5 fill-current" />
              </div>
              <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                4.9/5 Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 -right-20 size-125 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}

"use client";

import Image from "next/image";
import { Smartphone, CheckCircle2, Star, Download, QrCode } from "lucide-react";
import Link from "next/link";

const MobileAppPromo = () => {
  return (
    <section className="py-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-150 bg-indigo-600/20 rounded-full blur-[120px] -mt-96 pointer-events-none" />
          <div className="absolute bottom-0 right-0 size-96 bg-blue-500/10 rounded-full blur-[100px] -mb-48 -mr-48 pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center gap-16 p-10 md:p-16 lg:p-24">
            <div className="w-full lg:w-1/2 relative flex justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 bg-linear-to-tr from-indigo-500/40 to-blue-500/0 rounded-full blur-2xl animate-pulse" />

              <div className="relative z-10">
                <Image
                  src="/mobile-app-pro.webp"
                  width={310}
                  height={310}
                  alt="mobile app"
                  className="rounded-xl"
                />

                <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce hover:pause">
                  <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                    <Star className="size-6 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      4.9/5 Rating
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Top Service App
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
                <Smartphone className="size-4" /> Seamless Mobile Experience
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Book services on{" "}
                <span className="text-indigo-600 italic font-medium">
                  the go.
                </span>
              </h2>

              <p className="dark:text-slate-400 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                Get the MNA-ServiceHub app for exclusive features like real-time
                tracking, instant chat with pros, and 1-tap rebooking.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Live Provider Tracking",
                  "Instant Support Chat",
                  "Secure App Payments",
                  "Exclusive App Deals",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 dark:text-slate-300 text-slate-500 font-bold text-sm"
                  >
                    <CheckCircle2 className="size-5 text-indigo-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <Link
                    href="/"
                    className="p-4 rounded-xl border border-slate-300 shadow bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex gap-3 items-start justify-start w-full sm:w-52 group transition-all"
                  >
                    <Download className="size-8 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-indigo-500 leading-none">
                        Get it on
                      </p>
                      <p className="text-xl font-black leading-tight">
                        Google Play
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/"
                    className="p-4 rounded-xl border border-slate-300 shadow bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex gap-3 items-start justify-start w-full sm:w-52 group transition-all"
                  >
                    <Smartphone className="size-8 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-indigo-500 leading-none">
                        Download on the
                      </p>
                      <p className="text-xl font-black leading-tight">
                        App Store
                      </p>
                    </div>
                  </Link>
                </div>

                {/* QR Code Section */}
                <div className="hidden md:flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl">
                  <QrCode className="size-20 text-slate-900" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                    Scan to download
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromo;

"use client";

import { ShieldCheck, Star, Users, Award, CheckCircle } from "lucide-react";

const TrustSignals = () => {
  const partners = [
    "TechGlobal",
    "UrbanFix",
    "SafeHome",
    "EcoClean",
    "ProBuild",
    "SmartLiving",
    "CityHelp",
  ];

  return (
    <section className="py-12  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          {[
            {
              icon: <Users className="text-indigo-600" />,
              label: "10k+ Happy Users",
              desc: "Trusted nationwide",
            },
            {
              icon: <ShieldCheck className="text-emerald-600" />,
              label: "Verified Pros",
              desc: "Background checked",
            },
            {
              icon: <Star className="text-amber-500 fill-amber-500" />,
              label: "4.9/5 Rating",
              desc: "Top-rated services",
            },
            {
              icon: <Award className="text-blue-600" />,
              label: "ISO Certified",
              desc: "Quality guaranteed",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center md:text-left space-y-2"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 transition-transform hover:scale-105 duration-300">
                {item.icon}
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">
                  {item.label}
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider italic">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100 dark:border-slate-900" />
          </div>
          <div className="relative bg-white dark:bg-slate-950 px-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Recognized & Partnered With
            </span>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden space-x-12 select-none">
            <div className="flex space-x-12 animate-scroll group-hover:pause-scroll py-4">
              {partners.map((partner, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-slate-400 dark:text-slate-600 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                >
                  <CheckCircle className="size-4" />
                  <span className="text-xl md:text-2xl font-black tracking-tighter whitespace-nowrap uppercase">
                    {partner}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="flex space-x-12 animate-scroll group-hover:pause-scroll py-4"
              aria-hidden="true"
            >
              {partners.map((partner, i) => (
                <div
                  key={`dup-${i}`}
                  className="flex items-center gap-2 text-slate-400 dark:text-slate-600 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                >
                  <CheckCircle className="size-4" />
                  <span className="text-xl md:text-2xl font-black tracking-tighter whitespace-nowrap uppercase">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .pause-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustSignals;

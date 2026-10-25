"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  UserPlus,
  ClipboardCheck,
  Wrench,
  CreditCard,
  Star,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  actor: "Customer" | "Manager" | "Provider";
  link: string;
}

const steps: Step[] = [
  {
    title: "Find & Select",
    description:
      "Browse services and click for details. Check expertise and availability.",
    icon: <Search className="size-6" />,
    actor: "Customer",
    link: "/services",
  },
  {
    title: "Register & Request",
    description:
      "Log in as a customer to access your private dashboard and create a request.",
    icon: <UserPlus className="size-6" />,
    actor: "Customer",
    link: "/register",
  },
  {
    title: "Expert Matching",
    description:
      "Manager assigns an expert provider and notifies you via email.",
    icon: <ClipboardCheck className="size-6" />,
    actor: "Manager",
    link: "/dashboard",
  },
  {
    title: "Service Delivery",
    description:
      "Provider completes the job and updates costs (Service + Product).",
    icon: <Wrench className="size-6" />,
    actor: "Provider",
    link: "/track-request",
  },
  {
    title: "Safe Payment",
    description: "Pay securely once status is 'Completed' through our portal.",
    icon: <CreditCard className="size-6" />,
    actor: "Customer",
    link: "/payments",
  },
  {
    title: "Review & Rate",
    description:
      "Rate your experience. One detailed review per service request.",
    icon: <Star className="size-6" />,
    actor: "Customer",
    link: "/reviews",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="size-3" /> Step-by-Step Guide
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            The <span className="text-indigo-600">MNA Tree</span> Process
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            From your first click to the final review, our process is built on
            transparency and efficiency.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 transform md:-translate-x-1/2 z-0" />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="absolute left-4 md:left-1/2 size-4 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-950 transform -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                    <div className="absolute inset-0 rounded-full bg-indigo-600 animate-ping opacity-25" />
                  </div>

                  <div className="hidden md:block w-1/2" />

                  <div
                    className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <div className="group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 shadow-sm hover:shadow-2xl relative">
                      <span className="absolute top-6 right-8 text-5xl font-black text-slate-100 dark:text-slate-800/50 group-hover:text-indigo-500/10 transition-colors pointer-events-none">
                        0{index + 1}
                      </span>

                      <div className="flex items-start gap-5 mb-6">
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                            {step.actor}
                          </div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium mb-8">
                        {step.description}
                      </p>

                      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                        <Link
                          href={step.link}
                          className="inline-flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider hover:gap-3 transition-all"
                        >
                          Explore This Step <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-32 relative group">
          <div className="absolute inset-0 bg-indigo-600 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative p-10 md:p-16 rounded-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
            <div className="absolute top-0 right-0 size-64  rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="text-center md:text-left space-y-3 relative z-10">
              <h4 className="text-3xl md:text-4xl font-black leading-none">
                Ready to grow your home <br /> with{" "}
                <span className="text-indigo-600">MNA-ServiceHub?</span>
              </h4>
              <p className="dark:text-slate-400 text-slate-500 font-medium text-lg">
                Join 10k+ users who trust our transparent process.
              </p>
            </div>
            <Button className="h-16 px-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl transition-all shadow-xl shadow-indigo-900/40 relative z-10">
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

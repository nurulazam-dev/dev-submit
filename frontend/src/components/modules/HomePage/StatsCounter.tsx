/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Wrench, Star, MapPin, CheckCircle } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Happy Customers",
    target: 12000,
    suffix: "+",
    icon: <Users className="size-6" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    label: "Service Providers",
    target: 2500,
    suffix: "+",
    icon: <Wrench className="size-6" />,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: 3,
    label: "Service Ratings",
    target: 4.9,
    suffix: "/5",
    icon: <Star className="size-6" />,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 4,
    label: "Active Cities",
    target: 45,
    suffix: "+",
    icon: <MapPin className="size-6" />,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const CounterItem = ({ item }: { item: any }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = item.target;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, item.target]);

  return (
    <div
      ref={countRef}
      className="relative group p-8 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <CheckCircle className="size-20" />
      </div>

      <div
        className={`inline-flex p-4 rounded-xl ${item.bgColor} ${item.color} mb-4`}
      >
        {item.icon}
      </div>

      <div className="space-y-1">
        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
          {item.target % 1 === 0
            ? Math.floor(count).toLocaleString()
            : count.toFixed(1)}
          <span className="text-indigo-600 dark:text-indigo-400">
            {item.suffix}
          </span>
        </h3>
        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
          {item.label}
        </p>
      </div>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-12 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-200 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Our Impact in <span className="text-indigo-600">Numbers</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto">
            We take pride in the trust our community places in us. Here is a
            look at what we have achieved together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <CounterItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;

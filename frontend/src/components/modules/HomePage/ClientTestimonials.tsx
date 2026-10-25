"use client";

import { Star, Quote, CheckCircle2, UserCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Ariful Islam",
    role: "Homeowner",
    comment:
      "MNA-ServiceHub is a lifesaver! I booked an AC repair service at 10 PM and the pro arrived early next morning. Highly professional and transparent pricing.",
    rating: 5,
    tag: "AC Repair",
  },
  {
    name: "Sarah Ahmed",
    role: "Working Professional",
    comment:
      "The cleaning service was impeccable. I love how I can see the background-verified status of the providers. It gives me great peace of mind.",
    rating: 5,
    tag: "Home Cleaning",
  },
  {
    name: "Tanvir Rahman",
    role: "Business Owner",
    comment:
      "Efficient and reliable. I've used their plumbing and electrical services multiple times. The app tracking feature is a game changer for busy people.",
    rating: 5,
    tag: "Plumbing",
  },
  {
    name: "Nusrat Jahan",
    role: "Interior Designer",
    comment:
      "As someone who values quality, I'm impressed by the skill level of the pros here. The customer support is also very responsive and helpful.",
    rating: 4,
    tag: "Electrical",
  },
];

const ClientTestimonials = () => {
  return (
    <section className="py-12 px-6 relative overflow-hidden bg-slate-50/30 dark:bg-transparent">
      <div className="absolute top-0 right-0 -mr-6 mt-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <Quote size={200} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest">
              <Star className="size-3 fill-current" /> Real Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              What our <span className="text-indigo-600">clients say</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-xl">
              Don&apos;t just take our word for it. Join thousands of satisfied
              users who trust MNA-ServiceHub for their daily needs.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden"
                >
                  <UserCircle2 className="size-8 text-slate-400" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                4.9/5 Average Rating
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Based on 12k+ reviews
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <div className="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md uppercase tracking-tighter">
                  {item.tag}
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed mb-8 relative z-10">
                &quot;{item.comment}&quot;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  <UserCircle2 className="size-8" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1">
                    {item.name}
                    <CheckCircle2 className="size-3 text-emerald-500" />
                  </h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;

"use client";

import { useUser } from "@/hooks/useUser";
import { Calendar, Mail, ShieldCheck, UserCircle } from "lucide-react";
import { format } from "date-fns";

export default function DashboardBanner() {
  const { data: user } = useUser();
  const userInfo = user || user?.user;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 mb-8 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-indigo-500/10 group">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />

      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <UserCircle size={48} strokeWidth={1.5} />
            </div>
            <div
              className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white dark:border-slate-900 w-6 h-6 rounded-full"
              title="Active Account"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest">
              <span>{greeting}</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase">
              {userInfo?.name || "User Name"}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <Mail size={14} className="text-slate-400" />
                {userInfo?.email}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-tighter border border-slate-200 dark:border-slate-700">
                <ShieldCheck size={12} className="text-indigo-500" />
                {userInfo?.role || "Guest"}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 self-stretch justify-center border-l-0 md:border-l border-slate-200 dark:border-slate-800 pl-0 md:pl-8">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-md border border-slate-100 dark:border-slate-700">
            <Calendar size={18} className="text-indigo-500" />
            <div className="text-xs">
              <p className="font-bold text-[10px] uppercase text-slate-400 leading-none mb-1">
                Member Since
              </p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                {userInfo?.createdAt
                  ? format(new Date(userInfo.createdAt), "MMMM dd, yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-3 rounded-lg max-w-xs transition-all hover:scale-[1.02]">
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium leading-tight">
              <span className="font-bold">Pro Tip:</span> Keep your profile
              information updated to receive better service recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

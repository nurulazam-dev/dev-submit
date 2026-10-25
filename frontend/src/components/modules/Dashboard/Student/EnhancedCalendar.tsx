"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock, Info } from "lucide-react";
import { format } from "date-fns";

export default function EnhancedCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="md:col-span-6 lg:col-span-5 p-5 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <CalendarDays className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold leading-none">Schedule Overview</h3>
          <p className="text-xs text-slate-500 mt-1">
            Manage your service timeline
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full rounded-lg border bg-slate-800/50 p-5"
            captionLayout="dropdown"
          />
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {date ? format(date, "PPPP") : "No date selected"}
              </p>
              <p className="text-xs text-slate-500">
                You can track your requested service dates and upcoming visits
                here.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            <Info className="w-3 h-3" />
            System Status: Synced
          </div>
        </div>
      </div>
    </div>
  );
}

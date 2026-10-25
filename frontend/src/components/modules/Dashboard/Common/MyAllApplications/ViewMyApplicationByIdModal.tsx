"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IJobApplicationPayload } from "@/types/jobApplication.type";
import { format } from "date-fns";
import {
  Clock,
  MapPin,
  FileText,
  ExternalLink,
  Briefcase,
  Calendar,
  Banknote,
  Info,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface ViewMyApplicationByIdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: IJobApplicationPayload | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const dateValue = new Date(value);
  return isNaN(dateValue.getTime()) ? "N/A" : format(dateValue, "MMM dd, yyyy");
};

export default function ViewMyApplicationByIdModal({
  open,
  onOpenChange,
  application: details,
}: ViewMyApplicationByIdDialogProps) {
  if (!details) return null;

  const status = details.status;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] lg:max-w-5xl p-0 overflow-hidden border-none shadow-2xl rounded-lg">
        <DialogHeader className="px-8 py-8 bg-slate-50 dark:bg-slate-900 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-black">
                Application Review
              </DialogTitle>
              <DialogDescription className="font-medium flex items-center gap-2 mt-1">
                Reference ID:
                <span className="text-indigo-600 font-mono bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                  {details.id.slice(0, 8)}
                </span>
              </DialogDescription>
            </div>
            <Badge
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                status === "ACCEPTED"
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  : status === "PENDING"
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    : "bg-rose-100 text-rose-700 hover:bg-rose-100"
              }`}
            >
              {status}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)] bg-white dark:bg-slate-950">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                      <Briefcase size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Job Overview
                    </h3>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xl font-bold text-indigo-600 mb-3">
                      {details.jobPost?.title || "Position Title"}
                    </h4>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <MapPin size={14} className="text-indigo-500" />{" "}
                        {details.jobPost?.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <Banknote size={14} className="text-indigo-500" />{" "}
                        {details.jobPost?.salaryRange}
                      </span>
                    </div>
                    <Separator className="my-4 opacity-50" />
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {details.jobPost?.description}
                    </p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-200 dark:shadow-none">
                      <MessageCircle size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Feedback & Updates
                    </h3>
                  </div>
                  <div className="p-6 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-transparent">
                    {details.feedback ? (
                      <p className="text-sm italic text-slate-700 dark:text-slate-300">
                        &quot;{details.feedback}&quot;
                      </p>
                    ) : (
                      <div className="flex items-center gap-3 text-slate-400">
                        <Info size={18} />
                        <p className="text-sm font-medium">
                          No feedback from the recruiter yet.
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl">
                  <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-indigo-400">
                    Application Timeline
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Calendar size={18} className="text-indigo-300" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
                          Applied On
                        </p>
                        <p className="text-sm font-bold">
                          {formatDateTime(details.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Clock size={18} className="text-rose-300" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
                          Job Deadline
                        </p>
                        <p className="text-sm font-bold text-rose-200">
                          {formatDateTime(details.jobPost?.deadline)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-[2rem] p-6 text-center">
                  <div className="size-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FileText size={32} className="text-indigo-600" />
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    Your Curriculum Vitae
                  </h5>
                  <p className="text-xs text-slate-500 mb-6 font-medium">
                    Last updated version attached
                  </p>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl h-12 shadow-lg shadow-indigo-200 dark:shadow-none group">
                    <Link
                      href={details.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center"
                    >
                      View Document{" "}
                      <ExternalLink
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 flex gap-3">
                  <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-800 dark:text-amber-400 font-medium leading-tight">
                    This application is under legal review. Once accepted, you
                    will be contacted via your registered email for the next
                    steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getMyAllServiceRequestByCustomerService } from "@/services/serviceRequest.services";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Calendar, CircleDollarSign, Tag } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function CustomerServiceRequestActivity() {
  const queryString = "";

  const { data: mySRsCustomerDataResponse, isLoading } = useQuery({
    queryKey: ["my-service-requests-customer", queryString],
    queryFn: () => getMyAllServiceRequestByCustomerService(queryString),
  });

  const myServiceRequests = Array.isArray(mySRsCustomerDataResponse?.data)
    ? mySRsCustomerDataResponse.data.slice(0, 7)
    : [];

  return (
    <div className="md:col-span-6 lg:col-span-7 p-6 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-black">Service Request Activity</h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          Showing latest 7
        </span>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-sm">Loading activity...</p>
          </div>
        ) : myServiceRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="pb-4 font-semibold">Service</th>
                  <th className="pb-4 font-semibold">Date</th>
                  <th className="pb-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {myServiceRequests.map((request: any) => (
                  <tr
                    key={request.id}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 rounded-lg">
                          <Tag className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800 dark:text-slate-100">
                            {request.service?.name || "Unknown Service"}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <CircleDollarSign className="w-3 h-3" />
                            {request.costBreakdown?.totalCost || 0} BDT
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {request.createdAt
                          ? format(new Date(request.createdAt), "dd MMM, yyyy")
                          : "N/A"}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <Badge
                        variant="secondary"
                        className={`capitalize font-medium ${getStatusColor(request.status)}`}
                      >
                        {request.status.toLowerCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-2xl border-slate-100 dark:border-slate-800">
            <p className="text-slate-400 text-sm italic">
              No service requests found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    case "ONGOING":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "COMPLETED":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "CANCELLED":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

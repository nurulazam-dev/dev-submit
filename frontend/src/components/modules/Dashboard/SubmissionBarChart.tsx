"use client";

import { IMonthlyStats } from "@/types/dashboard.types";
import { format, parseISO, isValid } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SubmissionBarChartProps {
  data: IMonthlyStats[];
}

const SubmissionBarChart = ({ data }: SubmissionBarChartProps) => {
  const formattedData = (data || [])
    .map((item) => {
      const date =
        typeof item.month === "string" ? parseISO(item.month) : item.month;

      return {
        month: isValid(date) ? format(date, "MMM yyyy") : "Unknown",
        submissions: Number(item.count) || 0,
      };
    })
    .filter((item) => item.month !== "Unknown");

  const hasData =
    formattedData.length > 0 && formattedData.some((d) => d.submissions > 0);

  if (!hasData) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Project Submission Trends
          </CardTitle>
          <CardDescription>Monthly Code Project Submissions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-87.5 space-y-2">
          <div className="bg-muted/20 p-4 rounded-full">
            <div className="size-12 border-4 border-dashed border-muted-foreground/30 rounded-full animate-pulse" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            No active project submission data to display.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4 shadow-md border-muted/40">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">
          Project Submission Trends
        </CardTitle>
        <CardDescription>
          Monthly student code submissions over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-87.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-muted/50"
              />
              <XAxis
                dataKey="month"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="fill-muted-foreground font-medium"
                dy={10}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                className="fill-muted-foreground font-medium"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2.5 shadow-md border-border/50 text-xs">
                        <span className="font-semibold text-foreground">
                          {payload[0].payload.month}
                        </span>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="size-2 rounded-full bg-primary" />
                          <span className="text-muted-foreground">
                            Submissions:{" "}
                            <span className="font-bold text-foreground">
                              {payload[0].value}
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="submissions"
                radius={[6, 6, 0, 0]}
                className="fill-primary"
              >
                {formattedData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    className="hover:opacity-80 transition-opacity fill-primary"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionBarChart;

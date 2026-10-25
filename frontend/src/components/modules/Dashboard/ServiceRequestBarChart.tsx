"use client";

import { BarChartData } from "@/types/dashboard.types";
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

interface ServiceRequestBarChartProps {
  data: BarChartData[];
}

const ServiceRequestBarChart = ({ data }: ServiceRequestBarChartProps) => {
  const formattedData = (data || [])
    .map((item) => {
      const date =
        typeof item.month === "string" ? parseISO(item.month) : item.month;

      return {
        month: isValid(date) ? format(date, "MMM yyyy") : "Unknown",
        services: Number(item.count) || 0,
      };
    })
    .filter((item) => item.month !== "Unknown");

  const hasData =
    formattedData.length > 0 && formattedData.some((d) => d.services > 0);

  if (!hasData) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Service Request Trends
          </CardTitle>
          <CardDescription>Monthly Service Request Statistics</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-87.5 space-y-2">
          <div className="bg-muted/20 p-4 rounded-full">
            <div className="size-12 border-4 border-dashed border-muted-foreground/30 rounded-full animate-pulse" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            No active Service Request data to display.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4 shadow-md border-muted/40">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">
          Service Request Trends
        </CardTitle>
        <CardDescription>
          Visualize your monthly service request growth
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
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="services"
                name="Total Requests"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              >
                {formattedData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="hsl(var(--primary))"
                    fillOpacity={0.9}
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

export default ServiceRequestBarChart;

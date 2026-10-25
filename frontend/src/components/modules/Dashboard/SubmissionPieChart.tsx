"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IStatusDistribution } from "@/types/dashboard.types";

interface SubmissionPieChartProps {
  data: IStatusDistribution[];
  title?: string;
  description?: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "oklch(0.769 0.188 70.08)", // Amber
  APPROVED: "oklch(0.6 0.118 184.704)", // Green / Teal
  REJECTED: "oklch(0.646 0.222 41.116)", // Rose / Red
};

const CHART_COLORS = [
  "oklch(0.769 0.188 70.08)",
  "oklch(0.6 0.118 184.704)",
  "oklch(0.646 0.222 41.116)",
  "oklch(0.398 0.07 227.392)",
];

const SubmissionPieChart = ({
  data,
  title = "Submission Status",
  description = "Project submissions breakdown",
}: SubmissionPieChartProps) => {
  if (!data || !Array.isArray(data)) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-75">
          <p className="text-sm text-muted-foreground">
            Invalid data provided for the chart.
          </p>
        </CardContent>
      </Card>
    );
  }

  const formattedData = data.map((item) => ({
    status: item.status,
    name: item.status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: Number(item.count),
  }));

  if (
    !formattedData.length ||
    formattedData.every((item) => item.value === 0)
  ) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-center h-75">
          <p className="text-sm text-muted-foreground">
            No submissions data available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey={"value"}
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    STATUS_COLORS[entry.status] ||
                    CHART_COLORS[index % CHART_COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2.5 shadow-md border-border/50 text-xs">
                      <span className="font-semibold text-foreground">
                        {payload[0].name}
                      </span>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-muted-foreground">
                          Count:{" "}
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
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SubmissionPieChart;

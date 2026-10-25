import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  iconName: keyof typeof LucideIcons;
  description?: string;
  className?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard = ({
  title,
  value,
  iconName,
  description,
  className,
  trend,
}: StatsCardProps) => {
  const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon;

  return (
    <Card
      className={cn(
        "relative overflow-hidden shadow-sm bg-card hover:shadow-md transition-all duration-300 group",
        "border-l-4 border-l-primary",
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
            {Icon && <Icon className="size-5" />}
          </div>
          <div className="text-5xl font-black tracking-tight">{value}</div>
        </div>
        <div className="flex items-center mt-1 space-x-2">
          {trend && (
            <span
              className={cn(
                "text-xs font-bold px-1.5 py-0.5 rounded-md",
                trend.isPositive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700",
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}
            </span>
          )}
          {description && (
            <p className="text-xs text-muted-foreground font-medium truncate">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type CustomSubmitButtonProps = {
  isPending: boolean;
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
};

const CustomSubmitButton = ({
  isPending,
  children,
  pendingLabel = "Submitting...",
  className,
  disabled = false,
}: CustomSubmitButtonProps) => {
  const isDisabled = disabled || isPending;

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={cn("w-full", className)}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          {pendingLabel ? pendingLabel : children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomSubmitButton;

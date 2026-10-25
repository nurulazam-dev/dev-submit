"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Captured:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-destructive/20 opacity-75"></div>
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle size={48} />
        </div>
      </div>

      <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Oops! Something went wrong
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        An unexpected error occurred while processing your request. Don&apos;t
        worry, our team has been notified.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={() => reset()}
          className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <RefreshCw size={18} />
          Try Again
        </Button>
        <Button
          variant="outline"
          size="lg"
          render={<Link href="/" />}
          className="flex items-center gap-2"
        >
          <Home size={18} />
          Go to Home
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-12 w-full max-w-2xl overflow-hidden rounded-lg border border-destructive/20 bg-destructive/5 text-left">
          <div className="bg-destructive/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-destructive">
            Developer Debug Info
          </div>
          <pre className="overflow-x-auto p-4 text-xs text-destructive/80">
            {error.message || "Unknown error"}
            {error.digest && `\nDigest: ${error.digest}`}
          </pre>
        </div>
      )}
    </div>
  );
}

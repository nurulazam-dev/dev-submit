"use client";

// import { useEffect, useState, useTransition } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function GlobalLoader() {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const [isPending, startTransition] = useTransition();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   startTransition(() => {
  //     setIsLoading(false);
  //   });

  //   return () => setIsLoading(true);
  // }, [pathname, searchParams]);

  // if (!isLoading && !isPending) return null;

  return (
    <>
      <div className="fixed top-0 left-0 z-9999 h-1 w-full overflow-hidden bg-muted">
        <div className="h-full w-full origin-left animate-[loading_2s_easeInOut_infinite] bg-primary" />
      </div>

      <div className="fixed inset-0 z-9998 flex items-center justify-center bg-background/30 backdrop-blur-[2px] transition-all duration-300">
        <div className="flex flex-col items-center gap-3 rounded-xl border bg-background p-6 shadow-2xl">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm font-medium animate-pulse text-muted-foreground">
            Loading...
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(-10%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}

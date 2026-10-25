import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

const space_Grotesk_init = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-Space_Grotesk",
});

export const metadata: Metadata = {
  title: "Dev Submit",
  description: "Dev Submit....",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`font-Space_Grotesk ${space_Grotesk_init.variable} antialiased bg-white dark:bg-slate-950`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster position="top-center" richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

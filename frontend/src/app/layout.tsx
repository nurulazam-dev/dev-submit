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
  title: "MNA ServiceHub",
  description:
    "MNA ServiceHub acts as a centralized digital platform that enables all local service-related activities to be managed efficiently from a single place.",
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
            <AIChatBotAssistant />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

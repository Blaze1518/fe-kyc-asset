import type { Metadata } from "next";
import { Geist, Geist_Mono, Sacramento } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "./provider";
import { PageOrchestrator } from "@/shared/ui/page-orchestrator";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SCheck",
  description: "SCheck - Hệ thống quản lý điểm danh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sacramento.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
          <AppProvider>
            {/* <PageOrchestrator> */}
            <div className="block-preview-wrapper min-h-screen not-dark:bg-neutral-50/50">
              {children}
            </div>
            {/* </PageOrchestrator> */}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

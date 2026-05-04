"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "sonner";
// import { pingIp } from "@/services/security/ip-ping";
import { usePathname } from "next/navigation";
import { queryClient } from "@/shared/query/query-client";
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname === "/blocked-ip") return;
  //   pingIp().catch(() => {});
  // }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      {children}
    </QueryClientProvider>
  );
}

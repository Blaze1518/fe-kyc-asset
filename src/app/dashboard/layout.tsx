"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { useGetAuthUser } from "@/modules/sign-in/presentation/hooks/use-sign-in";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: meData, isLoading, isError } = useGetAuthUser();

  useEffect(() => {
    if (!isLoading && (isError || !meData?.data)) {
      router.replace("/sign-in");
    }
  }, [isLoading, isError, meData, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Image
          src="/logo/logo-full.png"
          alt="SCheck"
          width={200}
          height={200}
          className="object-contain max-h-[200px]"
          priority
        />
      </div>
    );
  }

  if (isError || !meData?.data) {
    return null;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
      className="sidebar-none-mode min-h-screen h-full"
    >
      <>
        <div className="flex bg-background">
          <AppSidebar variant="floating" collapsible="icon" side="left" />
        </div>
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </>
    </SidebarProvider>
  );
}

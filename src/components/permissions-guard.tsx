"use client";

import { useAuth } from "@/hooks/use-auth";
import * as React from "react";

interface PermissionGuardProps {
  permissions: string | string[];
  mode?: "all" | "any";
  children: React.ReactNode;
}

export const PermissionGuard = ({
  permissions,
  mode = "all",
  children,
}: PermissionGuardProps) => {
  const { hasPermission, canAny, isLoading, isAuthenticated } = useAuth();

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const isAllowed =
    mode === "all" ? hasPermission(permissions) : canAny(permissions);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
};

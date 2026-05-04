import type { Role } from "@/types/auth";
import { useGetAuthUser } from "@/modules/sign-in/presentation/hooks/use-sign-in";

export const useAuth = () => {
  const { data: response, isLoading, isError } = useGetAuthUser();
  const user = response?.data ?? null;
  const isAuthenticated = !!user && !isError;

  const hasRole = (role: Role | Role[]) => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.some((r) => user.roles.some((ur) => ur.id === r.id));
  };

  const hasPermission = (perm: string | string[]) => {
    if (!user) return false;
    const perms = Array.isArray(perm) ? perm : [perm];
    return perms.every((p) => user.permissions.includes(p));
  };

  const canAny = (perm: string | string[]) => {
    if (!user) return false;
    const perms = Array.isArray(perm) ? perm : [perm];
    return perms.some((p) => user.permissions.includes(p));
  };

  return {
    user,
    isLoading,
    isError,
    isAuthenticated,
    hasRole,
    hasPermission,
    canAny,
  };
};

"use client";

import * as React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Shield,
  Smartphone,
  Book,
  UserPlus,
  UserCog,
  Users,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { Badge } from "@/shared/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import type { AuthUser } from "@/modules/sign-in/domain/sign-in.entity";
import { PERMISSIONS } from "@/types/auth";
import type { LucideIcon } from "lucide-react";

type NavItemConfig = {
  title: string;
  url: string;
  icon?: LucideIcon;
  requiredPermissions?: string[];
  items?: NavItemConfig[];
};

type NavGroupConfig = {
  label: string;
  items: NavItemConfig[];
};

const NAV_GROUPS: NavGroupConfig[] = [
  {
    label: "Tổng quan",
    items: [
      {
        title: "Tổng quan",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Ứng dụng",
    items: [
      {
        title: "Danh sách điểm danh",
        url: "/dashboard/attendance-records",
        icon: CheckSquare,
        requiredPermissions: [PERMISSIONS.RECORDS.actions.READ_LIST],
      },
    ],
  },
  {
    label: "Quản lý",
    items: [
      {
        title: "Quản lý IP",
        url: "/dashboard/ip-management",
        icon: Shield,
        requiredPermissions: [PERMISSIONS.WHITELIST_IP.actions.READ],
      },
      {
        title: "Quản lý thiết bị",
        url: "/dashboard/devices",
        icon: Smartphone,
        requiredPermissions: [PERMISSIONS.DEVICES.actions.READ_LIST],
        items: [
          {
            title: "Danh sách thiết bị",
            url: "/dashboard/devices",
            icon: Smartphone,
            requiredPermissions: [PERMISSIONS.DEVICES.actions.READ_LIST],
          },
          {
            title: "Cập nhật thiết bị",
            url: "/dashboard/devices/update",
            icon: LayoutDashboard,
            requiredPermissions: [PERMISSIONS.DEVICES.actions.UPDATE],
          },
        ],
      },
      {
        title: "Quản lý người dùng",
        url: "/dashboard/users",
        icon: Users,
        requiredPermissions: [PERMISSIONS.USERS.actions.READ_LIST],
        items: [
          {
            title: "Danh sách người dùng",
            url: "/dashboard/users",
            icon: Users,
            requiredPermissions: [PERMISSIONS.USERS.actions.READ_LIST],
          },
          {
            title: "Quản lý vai trò",
            url: "/dashboard/roles",
            icon: UserPlus,
            requiredPermissions: [PERMISSIONS.ROLES.actions.READ],
          },
          {
            title: "Quản lý quyền",
            url: "/dashboard/permissions",
            icon: UserCog,
            requiredPermissions: [PERMISSIONS.PERMISSIONS.actions.READ],
          },
        ],
      },
    ],
  },
  {
    label: "Tài liệu",
    items: [
      {
        title: "Tài liệu sử dụng",
        url: "https://attcloud.gitbook.io/att-attendance",
        icon: Book,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0";
  const { state } = useSidebar();
  const { user, hasPermission } = useAuth();
  const isCollapsed = state === "collapsed";

  const filterNavItems = (items: NavItemConfig[]): NavItemConfig[] => {
    return items
      .filter((item) => {
        if (!item.requiredPermissions) return true;
        return hasPermission(item.requiredPermissions);
      })
      .map((item) => ({
        ...item,
        items: item.items ? filterNavItems(item.items) : undefined,
      }));
  };

  const filteredGroups = React.useMemo(() => {
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: filterNavItems(group.items),
    })).filter((group) => group.items.length > 0);
  }, [user]);

  const displayUser = {
    name: user?.username ?? "Admin",
    email: user?.roles?.[0]?.name ?? "Người dùng",
    avatar: "",
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="xl" variant="default" asChild>
              <Link href="/">
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="flex items-center gap-2">
                    {isCollapsed ? (
                      <Logo size={28} />
                    ) : (
                      <Image
                        src="/logo/logo-full.png"
                        alt="SCheck"
                        width={256}
                        height={123}
                        className="h-8 w-auto"
                        priority
                      />
                    )}
                  </div>
                  {!isCollapsed && (
                    <Badge
                      variant="outline"
                      className="px-2 py-0.5 text-[11px]"
                    >
                      v{appVersion}
                    </Badge>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {filteredGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

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
import { useAbility } from "@/casl/hooks";

type NavItemConfig = {
  title: string;
  url: string;
  icon?: LucideIcon;
  can?: {
    action: string;
    subject: string;
  };
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
        title: "Biểu đồ",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Quản lý hệ thống",
    items: [
      {
        title: "Phòng ban",
        url: "/dashboard/departments",
        icon: Shield,
        can: { action: "read", subject: "Department" },
        items: [
          {
            title: "Danh sách phòng ban",
            url: "/dashboard/departments",
            can: { action: "read", subject: "Department" },
          },
          {
            title: "Tạo phòng ban",
            url: "/dashboard/departments/create",
            can: { action: "create", subject: "Department" },
          },
        ],
      },

      {
        title: "Cổng (Port)",
        url: "/dashboard/ports",
        icon: Smartphone,
        can: { action: "read", subject: "Port" },
        items: [
          {
            title: "Danh sách port",
            url: "/dashboard/ports",
            can: { action: "read", subject: "Port" },
          },
          {
            title: "Tạo port",
            url: "/dashboard/ports/create",
            can: { action: "create", subject: "Port" },
          },
        ],
      },

      {
        title: "File",
        url: "/dashboard/files",
        icon: Book,
        can: { action: "read", subject: "File" },
      },

      {
        title: "Whitelist IP",
        url: "/dashboard/ip",
        icon: Shield,
        can: { action: "read", subject: "IPWhitelist" },
      },
    ],
  },

  {
    label: "Người dùng",
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
        can: { action: "read", subject: "User" },
      },
      {
        title: "Roles",
        url: "/dashboard/roles",
        icon: UserPlus,
        can: { action: "read", subject: "Role" },
      },
      {
        title: "Permissions",
        url: "/dashboard/permissions",
        icon: UserCog,
        can: { action: "read", subject: "Permission" },
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0";
  const { state } = useSidebar();
  const ability = useAbility();
  const isCollapsed = state === "collapsed";

  const filterNavItems = (items: NavItemConfig[]): NavItemConfig[] => {
    return items
      .filter((item) => {
        if (!item.can) return true;
        return ability.can(item.can.action as any, item.can.subject as any);
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
    })).filter((g) => g.items.length > 0);
  }, [ability]);

  // const displayUser = {
  //   name: user?.username ?? "Admin",
  //   email: user?.roles?.[0]?.name ?? "Người dùng",
  //   avatar: "",
  // };

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
                      <p className="font-sacramento text-[10px] font-bold">
                        KYC
                      </p>
                    ) : (
                      <p className="mt-4 font-sacramento text-2xl font-medium">
                        KYC Assets
                      </p>
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
      <SidebarFooter>{/* <NavUser user={displayUser} /> */}</SidebarFooter>
    </Sidebar>
  );
}

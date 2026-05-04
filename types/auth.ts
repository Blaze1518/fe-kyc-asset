export type Role = {
  id: string;
  name: string;
};

export const PERMISSIONS = {
  auth: {
    refresh: "auth:refresh",
  },
  deviceCommands: {
    create: "device-commands:create",
    read: "device-commands:read",
  },
  devices: {
    readList: "devices.read.list",
    readDetail: "devices.read.detail",
    readStatusSummary: "devices.read.summary",

    create: "devices.create",
    update: "devices.update",
    delete: "devices.delete",
  },
  records: {
    readList: "records.read.list",
    create: "records.create",
    update: "records.update",
    delete: "records.delete",
  },
  users: {
    readList: "users.read.list",
    readDetail: "users.read.detail",
    create: "users.create",
    approve: "users.update.approve",
    update: "users.update",
    delete: "users.delete",
    updateRoles: "users.update.roles",
  },
  roles: {
    read: "roles:read",
    create: "roles:create",
    update: "roles:update",
    delete: "roles:delete",
  },
  permissions: {
    read: "permissions:read",
    create: "permissions:create",
    update: "permissions:update",
    delete: "permissions:delete",
  },
};

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  roles: Role[];
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

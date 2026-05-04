export type Role = {
  id: string;
  name: string;
};

export const PERMISSIONS = {
  WHITELIST_IP: {
    name: "whitelist-ip",
    title: "Quản lý whitelist IP",
    category: "IP",
    actions: {
      CREATE: "whitelist-ip.create",
      READ: "whitelist-ip.read",
      UPDATE: "whitelist-ip.update",
      DELETE: "whitelist-ip.delete",
    },
  },
  USERS: {
    name: "users",
    title: "Quản lý người dùng",
    category: "Tài khoản",
    actions: {
      CREATE: "users.create",
      UPDATE: "users.update",
      DELETE: "users.delete",
      READ_LIST: "users.read.list",
      READ_DETAIL: "users.read.detail",
      APPROVE: "users.update.approve",
      UPDATE_ROLES: "users.update.roles",
    },
  },
  DEVICES: {
    name: "devices",
    title: "Quản lý thiết bị",
    category: "Thiết bị",
    actions: {
      CREATE: "devices.create",
      UPDATE: "devices.update",
      DELETE: "devices.delete",
      READ_LIST: "devices.read.list",
      READ_DETAIL: "devices.read.detail",
      SUMMARY: "devices.read.summary",
    },
  },
  RECORDS: {
    name: "records",
    title: "Quản lý lịch sử điểm danh",
    category: "Điểm danh",
    actions: {
      CREATE: "records.create",
      UPDATE: "records.update",
      DELETE: "records.delete",
      READ_LIST: "records.read.list",
    },
  },
  ROLES: {
    name: "roles",
    title: "Quản lý vai trò",
    category: "Vai trò",
    actions: {
      READ: "roles.read",
      CREATE: "roles.create",
      UPDATE: "roles.update",
      DELETE: "roles.delete",
    },
  },
  PERMISSIONS: {
    name: "permissions",
    title: "Quản lý quyền",
    category: "Quyền",
    actions: {
      READ: "permissions.read",
      CREATE: "permissions.create",
      UPDATE: "permissions.update",
      DELETE: "permissions.delete",
    },
  },
  AUTH: {
    name: "auth",
    title: "Quản lý xác thực",
    category: "Xác thực",
    actions: {
      REFRESH: "auth.refresh",
    },
  },
  DEVICE_COMMANDS: {
    name: "device-commands",
    title: "Quản lý lệnh thiết bị",
    category: "Thiết bị",
    actions: {
      CREATE: "device-commands.create",
      READ: "device-commands.read",
    },
  },
};

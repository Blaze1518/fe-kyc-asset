"use client";

import { motion } from "framer-motion";
import { Ban } from "lucide-react";

export default function BlockedIp() {
  return (
    <div className="relative bg-background mx-auto flex min-h-dvh flex-col items-center justify-center gap-10 p-8 md:gap-14 md:p-16">
      {/* Image */}
      <motion.img
        src="/background.jpg"
        alt="Blocked access"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="aspect-video w-[420px] rounded-2xl object-cover shadow-lg
                   dark:brightness-[0.95] dark:invert"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="text-center flex flex-col items-center gap-4"
      >
        {/* Ban icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-16 w-16 rounded-full bg-red-500/15 blur-md animate-pulse" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/30">
            <Ban className="h-7 w-7 text-red-600 dark:text-red-500" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-semibold tracking-tight">
          IP của bạn chưa được cấp quyền truy cập
        </h1>

        <p className="text-muted-foreground text-base max-w-md">
          Vui lòng liên hệ quản trị viên để được whitelist IP và tiếp tục sử
          dụng hệ thống.
        </p>
      </motion.div>

      {/* Decorative background pulse */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-72 w-72 rounded-full bg-red-500/10 blur-3xl animate-pulse" />
      </motion.div>
    </div>
  );
}

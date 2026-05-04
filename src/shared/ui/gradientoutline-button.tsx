"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/shared/lib/utils";

interface GradientOutlineButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

function GradientOutlineButton({
  children,
  className,
  ...props
}: GradientOutlineButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative inline-flex rounded-full p-[2px]",
        "bg-[conic-gradient(from_var(--angle),transparent_0deg,#ffffffaa_40deg,#22d3ee_80deg,#a855f7_140deg,#ec4899_200deg,#ffffffaa_260deg,transparent_360deg)]",
        className
      )}
      initial={{ "--angle": "0deg" } as any}
      animate={{ "--angle": "360deg" } as any}
      transition={{
        "--angle": {
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      {...props}
    >
      {/* Content */}
      <span
        className="
          relative z-10
          rounded-full
          bg-background
          p-2
          text-sm font-medium
          text-foreground
        "
      >
        {children}
      </span>
    </motion.button>
  );
}

export { GradientOutlineButton };

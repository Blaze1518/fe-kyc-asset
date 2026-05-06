"use client";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { useTransitionStore } from "@/store/use-transition-store";

interface TransitionBoxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?:
    | "fade"
    | "slideRight"
    | "slideLeft"
    | "slideUp"
    | "slideDown"
    | "scale"
    | "custom";
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  // Lướt từ Trái sang Phải (Yêu cầu của bạn)
  slideRight: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  },
  // Lướt từ Phải sang Trái
  slideLeft: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  },
  // Lướt từ Trên xuống Dưới
  slideDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  },
  // Lướt từ Dưới lên Trên
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
};

export const TransitionBox = ({
  children,
  variant = "fade",
  ...props
}: TransitionBoxProps) => {
  const isExiting = useTransitionStore((s) => s.isExiting);
  const config = useTransitionStore((s) => s.config);

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key="active-content"
            {...(variant === "custom" ? props : variants[variant])}
            transition={{ duration: config.duration, ease: "easeInOut" }}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

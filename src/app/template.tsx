"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTransitionStore } from "@/store/use-transition-store";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isExiting, targetHref, config, completeExit } = useTransitionStore();

  useEffect(() => {
    if (isExiting && targetHref) {
      const timer = setTimeout(() => {
        router.push(targetHref);
        setTimeout(completeExit, 50);
      }, config.duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isExiting, targetHref, config, router, completeExit]);

  return <>{children}</>;
}

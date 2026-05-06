"use client";

import { useContext } from "react";
import { AbilityContext } from "./context";

export function useAbility() {
  const ability = useContext(AbilityContext);

  if (!ability) {
    throw new Error("AbilityContext not found");
  }

  return ability;
}

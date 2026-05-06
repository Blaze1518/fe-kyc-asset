"use client";

import { useMemo } from "react";
import { AbilityContext } from "./context";
import { createAbility } from "./ability";

export function AbilityProvider({
  children,
  rules,
}: {
  children: React.ReactNode;
  rules: any[];
}) {
  const ability = useMemo(() => createAbility(rules), [rules]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

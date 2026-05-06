import { createMongoAbility } from "@casl/ability";
import type { Actions, AppAbility, Subjects } from "./types";

export function createAbility(rules: any[] = []): AppAbility {
  return createMongoAbility<[Actions, Subjects]>(rules);
}

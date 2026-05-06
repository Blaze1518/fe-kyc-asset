import {
  MongoAbility,
  AbilityBuilder,
  createMongoAbility,
} from "@casl/ability";

export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type Subjects = string;

export type AppAbility = MongoAbility<[Actions, Subjects]>;

import { useAbility } from "@/casl/hooks";

export const useAuth = () => {
  const ability = useAbility();

  return {
    user: null,
    can: (action: string, subject: string) =>
      ability.can(action as any, subject as any),
  };
};

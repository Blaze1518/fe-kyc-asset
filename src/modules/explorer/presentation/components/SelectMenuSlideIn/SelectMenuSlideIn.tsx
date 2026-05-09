import { useId } from "react";
import { Role } from "@/modules/roles/domain/role.entity";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface SelectMenuProps {
  currentRoleId: string;
  allRoles: Role[];
  onValueChange: (newRoleId: string) => void;
  disabled?: boolean;
}

const SelectMenuSlideIn = ({
  currentRoleId,
  allRoles,
  onValueChange,
  disabled,
}: SelectMenuProps) => {
  const id = useId();

  return (
    <div className="max-w-fit space-y-2">
      <Select
        defaultValue={currentRoleId}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          className="h-8 w-[180px] border-dashed focus:ring-0"
        >
          <SelectValue placeholder="Chọn vai trò" />
        </SelectTrigger>
        <SelectContent className="duration-400 data-[state=open]:slide-in-from-bottom-2 data-[state=open]:zoom-in-100">
          <SelectGroup>
            {allRoles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMenuSlideIn;

import PermissionsPageComponent from "@/modules/permissions/presentation/components";

export default function PermissionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="@container/main px-4 lg:px-6 ">
        <PermissionsPageComponent />
      </div>
    </div>
  );
}

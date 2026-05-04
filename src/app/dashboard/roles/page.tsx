import RolesPageComponent from "@/modules/roles/presentation/components";

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="@container/main px-4 lg:px-6 ">
        <RolesPageComponent />
      </div>
    </div>
  );
}

import UsersPageComponent from "@/modules/users/presentation/components";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="@container/main px-4 lg:px-6 ">
        <UsersPageComponent />
      </div>
    </div>
  );
}

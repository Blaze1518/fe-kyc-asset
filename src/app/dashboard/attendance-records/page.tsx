import RecordsPageComponent from "@/modules/attendance-records/presentation/components";

export default function DevicesRecordsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="@container/main px-4 lg:px-6 ">
        <RecordsPageComponent />
      </div>
    </div>
  );
}

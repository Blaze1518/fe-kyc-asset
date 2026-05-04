import { SectionCards } from "@/modules/dashboard/presentation/components/section-cards";

export default function Page() {
  return (
    <>
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
          <p className="text-muted-foreground">
            Tổng quan về hệ thống điểm danh
          </p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <SectionCards />
        {/* <ChartAreaInteractive /> */}
      </div>
    </>
  );
}

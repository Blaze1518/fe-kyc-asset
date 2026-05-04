import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16">
      <img
        src="/background.jpg"
        alt="placeholder image"
        className="aspect-video w-240 rounded-xl object-cover dark:brightness-[0.95] dark:invert"
      />
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Không tìm thấy trang</h1>
        <p>Oops! Trang bạn đang tìm kiếm không tồn tại.</p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <Button className="cursor-pointer" asChild>
            <Link href="/">Quay về trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

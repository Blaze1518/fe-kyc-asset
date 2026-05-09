// proxy.ts
import { NextRequest, NextResponse } from "next/server";

// Use the named export 'proxy'
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Thêm một header tùy chỉnh để nhận diện Proxy đang chạy
  response.headers.set("x-proxy-active", "true");
  response.headers.set("x-processed-at", new Date().toISOString());

  return response;
}

// Config remains similar to previous versions
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

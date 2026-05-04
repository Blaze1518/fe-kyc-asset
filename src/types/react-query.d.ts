// src/types/react-query.d.ts
import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface MutationMeta {
    /**
     * Thông báo thành công.
     * - `string`: Hiện message cố định.
     * - `(data) => string`: Hiện message động dựa trên response.
     * - `undefined`: Không hiện toast (trừ khi server trả về message và logic fallback bật).
     */
    successMessage?: string | ((data: unknown) => string);

    /**
     * Cấu hình lỗi.
     * - `string`: Hiện message lỗi cố định này bất chấp server trả về gì.
     * - `false`: Tắt hoàn toàn toast lỗi (để UI tự handle).
     * - `undefined`: Tự động lấy message từ server.
     */
    errorMessage?: string | boolean;

    /** Bỏ qua logic check 401 mặc định (dành cho API login/refresh token) */
    ignoreAuth?: boolean;
  }
}

---
title: System Architecture - Phần mềm Điểm danh
version: 1.0.0
last_updated: Dec 2025
---

# System Architecture Documentation

Tài liệu mô tả kiến trúc kỹ thuật của hệ thống Phần mềm Điểm danh, bao gồm 3 thành phần chính: Desktop Client (Electron), Backend (NestJS), và Admin Portal (NextJS).

## 1. System Overview (Tổng quan)

Hệ thống được thiết kế theo mô hình **Client-Server** phân tán, tập trung vào tính ổn định cao và khả năng hoạt động Offline-First cho các máy chấm công tại địa điểm (On-premise Kiosks).

- **Desktop App (Electron):** Cài đặt trên các máy trạm, máy chấm công. Chịu trách nhiệm thu thập dữ liệu điểm danh, quản lý thiết bị, khóa máy (Kiosk Mode) và đồng bộ dữ liệu.
- **Backend Server (NestJS):** API trung tâm xử lý logic nghiệp vụ, xác thực và lưu trữ dữ liệu tập trung.
- **Admin Portal (NextJS):** Web Dashboard dành cho người quản lý để xem báo cáo, quản lý nhân sự và cấu hình thiết bị từ xa.

## 2. Desktop Client (Electron App)

Ứng dụng Windows chạy dưới dạng Kiosk Mode hoặc Background Service.

### 2.1 Technology Stack

| Category             | Technology           | Description                                                    |
| :------------------- | :------------------- | :------------------------------------------------------------- |
| **Core Framework**   | **Electron**         | Cross-platform desktop framework (Main + Renderer processes).  |
| **Language**         | **TypeScript**       | Strongly typed JavaScript.                                     |
| **Build Tool**       | **Electron Vite**    | Build tool hiệu năng cao cho cả Main và Renderer.              |
| **Frontend UI**      | **React**            | UI Library.                                                    |
| **Styling**          | **Tailwind CSS**     | Utility-first CSS framework.                                   |
| **UI Components**    | **Shadcn/UI**        | Reusable components based on Radix UI.                         |
| **State Management** | **React Hooks**      | `useReducer`, `useContext` cho local state.                    |
| **Validation**       | **Zod**              | Schema validation cho form input.                              |
| **Persistence**      | **Electron Store**   | Lưu cấu hình JSON đơn giản (Config persistence).               |
| **Local Storage**    | **CSV File**         | Lưu trữ Log điểm danh cục bộ (Backup & Evidence).              |
| **Native Module**    | **C# (.NET)**        | `KeyBlocker.exe` để can thiệp hệ thống sâu (Keyboard Hooking). |
| **Updater**          | **electron-updater** | Cơ chế tự động cập nhật OTA.                                   |

### 2.2 Core Architecture (Kiến trúc lõi)

Ứng dụng tuân theo mô hình **Modular Monolith** trong Main Process và **Component-based** trong Renderer.

#### A. Main Process (`src/main`)

Đóng vai trò điều phối (Orchestrator), quản lý vòng đời ứng dụng, giao tiếp hệ điều hành và bảo mật.

1. **Modules (`src/main/modules`)**

   - `security.ts`:
     - **KeyBlocker Integration**: Quản lý tiến trình con `KeyBlocker.exe` (C#) để chặn các phím tắt hệ thống nhạy cảm (Alt+F4, WinKey, Ctrl+Esc, v.v.).
     - **Startup Management**: Sử dụng `schtasks` (Windows Task Scheduler) để đăng ký App tự khởi động với quyền **HighestPrivileges (Admin)**, giúp bypass UAC prompt khi khởi động lại.
     - **Global Shortcuts**: Đăng ký phím tắt Electron (Alt+F4) như một lớp bảo vệ thứ cấp.
   - `appLifecycle.ts`: Quản lý trạng thái ứng dụng dựa trên sự kiện hệ thống (Screen Lock/Unlock). Tự động kích hoạt chế độ bảo vệ khi máy tính bị khóa.
   - `ipcHandlers.ts`: Centralized IPC handlers. Tiếp nhận yêu cầu từ Renderer (Save Check-in, Hide App, Quit App) và điều phối đến các Service tương ứng.

2. **Services (`src/main/services`)**
   - `SyncWorkerService`: Background Service chạy định kỳ (Interval ~30s). Quản lý việc đẩy dữ liệu từ hàng đợi lên Server. Đảm bảo tính năng **Offline-First**.
   - `SyncQueueService`: Quản lý hàng đợi (Queue) các bản ghi điểm danh chưa được đồng bộ. Dữ liệu được lưu trong Memory hoặc Disk để đảm bảo không mất mát khi mất mạng.
   - `LocalStoreService`: Chịu trách nhiệm ghi dữ liệu điểm danh ra file **CSV** (`chamcong-data.csv`) tại thư mục UserData. Đây là bản sao lưu vật lý quan trọng.
   - `DeviceInfoService`: Thu thập thông tin định danh máy (Machine ID, Hostname, IP Address) để gắn kèm vào mỗi bản ghi điểm danh.
   - `AutoUpdateService`: Quản lý quy trình kiểm tra, tải xuống và cài đặt bản cập nhật mới.

#### B. Renderer Process (`src/renderer`)

Giao diện người dùng (SPA) đơn giản, tối ưu cho thao tác nhanh.

- **Architecture**: React Functional Components + Hooks.
- **Forms**: Sử dụng `react-hook-form` kết hợp `zod` resolver để validate dữ liệu đầu vào (Tên nhân viên >= 3 ký tự).
- **IPC Bridge**: Giao tiếp với Main Process thông qua `window.api` (Context Isolation enabled), đảm bảo Renderer không thể truy cập trực tiếp Node.js API.

### 2.3 Key Data Flows (Luồng dữ liệu nghiệp vụ)

#### 1. Check-in Flow (Offline-First Strategy)

Chiến lược "Fire-and-Forget" giúp trải nghiệm người dùng mượt mà, không phụ thuộc tốc độ mạng.

1. **User Action**: Nhân viên nhập tên -> Nhấn "Điểm danh".
2. **Request**: Renderer gọi `ipcRenderer.invoke('save-checkin')`.
3. **Main Process Processing**:
   - **Step 1 (Context)**: Lấy thông tin máy (IP, MachineID) và tạo UUID cho giao dịch.
   - **Step 2 (Persistence)**: Ghi ngay lập tức vào file **CSV Local** (Đảm bảo dữ liệu đã an toàn trên đĩa cứng).
   - **Step 3 (Queueing)**: Tạo Job check-in và đẩy vào **Sync Queue**.
   - **Step 4 (Response)**: Trả về `success: true` cho Renderer **ngay lập tức**. Giao diện báo thành công cho người dùng.
4. **Async Synchronization**:
   - `SyncWorkerService` phát hiện có Job mới trong Queue.
   - Thực hiện gọi API (`POST /api/records`) lên Backend Server.
   - **Nếu thành công**: Xóa Job khỏi Queue.
   - **Nếu thất bại (Mất mạng/Server lỗi)**: Giữ Job trong Queue, chờ lần retry tiếp theo (30s sau).

#### 2. Security & Startup Flow

1. **App Launch**: App được khởi động (thường qua Task Scheduler khi user logon).
2. **Initialization**:
   - Kiểm tra môi trường (Dev/Prod).
   - Gọi `setupStartupTask()`: Đảm bảo Task Scheduler luôn được cấu hình đúng để chạy Admin cho lần sau.
   - Gọi `startKeyBlocker()`: Kích hoạt tiến trình C# để khóa bàn phím.
3. **Runtime**:
   - Ứng dụng chiếm toàn màn hình (Kiosk Mode).
   - Người dùng không thể thoát ra Desktop trừ khi có mật khẩu Admin hoặc quy trình thoát hợp lệ.

#### 3. Auto Update Flow

1. **Update Check**: App tự động kiểm tra version mới với Server update.
2. **Silent Download**: Tải bản cập nhật ngầm.
3. **Install & Restart**:
   - Sử dụng quyền Admin đã được cấp (do App chạy bằng Task Scheduler Admin) để thực hiện cài đặt đè file.
   - Tự động khởi động lại App sau khi update xong.

## 3. Backend (NestJS)

### 3.1 Technology Stack

- **NestJS + TypeScript** (modular DI, REST, versioning v1).
- **MongoDB + Mongoose** (async config via `MongooseConfigService`).
- **Winston** logging (`nest-winston`) với JSON log.
- **Swagger decorators** cho response wrapper (`ApiWrapped*Response`).
- **ConfigModule** global, nạp `.env` + `app.config.ts`, `database.config.ts`.

### 3.2 Architecture & Modules

- **AppModule**: khởi tạo ConfigModule (global), Winston logger, Mongoose connection; đăng ký `RequestIdMiddleware` cho toàn bộ route.
- **Feature Modules**: `UsersModule`, `RecordsModule`, `DevicesModule`, mỗi module gồm:
  - **Controller**: định nghĩa endpoint `/v1/<resource>`, áp dụng Swagger tag.
  - **Service**: chứa nghiệp vụ nhẹ, chuyển DTO ↔ Domain.
  - **Repository abstraction**: interface ở `infrastructure/persistence/*.repository.ts` đảm bảo DIP.
  - **Document persistence module**: binding repository -> Mongoose implementation, tách biệt domain khỏi ORM.
- **Domain layer**: lớp entity thuần (e.g., `Record`, `Device`, `User`).
- **DTO layer**: request/response DTO + pagination meta, dùng class-validator (qua Nest pipes).

### 3.3 Cross-cutting Concerns

- **RequestIdMiddleware**: gắn/xuất header `x-request-id` cho trace toàn tuyến.
- **HttpLoggingInterceptor**: log request/response với requestId, status, duration qua Winston.
- **ApiResponseInterceptor**: chuẩn hóa response shape `{ success, data, meta, error }`; tự động wrap pagination.
- **AllExceptionsFilter**: mapping `AppException`/`HttpException` sang mã lỗi chuẩn (định nghĩa tại `error-definitions.ts`), vẫn trả về requestId.

### 3.4 Persistence Pattern

- **Mongoose schemas** có index sẵn:
  - `RecordSchema`: index `name`, `client_timestamp`, `uuid`, `ips`.
  - `DeviceSchema`: index `machine_id`, `host_name`, `ip_addresses`, `app_version`, `queue_size`, `last_heartbeat`, timestamps.
- **Mapper**: chuyển đổi 2 chiều Domain ↔ Persistence (RecordMapper, DeviceMapper, UserMapper).
- **BaseDocumentRepository**: cung cấp CRUD, sort, pagination, count; helpers strip undefined để tránh ghi đè giá trị null/undefined.

### 3.5 Core Data Flows (API)

- **Record ingestion (`POST /v1/records`)**
  - Controller nhận `CreateRecordDto` (uuid, name, ips[], host_name, machine_id, client_timestamp).
  - Service gọi `RecordRepository.create` -> Mongoose; trả về DTO.
  - **Query (`GET /v1/records`)**: hỗ trợ pagination, filter theo `name`, `clientTimestampFrom/To`, sort default `client_timestamp` desc.
- **Device heartbeat & status**
  - `POST /v1/devices/heartbeat`: upsert theo `machine_id`, cập nhật host, IPs, app_version, queue_size, last_heartbeat; trả DTO.
  - `GET /v1/devices`: pagination + filter machine_id/host_name + status (ONLINE/OFFLINE) chuyển thành window thời gian theo `OFFLINE_MS`.
  - `GET /v1/devices/status-summary`: đếm online/offline (dựa vào last_heartbeat so với ngưỡng offline).
- **User management**
  - CRUD cơ bản; báo lỗi `AppException(2001)` khi không tìm thấy.

### 3.6 API Surface & Contracts

- **Versioning**: controllers khai báo `{ version: '1' }` → đường dẫn `/v1/...`.
- **Response shape**: mọi response (trừ 204) được wrap qua `ApiResponseInterceptor`; pagination trả `meta` với `current/pageSize/pages/total`.
- **Error shape**: `{ success: false, data: null, meta: null, error: { code, message, errorId?, details?, requestId } }`.

### 3.7 Observability & Ops

- **Logging**: Winston JSON log cho inbound/outbound HTTP; log error/exception tại filter.
- **Tracing-lite**: `x-request-id` theo request; propagate đến client qua header.
- **Config**: `.env` + schema trong `config/*.config.ts`; validation thực thi qua Nest ConfigModule.

## 4. Admin Portal (NextJS)

Web Dashboard dành cho người quản trị, được xây dựng trên nền tảng Next.js hiện đại, tập trung vào trải nghiệm người dùng (UX) và hiệu năng.

### 4.1 Technology Stack

| Category             | Technology          | Description                                      |
| :------------------- | :------------------ | :----------------------------------------------- |
| **Framework**        | **Next.js 16**      | App Router architecture, Server Components.      |
| **Language**         | **TypeScript**      | Static typing for reliability.                   |
| **UI Library**       | **Shadcn/UI**       | Reusable components based on Radix UI.           |
| **Styling**          | **Tailwind CSS**    | Utility-first CSS framework.                     |
| **State Management** | **TanStack Query**  | Quản lý Server State (Caching, Synchronization). |
| **Form Management**  | **React Hook Form** | Performant form validation with **Zod**.         |
| **Data Fetching**    | **Axios**           | HTTP Client với Interceptors xử lý Auth/Error.   |
| **Charts**           | **Recharts**        | Biểu đồ trực quan hóa dữ liệu.                   |
| **Icons**            | **Lucide React**    | Bộ icon thống nhất.                              |

### 4.2 Application Architecture

Dự án tuân theo cấu trúc **Feature-based** của Next.js App Router, giúp dễ dàng mở rộng và bảo trì.

#### A. Directory Structure

- `app/(auth)`: Các trang xác thực (Login), tách biệt layout với dashboard.
- `app/(dashboard)`: Các trang quản trị chính, sử dụng chung layout (Sidebar, Header).
  - `attendance-records/`: Module quản lý lịch sử điểm danh.
  - `devices/`: Module quản lý thiết bị.
  - `dashboard/`: Trang tổng quan thống kê.
- `components/`: UI Components dùng chung (Button, Input, Table...).
- `services/`: Lớp giao tiếp API và cấu hình Query Client.
- `hooks/`: Custom hooks (useTheme, useSidebar...).

#### B. Data Fetching Strategy

Sử dụng pattern **Custom Hooks** kết hợp **TanStack Query**:

1. **API Layer (`services/axios`)**: Cấu hình `baseApi` với `baseURL` từ biến môi trường. Interceptors tự động đính kèm Credentials và xử lý lỗi 401 (Unauthorized).
2. **Service Layer (`api/*.ts`)**: Định nghĩa các hàm `fetcher` (e.g., `getRecords`) trả về Promise.
3. **Hook Layer (`useGetRecords`)**: Wrap `useQuery` để quản lý loading state, caching, và mapping dữ liệu trả về (Data + Metadata).

#### C. Component Design

- **Atomic Design**: Sử dụng các thành phần nhỏ từ `components/ui` (Shadcn) để xây dựng các feature components lớn hơn.
- **Client vs Server Components**: Tối ưu hóa việc render. Các trang danh sách (`page.tsx`) thường là Client Components để xử lý tương tác (Filter, Pagination), trong khi Layout có thể là Server Components.

### 4.3 Key Features

1. **Dashboard Overview**:

   - Hiển thị thống kê tổng quan (Cards).
   - Biểu đồ biến động điểm danh.

2. **Attendance Management (Quản lý Điểm danh)**:

   - **Data Table**: Hiển thị danh sách log điểm danh với phân trang (Server-side pagination).
   - **Filter & Sort**: Bộ lọc nâng cao theo tên, thời gian (Range Picker) và sắp xếp theo cột.
   - **Real-time Feedback**: Loading skeletons và Toast notifications.

3. **Device Management (Quản lý Thiết bị)**:

   - Giám sát trạng thái Online/Offline của các máy chấm công.
   - Xem thông tin chi tiết (IP, App Version, Last Heartbeat).

4. **Authentication**:
   - Cơ chế đăng nhập bảo mật.
   - Tự động redirect nếu session hết hạn.

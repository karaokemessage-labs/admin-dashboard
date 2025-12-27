# API Integration Summary

Tài liệu này mô tả các API đã được tích hợp vào hệ thống admin dashboard dựa trên OpenAPI specification.

## Base URL
```
https://kaka-club-api-gateway.ngrok.dev
```

## Các API đã tích hợp

### 1. Authentication APIs (`/auth/*`)
✅ **Đã tích hợp đầy đủ**
- `POST /auth/register` - Đăng ký tài khoản mới
- `POST /auth/login` - Đăng nhập
- `GET /auth/me` - Lấy thông tin người dùng hiện tại
- `POST /auth/logout` - Đăng xuất
- `POST /auth/refresh` - Làm mới access token
- `POST /auth/change-password` - Đổi mật khẩu
- `POST /auth/forgot-password` - Quên mật khẩu
- `POST /auth/reset-password` - Đặt lại mật khẩu

**Service:** `authService` (`src/services/authService.ts`)

### 2. Admin APIs (`/admin/*`)
✅ **Đã tích hợp**
- `POST /admin/login` - Đăng nhập admin
- `GET /admin/dashboard/stats` - Lấy thống kê dashboard

**Service:** `adminService` (`src/services/adminService.ts`)

**Sử dụng:**
- Dashboard component có thể sử dụng `adminService.getDashboardStats()` để hiển thị dữ liệu thực tế

### 3. Wallet APIs (`/wallet/*`)
✅ **Đã tích hợp**
- `GET /wallet/balance?user_id={id}` - Lấy số dư người dùng
- `POST /wallet/credit-balance` - Nạp tiền (credit)
- `POST /wallet/debit-balance` - Trừ tiền (debit)

**Service:** `walletService` (`src/services/walletService.ts`)

**Sử dụng:**
- WalletPayment page có thể sử dụng để quản lý số dư và giao dịch

### 4. User Management APIs (`/users/*`)
✅ **Đã tích hợp**
- `POST /users` - Tạo người dùng mới
- `GET /users` - Lấy danh sách người dùng (có pagination)
- `GET /users/{id}` - Lấy thông tin người dùng theo ID
- `PUT /users/{id}` - Cập nhật thông tin người dùng
- `DELETE /users/{id}` - Xóa người dùng (soft delete)

**Service:** `userService` (`src/services/userService.ts`)

**Sử dụng:**
- PlayersManagement, OperatorsManagement pages có thể sử dụng để quản lý người dùng

### 5. RBAC APIs (`/rbac/*`)
✅ **Đã tích hợp**
- `POST /rbac/roles` - Tạo role mới
- `GET /rbac/roles` - Lấy danh sách roles (có pagination)
- `GET /rbac/roles/{id}` - Lấy thông tin role theo ID
- `POST /rbac/permissions` - Tạo permission mới
- `POST /rbac/users/{userId}/roles` - Gán roles cho user

**Service:** `rbacService` (`src/services/rbacService.ts`)

**Sử dụng:**
- RolePermissionManagement page có thể sử dụng để quản lý roles và permissions

### 6. Facility APIs (`/facilities/*`)
✅ **Đã tích hợp**
- `POST /facilities` - Tạo facility mới
- `GET /facilities` - Lấy danh sách facilities (có pagination)
- `GET /facilities/{id}` - Lấy thông tin facility theo ID
- `PUT /facilities/{id}` - Cập nhật facility
- `DELETE /facilities/{id}` - Xóa facility (soft delete)

**Service:** `facilityService` (`src/services/facilityService.ts`)

**Sử dụng:**
- GamesManagement page có thể sử dụng để quản lý phòng/cơ sở vật chất

### 7. Booking APIs (`/bookings/*`)
✅ **Đã tích hợp**
- `POST /bookings` - Tạo booking mới
- `GET /bookings` - Lấy danh sách bookings (có filter và pagination)
  - Query params: `userId`, `facilityId`, `status`, `page`, `limit`
- `GET /bookings/{id}` - Lấy thông tin booking theo ID

**Service:** `bookingService` (`src/services/bookingService.ts`)

**Sử dụng:**
- Transactions page có thể sử dụng để hiển thị các giao dịch đặt phòng

### 8. Article APIs (`/articles/*`)
✅ **Đã tích hợp**
- `POST /articles` - Tạo article mới
- `GET /articles` - Lấy danh sách articles (có filter và pagination)
- `GET /articles/{id}` - Lấy article theo ID
- `GET /articles/slug/{slug}` - Lấy article theo slug
- `PUT /articles/{id}` - Cập nhật article
- `DELETE /articles/{id}` - Xóa article (soft delete)
- `POST /articles/{id}/publish` - Xuất bản article

**Service:** `articleService` (`src/services/articleService.ts`)

### 9. Comment APIs (`/comments/*`)
✅ **Đã tích hợp**
- `POST /comments` - Tạo comment mới
- `GET /comments/article/{articleId}` - Lấy comments theo article ID
- `GET /comments/{id}` - Lấy comment theo ID
- `PUT /comments/{id}` - Cập nhật comment
- `DELETE /comments/{id}` - Xóa comment (soft delete)

**Service:** `commentService` (`src/services/commentService.ts`)

## Cấu trúc Services

Tất cả services được export từ `src/services/index.ts`:

```typescript
import { 
  authService, 
  adminService, 
  walletService, 
  userService, 
  rbacService, 
  facilityService, 
  bookingService, 
  articleService, 
  commentService 
} from '@/services';
```

## Response Format

Tất cả APIs đều trả về format chuẩn:

**Success Response:**
```typescript
{
  success: true,
  message?: string,
  data: <T>
}
```

**Error Response:**
```typescript
{
  success: false,
  message: string,
  error: {
    code: string,
    details?: Array<{ field?: string; message: string }>
  }
}
```

API Client tự động xử lý format này và extract `data` field, nên services sẽ nhận trực tiếp data object.

## Type Definitions

Tất cả TypeScript types được định nghĩa trong `src/types/api.ts` dựa trên OpenAPI schemas.

## Các trang cần tích hợp API

### Đã có service, cần tích hợp vào component:

1. **Dashboard** (`src/modules/provider/pages/Dashboard.tsx`)
   - Sử dụng: `adminService.getDashboardStats()`
   - Hiển thị: revenue, bookings, activeCustomers, charts, recentBookings

2. **Transactions** (`src/modules/provider/pages/Transactions.tsx`)
   - Sử dụng: `bookingService.getBookings()` với filters
   - Hiển thị: danh sách bookings/giao dịch

3. **RolePermissionManagement** (`src/modules/provider/pages/RolePermissionManagement.tsx`)
   - Sử dụng: `rbacService` (getRoles, createRole, createPermission, assignRolesToUser)
   - Quản lý: roles, permissions, và gán roles cho users

4. **WalletPayment** (`src/modules/provider/pages/WalletPayment.tsx`)
   - Sử dụng: `walletService` (getBalance, creditBalance, debitBalance)
   - Quản lý: số dư và giao dịch ví

5. **PlayersManagement / OperatorsManagement**
   - Sử dụng: `userService` (getUsers, createUser, updateUser, deleteUser)
   - Quản lý: danh sách người dùng

6. **GamesManagement**
   - Sử dụng: `facilityService` (getFacilities, createFacility, updateFacility, deleteFacility)
   - Quản lý: phòng/cơ sở vật chất

## Lưu ý

- Tất cả API endpoints đều yêu cầu Bearer token authentication (trừ một số public endpoints)
- API Client tự động thêm `Authorization: Bearer <token>` header từ localStorage
- API Client tự động xử lý 401 errors và redirect về login page
- Response format được normalize bởi API Client, services nhận trực tiếp data object


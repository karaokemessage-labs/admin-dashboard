# Tóm Tắt Xác Thực & Phân Quyền

## 🎯 Cách Hoạt Động

### Nguyên Tắc Chính
✅ **Backend xử lý phân quyền** - Tất cả logic phân quyền được thực hiện ở backend  
✅ **Frontend chỉ kiểm tra đăng nhập** - Chỉ cần kiểm tra user đã login hay chưa  
✅ **Sau khi login thành công → Truy cập tất cả trang** - Không có giới hạn ở frontend  

## 🔐 API Đăng Nhập

### Endpoint
```bash
POST https://api.vipka.club/auth/login
```

### Request
```json
{
  "emailOrUsername": "admin@kaka.club",
  "password": "be12345678@Ab",
  "rememberMe": false
}
```

### Response
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6d3642ca-ca5d-4963-9040-3f67371a2b39",
      "email": "admin@kaka.club",
      "username": "johndoe",
      "displayName": "Admin User",
      "role": "admin"  // ← Lấy được role từ đây
    }
  }
}
```

## 📊 Luồng Xác Thực

```
┌─────────────────────────────────────────┐
│ 1. User nhập email + password           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 2. Gọi API /auth/login                  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 3. API trả về:                          │
│    - accessToken                        │
│    - refreshToken                       │
│    - user.role                          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 4. Lưu vào localStorage:                │
│    - accessToken                        │
│    - user (bao gồm role)                │
│    - isAuthenticated = true             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 5. Navigate to /dashboard               │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 6. ProtectedRoute kiểm tra:             │
│    ✓ isAuthenticated === true           │
│    → Cho phép truy cập                  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 7. User có thể truy cập MỌI trang       │
│    - /dashboard/karaoke                 │
│    - /dashboard/users                   │
│    - /dashboard/clubs                   │
│    - /dashboard/massages                │
│    - Tất cả các trang khác              │
└─────────────────────────────────────────┘
```

## ✅ Kiểm Tra Phân Quyền

### Frontend (Client-side)
```typescript
// src/components/ProtectedRoute.tsx
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  // CHỈ kiểm tra đã đăng nhập hay chưa
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Không kiểm tra role - backend sẽ xử lý
  return <>{children}</>;
};
```

### Backend (Server-side)
- ✅ **Backend kiểm tra role** khi user gọi API
- ✅ **Backend trả về 403 Forbidden** nếu không có quyền
- ✅ **Frontend chỉ hiển thị lỗi** từ backend

## 🎯 Lý Do Thiết Kế Này

### Ưu Điểm
1. ✅ **Bảo mật tốt hơn** - Logic phân quyền tập trung ở backend
2. ✅ **Dễ bảo trì** - Chỉ cần sửa backend khi thay đổi quyền
3. ✅ **Không thể bypass** - User không thể chỉnh sửa frontend để truy cập
4. ✅ **Đơn giản hóa frontend** - Frontend chỉ cần kiểm tra login

### So Sánh

| Kiểm Tra | Frontend | Backend |
|----------|----------|---------|
| **Đã đăng nhập?** | ✅ Có | ✅ Có |
| **Có quyền truy cập?** | ❌ Không | ✅ Có |
| **Hiển thị UI** | ✅ Có | ❌ Không |
| **Xử lý API** | ❌ Không | ✅ Có |

## 📝 Cách Sử Dụng Role

### Lấy Role của User
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user } = useAuth();
  
  // Có thể lấy role để hiển thị
  console.log('User role:', user?.role);
  // Output: "admin"
  
  // Nhưng KHÔNG dùng để kiểm tra quyền truy cập
  // Backend sẽ xử lý việc đó
}
```

### Hiển Thị Role (Optional)
```typescript
function UserProfile() {
  const { user } = useAuth();
  
  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p>Email: {user?.email}</p>
      <p>Vai trò: {user?.role}</p> {/* Chỉ để hiển thị */}
    </div>
  );
}
```

### Xử Lý Lỗi Phân Quyền từ Backend
```typescript
import { apiClient } from '../services/apiClient';

async function deleteUser(userId: string) {
  try {
    await apiClient.delete(`/users/${userId}`);
    toast.success('Xóa user thành công');
  } catch (error: any) {
    // Backend trả về 403 nếu không có quyền
    if (error.status === 403) {
      toast.error('Bạn không có quyền thực hiện hành động này');
    } else {
      toast.error(error.message || 'Có lỗi xảy ra');
    }
  }
}
```

## 🧪 Kiểm Tra

### 1. Kiểm tra đăng nhập
```bash
# Login
curl -X 'POST' \
  'https://api.vipka.club/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "emailOrUsername": "admin@kaka.club",
  "password": "be12345678@Ab",
  "rememberMe": false
}'
```

### 2. Kiểm tra trong Browser Console
```javascript
// Kiểm tra đã đăng nhập
console.log('Is Authenticated:', localStorage.getItem('isAuthenticated'));
// Output: "true"

// Kiểm tra user info
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user.role);
// Output: { email: "admin@kaka.club", role: "admin", ... }

// Kiểm tra token
console.log('Access Token:', localStorage.getItem('accessToken'));
// Output: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. Kiểm tra truy cập trang
```
✅ Sau khi login thành công:
   - http://localhost:5173/dashboard ✓
   - http://localhost:5173/dashboard/karaoke ✓
   - http://localhost:5173/dashboard/users ✓
   - http://localhost:5173/dashboard/clubs ✓
   - Tất cả các trang khác ✓

❌ Chưa login:
   - Tất cả trang → Redirect to /login
```

## 🔑 Các File Quan Trọng

| File | Chức Năng |
|------|-----------|
| `src/contexts/AuthContext.tsx` | Quản lý state đăng nhập, lưu user info |
| `src/services/authService.ts` | Gọi API login, getMe |
| `src/components/ProtectedRoute.tsx` | Kiểm tra đã login (KHÔNG kiểm tra role) |
| `src/components/auth/Login.tsx` | UI đăng nhập |

## ✅ Tóm Tắt

### Sau khi đăng nhập thành công:

1. ✅ **Token được lưu** - accessToken, refreshToken
2. ✅ **User info được lưu** - Bao gồm role
3. ✅ **isAuthenticated = true** - Đánh dấu đã đăng nhập
4. ✅ **Có thể truy cập MỌI trang** - Không bị chặn ở frontend
5. ✅ **Backend kiểm tra quyền** - Khi gọi API
6. ✅ **Frontend hiển thị lỗi** - Nếu backend trả về 403

### Role của user.role:

- ✅ **Lưu trữ thông tin** - Biết user có role gì
- ✅ **Hiển thị UI** - Có thể hiển thị role trong profile
- ❌ **KHÔNG dùng để phân quyền** - Backend xử lý

---

**Cập nhật**: 2026-02-02  
**Phiên bản**: 1.0.0  
**Kiến trúc**: Backend-based Authorization

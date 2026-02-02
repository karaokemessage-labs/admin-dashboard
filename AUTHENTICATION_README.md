# 🔐 Authentication & Authorization - README

## 📌 Tóm Tắt Nhanh

**Sau khi login thành công với API `/auth/login`, bạn có thể:**

✅ Lấy được `user.role` từ response: `response.data.user.role`  
✅ Truy cập tất cả các trang trong dashboard  
✅ Backend sẽ xử lý phân quyền khi gọi API  

## 🎯 Kiến Trúc

```
Frontend (React)              Backend (NestJS)
─────────────────            ─────────────────
✓ Kiểm tra login             ✓ Kiểm tra login
✓ Lưu token                  ✓ Kiểm tra quyền
✓ Hiển thị UI                ✓ Xử lý API
✗ KHÔNG kiểm tra quyền       ✓ Trả về 403 nếu không có quyền
```

## 🚀 Cách Lấy User Role

### 1. Từ API Response (Login)
```typescript
const response = await authService.login({
  emailOrUsername: 'admin@kaka.club',
  password: 'be12345678@Ab'
});

// Role ở đây: response.data.user.role
console.log(response.data.user.role); // "admin"
```

### 2. Từ AuthContext (Recommended)
```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user } = useAuth();
  
  console.log(user?.role); // "admin"
}
```

### 3. Từ localStorage
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.role); // "admin"
```

## 📁 Tài Liệu Chi Tiết

| File | Nội Dung |
|------|----------|
| **AUTHENTICATION_SUMMARY.md** | 🇻🇳 Tóm tắt xác thực & phân quyền (Tiếng Việt) |
| **AUTHENTICATION_GUIDE.md** | 🇬🇧 Hướng dẫn chi tiết về authentication (English) |
| **QUICK_REFERENCE_USER_ROLE.md** | 📖 Tham khảo nhanh cách lấy user role |
| **src/examples/UserRoleExamples.tsx** | 💻 10 ví dụ code sử dụng user role |
| **ROLE_BASED_ACCESS_SUMMARY.md** | 📊 Tóm tắt cách role được extract từ API |

## 🔑 API Endpoint

### Login
```bash
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

### Response
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "role": "admin"  ← User role ở đây
    }
  }
}
```

## ✅ Checklist

- [x] API login hoạt động
- [x] Role được extract từ `data.user.role`
- [x] Role được lưu vào `AuthContext`
- [x] Role được lưu vào `localStorage`
- [x] Sau login → Truy cập được tất cả trang
- [x] Backend xử lý phân quyền
- [x] Frontend chỉ kiểm tra đã login

## 🧪 Test Nhanh

```javascript
// Mở Browser Console (F12)

// 1. Kiểm tra đã login
localStorage.getItem('isAuthenticated') // "true"

// 2. Kiểm tra user role
JSON.parse(localStorage.getItem('user')).role // "admin"

// 3. Kiểm tra token
localStorage.getItem('accessToken') // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📞 Liên Hệ

Nếu có câu hỏi, xem các file tài liệu chi tiết ở trên hoặc kiểm tra code trong:
- `src/contexts/AuthContext.tsx` - Logic xác thực
- `src/services/authService.ts` - API calls
- `src/components/ProtectedRoute.tsx` - Route protection

---

**Cập nhật**: 2026-02-02  
**API**: https://api.vipka.club

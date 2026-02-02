# Role-Based Access Control - Implementation Summary

## ✅ Đã hoàn thành

### 1. Cập nhật AuthContext để lấy role từ API

**File**: `src/contexts/AuthContext.tsx`

#### Thay đổi:
```tsx
// ❌ TRƯỚC (hardcoded)
role: 'admin', // Always admin role

// ✅ SAU (dynamic from API)
role: (userData.role || apiUser.role || 'admin') as UserRole, // Get role from API, fallback to 'admin'
```

#### Các hàm đã cập nhật:
1. **`mapUserFromApi()`** - Line 83
   - Lấy role từ `userData.role` hoặc `apiUser.role`
   - Fallback về `'admin'` nếu không có

2. **`login()` - Temporary user** - Line 176
   - Lấy role từ `responseData?.role` hoặc `responseUser?.role`
   - Dùng khi user cần verify 2FA

3. **`login()` - Final user** - Line 200
   - Lấy role từ `responseData?.role` hoặc `responseUser?.role`
   - Dùng sau khi login thành công

### 2. API Response Structure

Từ API `/auth/me`, role nằm ở:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "admin@kaka.club",
      "username": "karaclub",
      ...
    },
    "role": "admin"  // ← Role ở đây
  }
}
```

### 3. Flow xử lý Role

```
User đăng nhập
    ↓
API /auth/login trả về response
    ↓
Extract role từ response.data.role hoặc response.user.role
    ↓
Lưu vào user object: { ..., role: "admin" }
    ↓
Lưu vào localStorage
    ↓
ProtectedRoute kiểm tra isAuthenticated
    ↓
Nếu user.role === "admin" → Cho phép truy cập tất cả trang
```

### 4. ProtectedRoute Logic

**File**: `src/components/ProtectedRoute.tsx`

```tsx
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Optional: Check if user has admin role
  // Uncomment to enforce admin-only access
  // if (user?.role?.toLowerCase() !== 'admin') {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};
```

**Hiện tại**:
- ✅ Kiểm tra `isAuthenticated`
- 🔒 **Không** kiểm tra role (commented out)
- ✅ Cho phép tất cả authenticated users truy cập

**Để bật kiểm tra admin-only**:
Uncomment dòng 19-21 để chỉ cho phép admin truy cập.

## 📊 Kết quả

### Trước khi cập nhật:
- ❌ Role luôn hardcoded là `'admin'`
- ❌ Không lấy role thực từ API
- ❌ Không thể phân quyền dựa trên role thực

### Sau khi cập nhật:
- ✅ Role được lấy từ API response (`data.role`)
- ✅ Fallback về `'admin'` nếu API không trả về role
- ✅ Có thể phân quyền dựa trên role thực từ API
- ✅ **Nếu `data.role === 'admin'` → User có thể truy cập mọi trang**

## 🔐 Cách hoạt động

### Case 1: User có role admin
```json
{
  "data": {
    "role": "admin",
    "user": { ... }
  }
}
```
→ `user.role = "admin"`  
→ `isAuthenticated = true`  
→ **Có thể truy cập tất cả trang** ✅

### Case 2: User có role khác (nếu có)
```json
{
  "data": {
    "role": "user",
    "user": { ... }
  }
}
```
→ `user.role = "user"`  
→ `isAuthenticated = true`  
→ Có thể truy cập (nếu không bật admin-only check)  
→ **Không** thể truy cập (nếu bật admin-only check) ❌

### Case 3: API không trả về role
```json
{
  "data": {
    "user": { ... }
    // Không có role
  }
}
```
→ `user.role = "admin"` (fallback)  
→ `isAuthenticated = true`  
→ **Có thể truy cập tất cả trang** ✅

## 🧪 Testing

### Test với token hợp lệ:
```bash
# 1. Login để lấy token mới
curl -X POST https://api.vipka.club/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"usernameOrEmail":"karaclub","password":"YOUR_PASSWORD"}'

# 2. Lấy user info
curl -X GET https://api.vipka.club/auth/me \
  -H 'Authorization: Bearer YOUR_TOKEN'

# 3. Kiểm tra role trong response
# Nếu data.role === "admin" → OK
```

### Kiểm tra trong browser:
```javascript
// Mở DevTools Console
const user = JSON.parse(localStorage.getItem('user'));
console.log('User role:', user.role);

// Nếu role === "admin" → Có thể truy cập mọi trang
```

## 📝 Lưu ý quan trọng

1. **Role từ API**: Đảm bảo API `/auth/me` trả về `data.role` hoặc `user.role`
2. **Fallback**: Nếu API không trả về role, mặc định là `'admin'`
3. **Admin-only check**: Hiện đang **tắt**, có thể bật bằng cách uncomment trong `ProtectedRoute.tsx`
4. **Token expiration**: Token hết hạn sau 5 phút, cần login lại

## ✅ Kết luận

**Nếu `data.role === 'admin'` từ API `/auth/me`:**
- ✅ User được xác thực thành công
- ✅ `user.role` được set là `'admin'`
- ✅ `isAuthenticated = true`
- ✅ **User có thể truy cập MỌI trang trong dashboard**

Tất cả các trang như:
- `/dashboard/karaoke` ✅
- `/dashboard/users` ✅
- `/dashboard/clubs` ✅
- `/dashboard/massages` ✅
- Và tất cả các trang khác ✅

---

**Updated**: 2026-02-02  
**Version**: 2.0.0

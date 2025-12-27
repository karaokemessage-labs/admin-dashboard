# Authentication API Integration Summary

## Đã tích hợp thành công

### 1. Login API (`POST /auth/login`)
✅ **Đã tích hợp**
- **Component:** `src/components/auth/Login.tsx`
- **Context:** `src/contexts/AuthContext.tsx`
- **Service:** `src/services/authService.ts` → `login()`

**Cách sử dụng:**
```typescript
const { login } = useAuth();
const result = await login({ email: 'user@example.com', password: 'password' });
if (result.requires2FA) {
  // Show 2FA setup/verify component
} else {
  // Login successful
}
```

**Tính năng:**
- ✅ Gọi API `/auth/login` với emailOrUsername và password
- ✅ Xử lý response và extract accessToken/refreshToken
- ✅ Hỗ trợ 2FA flow (nếu required)
- ✅ Lưu token vào localStorage
- ✅ Fetch user info sau khi login thành công
- ✅ Error handling với user-friendly messages

### 2. Logout API (`POST /auth/logout`)
✅ **Đã tích hợp**
- **Context:** `src/contexts/AuthContext.tsx`
- **Component:** `src/components/Header.tsx`
- **Service:** `src/services/authService.ts` → `logout()`

**Cách sử dụng:**
```typescript
const { logout } = useAuth();
await logout(); // Clears local storage and calls API
```

**Tính năng:**
- ✅ Gọi API `/auth/logout` để invalidate token trên server
- ✅ Clear local storage và state
- ✅ Redirect về login page
- ✅ Error handling - vẫn clear local storage nếu API call fails

### 3. Get Current User (`GET /auth/me`)
✅ **Đã tích hợp**
- **Context:** `src/contexts/AuthContext.tsx` → `fetchUserInfo()`
- **Service:** `src/services/authService.ts` → `getMe()`

**Cách sử dụng:**
```typescript
const { fetchUserInfo } = useAuth();
await fetchUserInfo(); // Fetches current user profile
```

**Tính năng:**
- ✅ Gọi API `/auth/me` để lấy thông tin user hiện tại
- ✅ Auto-fetch sau khi login thành công
- ✅ Map response về User type với role information

### 4. Change Password (`POST /auth/change-password`)
✅ **Đã tích hợp sẵn**
- **Components:** 
  - `src/modules/provider/pages/MyProfile.tsx`
  - `src/modules/operator/pages/MyProfile.tsx`
- **Service:** `src/services/authService.ts` → `changePassword()`

**Cách sử dụng:**
```typescript
import { authService } from '@/services';
await authService.changePassword({
  oldPassword: 'oldPassword123', // Backward compatible
  newPassword: 'newPassword456',
});
```

**Tính năng:**
- ✅ Gọi API `/auth/change-password`
- ✅ Hỗ trợ `oldPassword` (backward compatible) và `currentPassword`
- ✅ Tự động thêm `confirmNewPassword` nếu không được cung cấp
- ✅ Validation và error handling

### 5. Register (`POST /auth/register`)
✅ **Đã có service, chưa tích hợp vào component**
- **Service:** `src/services/authService.ts` → `register()`

**Cần tích hợp:**
- Tạo Register component nếu cần
- Sử dụng `authService.register()` với RegisterDto

### 6. Refresh Token (`POST /auth/refresh`)
✅ **Đã có service, chưa auto-implement**
- **Service:** `src/services/authService.ts` → `refreshTokens()`

**Cần tích hợp:**
- Implement auto-refresh khi token sắp hết hạn
- Hoặc call khi nhận 401 error

### 7. Forgot Password (`POST /auth/forgot-password`)
✅ **Đã có service, chưa tích hợp vào component**
- **Service:** `src/services/authService.ts` → `forgotPassword()`

**Cần tích hợp:**
- Tạo ForgotPassword component
- Link từ Login page

### 8. Reset Password (`POST /auth/reset-password`)
✅ **Đã có service, chưa tích hợp vào component**
- **Service:** `src/services/authService.ts` → `resetPassword()`

**Cần tích hợp:**
- Tạo ResetPassword component
- Nhận token từ URL query parameter

## Flow đã hoàn thiện

### Login Flow
1. User nhập email/username và password
2. Gọi `login()` từ AuthContext
3. AuthContext gọi `authService.login()` → API `/auth/login`
4. Nhận response với accessToken và refreshToken
5. Nếu cần 2FA → hiển thị Setup2FA/Verify2FA component
6. Nếu không cần 2FA → lưu token và fetch user info
7. Redirect đến dashboard

### Logout Flow
1. User click logout button
2. Gọi `logout()` từ AuthContext
3. AuthContext gọi `authService.logout()` → API `/auth/logout`
4. Clear local storage và state
5. Redirect về login page

### 2FA Flow
1. Sau khi login, nếu `requires2FA === true`
2. Hiển thị Setup2FA component
3. User setup hoặc verify 2FA
4. Sau khi verify thành công → lưu token mới
5. Fetch user info và redirect đến dashboard

## Các API chưa tích hợp vào UI

1. **Register** - Cần tạo Register component
2. **Forgot Password** - Cần tạo ForgotPassword component  
3. **Reset Password** - Cần tạo ResetPassword component
4. **Refresh Token** - Cần implement auto-refresh logic

## Testing Checklist

- [ ] Login với credentials hợp lệ
- [ ] Login với credentials không hợp lệ (error handling)
- [ ] Login với 2FA required
- [ ] Logout thành công
- [ ] Logout khi API fails (vẫn clear local storage)
- [ ] Change password thành công
- [ ] Change password với mật khẩu cũ sai
- [ ] Fetch user info sau login
- [ ] Token được lưu đúng trong localStorage

## Lưu ý

- Tất cả API calls đều có error handling
- Tokens được lưu trong localStorage với keys: `accessToken`, `refreshToken`, `token`
- API Client tự động thêm `Authorization: Bearer <token>` header
- 401 errors được handle tự động và redirect về login
- Response format được normalize bởi API Client


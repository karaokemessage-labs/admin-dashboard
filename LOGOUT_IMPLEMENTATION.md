# Logout Implementation Documentation

## Tổng quan

Chức năng logout đã được tích hợp đầy đủ với 3 lớp xử lý:

1. **Service Layer** (`authService.logout()`) - Gọi API logout
2. **Context Layer** (`AuthContext.logout()`) - Quản lý state và localStorage
3. **Component Layer** (`Header.handleLogout()`) - Xử lý UI và navigation

## Flow Logout

```
User clicks Logout Button (Header)
    ↓
handleLogout() (Header component)
    ↓
logout() (AuthContext)
    ↓
authService.logout() (Service)
    ↓
POST /auth/logout (API)
    ↓
Clear localStorage & State
    ↓
Show success message
    ↓
Redirect to /login
```

## Implementation Details

### 1. Service Layer - `src/services/authService.ts`

```typescript
async logout(): Promise<SuccessResponseDto> {
  try {
    // Call logout API endpoint to invalidate token on server
    const response = await apiClient.post<SuccessResponseDto>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    
    return {
      success: true,
      data: response.data || {},
      message: response.message || 'Đăng xuất thành công',
    };
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(
      apiError.message || 'Đăng xuất thất bại. Vui lòng thử lại.'
    );
  }
}
```

**Tính năng:**
- ✅ Gọi API `POST /auth/logout` để invalidate token trên server
- ✅ Xử lý response và trả về SuccessResponseDto
- ✅ Error handling với error messages

### 2. Context Layer - `src/contexts/AuthContext.tsx`

```typescript
const logout = async () => {
  try {
    // Call API logout to invalidate token on server
    await authService.logout();
  } catch (error) {
    // Even if API call fails, still clear local storage
    // This ensures user can logout even if server is unavailable
    console.error('Logout API call failed:', error);
  } finally {
    // Always clear local state and storage, regardless of API call result
    setUser(null);
    setToken(null);
    setMustSetup2fa(false);
    hasFetchedUserRef.current = false;
    
    // Clear all authentication-related items from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('pendingLoginEmail');
  }
};
```

**Tính năng:**
- ✅ Gọi `authService.logout()` để invalidate token trên server
- ✅ Clear tất cả state: user, token, mustSetup2fa
- ✅ Clear tất cả localStorage items liên quan đến authentication
- ✅ Error handling - vẫn clear local storage ngay cả khi API fails
- ✅ Reset hasFetchedUserRef để có thể fetch user lại ở lần login tiếp theo

### 3. Component Layer - `src/components/Header.tsx`

```typescript
const handleLogout = async () => {
  try {
    // Call logout function from AuthContext
    await logout();
    
    // Show success message
    const messages: Record<string, string> = {
      en: 'Logged out successfully!',
      vi: 'Đăng xuất thành công!',
      // ... other languages
    };
    toast.success(messages[language] || messages.en);
    
    // Redirect to login page
    navigate('/login', { replace: true });
  } catch (error: any) {
    // Even if logout throws an error, still redirect to login
    console.error('Logout error:', error);
    toast.info('Đã đăng xuất (có thể không đồng bộ với server)');
    navigate('/login', { replace: true });
  }
};
```

**Tính năng:**
- ✅ Gọi `logout()` từ AuthContext
- ✅ Hiển thị success message với đa ngôn ngữ
- ✅ Redirect về `/login` page với `replace: true` (không lưu history)
- ✅ Error handling - vẫn redirect ngay cả khi có lỗi

## UI Integration

Logout button được đặt trong Header component, trong profile dropdown menu:

```tsx
<button 
  onClick={handleLogout}
  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
>
  <Power className="w-5 h-5 text-red-600" />
  <span className="font-medium">{t('common.logout')}</span>
</button>
```

**Vị trí:**
- Header → Profile Menu → Logout Button

## LocalStorage Items Cleared

Khi logout, các items sau sẽ được xóa khỏi localStorage:

1. `user` - User data
2. `token` - Legacy token (backward compatibility)
3. `accessToken` - JWT access token
4. `refreshToken` - JWT refresh token
5. `isAuthenticated` - Authentication flag
6. `pendingLoginEmail` - Pending login email (if exists)

## State Cleared

Khi logout, các state sau sẽ được reset:

1. `user` → `null`
2. `token` → `null`
3. `mustSetup2fa` → `false`
4. `hasFetchedUserRef.current` → `false`

## Error Handling Strategy

### Strategy: Fail-Safe Logout

Logout function được thiết kế với **fail-safe** approach:

1. **Try to call API first** - Cố gắng invalidate token trên server
2. **Always clear local storage** - Dù API có thành công hay không
3. **Always redirect** - Đảm bảo user được đưa về login page

**Lý do:**
- User có thể logout ngay cả khi server không available
- Đảm bảo security - clear local data ngay lập tức
- User experience tốt - không bị stuck nếu API fails

### Error Scenarios

1. **API Success + Local Clear Success**
   - ✅ Show success message
   - ✅ Redirect to login
   - ✅ User logged out completely

2. **API Fails + Local Clear Success**
   - ⚠️ Log error to console
   - ✅ Still clear local storage
   - ✅ Show info message
   - ✅ Redirect to login
   - ✅ User logged out locally (may need to re-login if token still valid on server)

3. **Both Fail (rare)**
   - ❌ Log error to console
   - ⚠️ Local storage may not be cleared (browser issue)
   - ✅ Still redirect to login
   - ⚠️ User may need to manually clear browser data

## Testing Checklist

- [ ] Logout với API thành công
- [ ] Logout với API fails (network error)
- [ ] Verify localStorage được clear
- [ ] Verify state được reset
- [ ] Verify redirect về /login
- [ ] Verify success message hiển thị
- [ ] Verify không thể access protected routes sau logout
- [ ] Test với nhiều ngôn ngữ khác nhau

## Usage Example

```typescript
// In any component
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      // User is now logged out
      // Navigation is handled in Header component
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

## API Endpoint

```
POST /auth/logout
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": {}
}
```

## Security Considerations

1. ✅ Token được invalidate trên server
2. ✅ Local storage được clear hoàn toàn
3. ✅ State được reset
4. ✅ Navigation được replace (không lưu history)
5. ✅ Fail-safe design - vẫn logout ngay cả khi API fails

## Future Improvements (Optional)

1. **Loading State** - Show loading indicator khi logout
2. **Confirmation Dialog** - Confirm trước khi logout
3. **Session Cleanup** - Clear sessionStorage nếu có
4. **Analytics** - Track logout events
5. **Logout Callback** - Callback function sau khi logout thành công






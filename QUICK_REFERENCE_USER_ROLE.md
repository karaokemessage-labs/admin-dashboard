# Quick Reference: User Role Extraction

## 🎯 How to Get User Role

After successful login, the user role is available in multiple places:

### 1. From AuthContext (Recommended)
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user } = useAuth();
  
  console.log('User role:', user?.role);
  // Output: "admin"
}
```

### 2. From localStorage
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('User role:', user.role);
// Output: "admin"
```

### 3. From API Response (Login)
```typescript
const response = await authService.login({
  emailOrUsername: 'admin@kaka.club',
  password: 'be12345678@Ab'
});

// Role is in: response.data.user.role
console.log('User role:', response.data.user.role);
// Output: "admin"
```

### 4. From API Response (/auth/me)
```typescript
const userData = await authService.getMe();

// Role is in: userData.data.user.role
console.log('User role:', userData.data.user.role);
// Output: "admin"
```

## 📍 API Response Structure

### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6d3642ca-ca5d-4963-9040-3f67371a2b39",
      "email": "admin@kaka.club",
      "username": "johndoe",
      "displayName": "Admin User",
      "role": "admin"  ← HERE
    }
  }
}
```

### /auth/me Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6d3642ca-ca5d-4963-9040-3f67371a2b39",
      "email": "admin@kaka.club",
      "username": "johndoe",
      "displayName": "Admin User",
      "role": "admin"  ← HERE
    }
  }
}
```

## 🔍 Role Extraction Priority

The `mapUserFromApi()` function checks these locations in order:

```typescript
// Priority order (first match wins):
1. userData.user.role      // ← Primary (most common)
2. userData.role           // ← Alternative
3. apiUser.user.role       // ← Fallback
4. apiUser.role            // ← Fallback
5. 'admin'                 // ← Default fallback
```

## ✅ Usage Examples

### Example 1: Check if User is Admin
```typescript
import { useAuth } from '../contexts/AuthContext';

function AdminPanel() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return <div>Welcome Admin!</div>;
}
```

### Example 2: Conditional Rendering
```typescript
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      {user?.role === 'admin' && (
        <button>Admin Settings</button>
      )}
      
      {user?.role === 'user' && (
        <button>User Settings</button>
      )}
    </div>
  );
}
```

### Example 3: Role-Based Navigation
```typescript
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <button onClick={handleDashboardClick}>
      Go to Dashboard
    </button>
  );
}
```

## 🧪 Testing

### Test in Browser Console
```javascript
// 1. Check user object
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user.role);

// 2. Check authentication state
console.log('Is Authenticated:', localStorage.getItem('isAuthenticated'));

// 3. Check tokens
console.log('Access Token:', localStorage.getItem('accessToken'));
console.log('Refresh Token:', localStorage.getItem('refreshToken'));
```

### Test with curl
```bash
# 1. Login
curl -X 'POST' \
  'https://api.vipka.club/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "emailOrUsername": "admin@kaka.club",
  "password": "be12345678@Ab",
  "rememberMe": false
}'

# 2. Get user info (replace TOKEN with actual token)
curl -X 'GET' \
  'https://api.vipka.club/auth/me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer TOKEN'
```

## 📊 Common Scenarios

### Scenario 1: Admin Login
```
Input:  emailOrUsername = "admin@kaka.club"
        password = "be12345678@Ab"

Output: user.role = "admin"
        isAuthenticated = true
        Can access all pages ✓
```

### Scenario 2: Regular User Login
```
Input:  emailOrUsername = "user@kaka.club"
        password = "password123"

Output: user.role = "user"
        isAuthenticated = true
        Can access user pages ✓
        Cannot access admin pages ✗ (if admin-only check is enabled)
```

### Scenario 3: No Role in Response
```
Input:  API returns user without role field

Output: user.role = "admin" (fallback)
        isAuthenticated = true
        Can access all pages ✓
```

## 🔐 Security Notes

1. **Role is extracted from API response** - Not hardcoded
2. **Fallback to 'admin'** - Ensures system doesn't break if API changes
3. **Stored in localStorage** - Persists across page refreshes
4. **Validated on each API call** - Server-side validation is still required
5. **Client-side only** - Don't rely solely on client-side role checks for security

## 📝 Key Files

| File | Line | What It Does |
|------|------|--------------|
| `src/contexts/AuthContext.tsx` | 72-93 | `mapUserFromApi()` - Extracts role from API response |
| `src/contexts/AuthContext.tsx` | 127-243 | `login()` - Handles login and role extraction |
| `src/contexts/AuthContext.tsx` | 96-117 | `fetchUserInfo()` - Fetches user info from /auth/me |
| `src/services/authService.ts` | 209-243 | `login()` - API call to /auth/login |
| `src/services/authService.ts` | 373-417 | `getMe()` - API call to /auth/me |

## ✅ Summary

**After login, you can access user role via:**

1. ✅ `useAuth().user.role` (Recommended)
2. ✅ `localStorage.getItem('user')` then parse JSON
3. ✅ API response `data.user.role`

**The role is automatically:**

- ✅ Extracted from API response
- ✅ Stored in AuthContext
- ✅ Saved to localStorage
- ✅ Available throughout the app

---

**Last Updated**: 2026-02-02  
**Version**: 1.0.0

# Authentication & Role-Based Access Guide

## 📋 Overview

This document explains how the admin dashboard handles authentication and role-based access control (RBAC) using the Kara.Club API.

## 🔐 Login API

### Endpoint
```
POST https://api.vipka.club/auth/login
```

### Request
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

### Response Structure
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
      "role": "admin"  // ← Role is extracted from here
    }
  }
}
```

## 🎯 Role Extraction Logic

### Location: `src/contexts/AuthContext.tsx`

The `mapUserFromApi()` function extracts the user role from multiple possible locations in the API response:

```typescript
const mapUserFromApi = (apiUser: UserMeResponse, fallbackEmail?: string): User => {
  // Extract data from response (could be in data field or top level)
  const userData = apiUser.data || apiUser;

  // Role can be in different locations depending on API response structure:
  // 1. userData.user.role (most common for /auth/me)
  // 2. userData.role
  // 3. apiUser.user.role
  // 4. apiUser.role
  const userObj = (userData as any).user || userData;
  const role = userObj.role || userData.role || (apiUser as any).user?.role || apiUser.role || 'admin';

  return {
    id: userData.id || apiUser.id || apiUser.uid || apiUser.userId || userObj.id || '',
    email: userData.email || apiUser.email || userObj.email || fallbackEmail || '',
    name: userData.displayName || userData.name || apiUser.displayName || apiUser.name || userData.username || apiUser.username || userObj.name || '',
    displayName: userData.displayName || userData.name || apiUser.displayName || apiUser.name || userData.username || apiUser.username || userObj.displayName || '',
    username: userData.username || apiUser.username || userObj.username || '',
    phone: userData.phone || apiUser.phone || userObj.phone,
    role: role as UserRole, // Get role from API, fallback to 'admin'
  };
};
```

### Priority Order for Role Extraction

1. **`data.user.role`** - Primary location (from login response)
2. **`data.role`** - Alternative location
3. **`user.role`** - Top-level user object
4. **`role`** - Top-level role field
5. **`'admin'`** - Fallback if no role is found

## 🔄 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User enters credentials                                  │
│    - emailOrUsername: "admin@kaka.club"                     │
│    - password: "be12345678@Ab"                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Login.tsx calls AuthContext.login()                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. AuthContext.login() calls authService.login()            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. authService.login() sends POST to /auth/login            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. API returns response with user.role                      │
│    {                                                         │
│      "data": {                                               │
│        "accessToken": "...",                                 │
│        "user": {                                             │
│          "role": "admin"  ← Extracted here                  │
│        }                                                     │
│      }                                                       │
│    }                                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. AuthContext extracts role from response                  │
│    - Checks data.user.role                                  │
│    - Falls back to other locations if needed                │
│    - Defaults to 'admin' if not found                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. User object created with role                            │
│    {                                                         │
│      id: "...",                                              │
│      email: "admin@kaka.club",                               │
│      role: "admin"  ← Stored in user object                │
│    }                                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. Save to localStorage                                     │
│    - localStorage.setItem('user', JSON.stringify(user))     │
│    - localStorage.setItem('accessToken', token)             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 9. Fetch complete user info from /auth/me                   │
│    - Confirms role from server                              │
│    - Updates user object with latest data                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 10. Navigate to /dashboard                                  │
│     - ProtectedRoute checks isAuthenticated                 │
│     - User can access all pages                             │
└─────────────────────────────────────────────────────────────┘
```

## 🛡️ Protected Routes

### Location: `src/components/ProtectedRoute.tsx`

```typescript
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

### Current Behavior
- ✅ **Checks `isAuthenticated`** - User must be logged in
- 🔒 **Does NOT check role** - All authenticated users can access
- ✅ **Role is stored** - Available in `user.role` for future use

### To Enable Admin-Only Access
Uncomment lines to restrict access to admin role only:
```typescript
if (user?.role?.toLowerCase() !== 'admin') {
  return <Navigate to="/login" replace />;
}
```

## 📊 Role-Based Access Examples

### Example 1: Admin User
```json
{
  "data": {
    "user": {
      "role": "admin"
    }
  }
}
```
✅ **Result**: 
- `user.role = "admin"`
- `isAuthenticated = true`
- **Can access all pages**

### Example 2: Regular User
```json
{
  "data": {
    "user": {
      "role": "user"
    }
  }
}
```
✅ **Result** (with current settings):
- `user.role = "user"`
- `isAuthenticated = true`
- **Can access all pages** (role check is disabled)

❌ **Result** (if admin-only check is enabled):
- `user.role = "user"`
- `isAuthenticated = true`
- **Cannot access** - Redirected to login

### Example 3: No Role in Response
```json
{
  "data": {
    "user": {
      // No role field
    }
  }
}
```
✅ **Result**:
- `user.role = "admin"` (fallback)
- `isAuthenticated = true`
- **Can access all pages**

## 🧪 Testing Authentication

### 1. Test Login API
```bash
# Login with admin credentials
curl -X 'POST' \
  'https://api.vipka.club/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "emailOrUsername": "admin@kaka.club",
  "password": "be12345678@Ab",
  "rememberMe": false
}'

# Expected response:
# {
#   "success": true,
#   "data": {
#     "accessToken": "...",
#     "user": {
#       "role": "admin"
#     }
#   }
# }
```

### 2. Test User Info API
```bash
# Get user info with token
curl -X 'GET' \
  'https://api.vipka.club/auth/me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'

# Expected response:
# {
#   "success": true,
#   "data": {
#     "user": {
#       "role": "admin"
#     }
#   }
# }
```

### 3. Check in Browser Console
```javascript
// Open DevTools Console (F12)
const user = JSON.parse(localStorage.getItem('user'));
console.log('User role:', user.role);
console.log('Is authenticated:', localStorage.getItem('isAuthenticated'));
console.log('Access token:', localStorage.getItem('accessToken'));

// Expected output:
// User role: admin
// Is authenticated: true
// Access token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔑 Key Implementation Files

| File | Purpose | Key Functions |
|------|---------|---------------|
| `src/contexts/AuthContext.tsx` | Authentication state management | `login()`, `mapUserFromApi()`, `fetchUserInfo()` |
| `src/services/authService.ts` | API communication | `login()`, `getMe()` |
| `src/components/auth/Login.tsx` | Login UI component | `handleSubmit()` |
| `src/components/ProtectedRoute.tsx` | Route protection | Access control logic |

## 📝 Important Notes

### 1. Role Extraction
- ✅ **Automatic**: Role is automatically extracted from API response
- ✅ **Flexible**: Handles multiple response structures
- ✅ **Fallback**: Defaults to `'admin'` if no role found

### 2. Token Management
- 🔐 **Access Token**: Stored in `localStorage.accessToken`
- 🔐 **Refresh Token**: Stored in `localStorage.refreshToken`
- ⏱️ **Expiration**: Tokens expire after 5 minutes (configurable)

### 3. Authentication State
- ✅ **Persistent**: Survives page refresh via localStorage
- ✅ **Reactive**: Updates automatically when user logs in/out
- ✅ **Secure**: Tokens are validated on each API call

### 4. Error Handling
- ❌ **401 Unauthorized**: Automatically redirects to login
- ❌ **Token Expired**: Attempts refresh, then redirects to login
- ❌ **Invalid Credentials**: Shows error message

## 🚀 Usage in Components

### Check User Role
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  if (user?.role === 'admin') {
    return <div>Admin Panel</div>;
  }

  return <div>User Panel</div>;
}
```

### Conditional Rendering Based on Role
```typescript
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Show admin-only features */}
      {user?.role === 'admin' && (
        <div>
          <h2>Admin Features</h2>
          <button>Manage Users</button>
          <button>System Settings</button>
        </div>
      )}
      
      {/* Show for all users */}
      <div>
        <h2>User Features</h2>
        <button>View Profile</button>
      </div>
    </div>
  );
}
```

## ✅ Summary

### Current Implementation Status

✅ **Login API Integration**
- Endpoint: `POST /auth/login`
- Credentials: `emailOrUsername` + `password`
- Response: `accessToken` + `user.role`

✅ **Role Extraction**
- Automatically extracts from `data.user.role`
- Fallback to multiple locations
- Defaults to `'admin'` if not found

✅ **Authentication State**
- Stored in `AuthContext`
- Persisted in `localStorage`
- Available via `useAuth()` hook

✅ **Protected Routes**
- Checks `isAuthenticated`
- Role-based access ready (currently disabled)
- Easy to enable admin-only access

### Access Control

**Current Behavior:**
- ✅ Any authenticated user can access all pages
- ✅ Role is stored and available for use
- 🔒 Admin-only check is disabled

**To Enable Admin-Only Access:**
1. Open `src/components/ProtectedRoute.tsx`
2. Uncomment the role check (lines 19-21)
3. Only users with `role === 'admin'` can access protected routes

---

**Last Updated**: 2026-02-02  
**Version**: 3.0.0  
**API Base URL**: https://api.vipka.club

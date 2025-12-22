# Architecture Documentation

## Cấu trúc Codebase

Codebase được tổ chức theo mô hình module-based với phân quyền theo role.

### Cấu trúc thư mục

```
src/
├── modules/
│   ├── provider/          # Modules dành riêng cho Provider
│   │   └── pages/
│   │       ├── Dashboard.tsx
│   │       ├── GamesManagement.tsx
│   │       ├── OperatorsManagement.tsx
│   │       ├── Transactions.tsx
│   │       ├── WalletPayment.tsx
│   │       ├── PromotionsBonus.tsx
│   │       ├── Reports.tsx
│   │       ├── Analytics.tsx
│   │       ├── Monitoring.tsx
│   │       ├── RiskManagement.tsx
│   │       ├── ApiManagement.tsx
│   │       ├── Alerts.tsx
│   │       ├── AuditLogs.tsx
│   │       └── SystemSettings.tsx
│   └── operator/          # Modules dành riêng cho Operator
│       └── pages/
│           ├── Dashboard.tsx
│           ├── PlayersManagement.tsx
│           ├── Transactions.tsx
│           ├── WalletPayment.tsx
│           ├── PromotionsBonus.tsx
│           ├── Reports.tsx
│           ├── Analytics.tsx
│           ├── Monitoring.tsx
│           ├── RiskManagement.tsx
│           ├── Alerts.tsx
│           ├── AuditLogs.tsx
│           └── SystemSettings.tsx
├── guards/
│   └── RoleGuard.tsx      # Component bảo vệ routes theo role
├── routes/
│   └── getRoutesByRole.tsx # Function trả về routes dựa trên role
├── utils/
│   └── rolePermissions.ts  # Utility functions cho role-based permissions
├── components/             # Shared components
│   ├── auth/
│   ├── pages/             # (deprecated - đã chuyển sang modules)
│   └── ...
├── contexts/
│   └── AuthContext.tsx    # Authentication context với user role
└── ...
```

## Phân quyền theo Role

### Provider Role
Có quyền truy cập các pages trong `modules/provider/pages/`:
- ✅ Dashboard (Provider version)
- ✅ Games Management (chỉ Provider)
- ✅ Operators Management (chỉ Provider - quản lý các Operator)
- ✅ Transactions (Provider version)
- ✅ Wallet & Payment (Provider version)
- ✅ Promotions & Bonus (Provider version)
- ✅ Reports (Provider version)
- ✅ Analytics (Provider version)
- ✅ Monitoring (Provider version)
- ✅ Risk Management (Provider version)
- ✅ API Management (chỉ Provider)
- ✅ Alerts (Provider version)
- ✅ Audit Logs (Provider version)
- ✅ System Settings (Provider version)
- ❌ Players Management (chỉ Operator)

### Operator Role
Có quyền truy cập các pages trong `modules/operator/pages/`:
- ✅ Dashboard (Operator version)
- ✅ Players Management (Operator version)
- ✅ Transactions (Operator version)
- ✅ Wallet & Payment (Operator version)
- ✅ Promotions & Bonus (Operator version)
- ✅ Reports (Operator version)
- ✅ Analytics (Operator version)
- ✅ Monitoring (Operator version)
- ✅ Risk Management (Operator version)
- ✅ Alerts (Operator version)
- ✅ Audit Logs (Operator version)
- ✅ System Settings (Operator version)
- ❌ Games Management (chỉ Provider)
- ❌ API Management (chỉ Provider)

## Cách thêm Page mới

### 1. Thêm vào Provider Module
```typescript
// src/modules/provider/pages/NewProviderPage.tsx
const NewProviderPage = () => {
  return <div>New Provider Page</div>;
};
export default NewProviderPage;

// src/routes/getRoutesByRole.tsx
import NewProviderPage from '../modules/provider/pages/NewProviderPage';

// Thêm vào provider routes
if (role === 'provider') {
  return [
    // ...existing routes
    <Route key="newpage" path="/newpage" element={<NewProviderPage />} />,
  ];
}
```

### 2. Thêm vào Operator Module
```typescript
// src/modules/operator/pages/NewOperatorPage.tsx
const NewOperatorPage = () => {
  return <div>New Operator Page</div>;
};
export default NewOperatorPage;

// src/routes/getRoutesByRole.tsx
import NewOperatorPage from '../modules/operator/pages/NewOperatorPage';

// Thêm vào operator routes
if (role === 'operator') {
  return [
    // ...existing routes
    <Route key="newpage" path="/newpage" element={<NewOperatorPage />} />,
  ];
}
```

### 3. Thêm Menu Item vào Sidebar

```typescript
// src/utils/rolePermissions.ts
import { NewIcon } from 'lucide-react';

export const ALL_MENU_ITEMS: MenuItem[] = [
  // ...existing items
  { 
    id: 'newpage', 
    label: 'New Page', 
    path: '/dashboard/newpage', 
    roles: ['provider', 'operator'], // hoặc chỉ ['provider'] hoặc ['operator']
    icon: NewIcon 
  },
];
```

## Role Guard

Sử dụng `RoleGuard` để bảo vệ components/routes:

```typescript
import RoleGuard from '../guards/RoleGuard';

<RoleGuard allowedRoles={['provider']}>
  <ProtectedComponent />
</RoleGuard>
```

## Utilities

### Check Permission
```typescript
import { canAccessPath, getMenuItemsByRole } from '../utils/rolePermissions';

// Check if user can access a path
if (canAccessPath('/dashboard/games', user.role)) {
  // Allow access
}

// Get menu items for a role
const menuItems = getMenuItemsByRole('provider');
```

## Best Practices

1. **Tách biệt code theo role**: Mỗi role có module riêng với đầy đủ pages
2. **Giao diện theo role**: Provider và Operator có thể có giao diện khác nhau cho cùng một chức năng (ví dụ: Dashboard, Players Management)
3. **Shared components**: Đặt components dùng chung vào `components/`
4. **Permissions**: Luôn check permission trước khi render sensitive content
5. **Routes**: Sử dụng `getRoutesByRole` để load routes phù hợp với role
6. **Menu**: Cập nhật `rolePermissions.ts` khi thêm menu item mới - menu sẽ tự động filter theo role


import { 
  Home, 
  Building2 as VenueIcon,
  CreditCard,
  UserCog,
  Building2,
  Settings,
  Gift,
  FileText,
  TrendingUp,
  User,
  LucideIcon
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  translationKey: string; // Key for translation
}

/**
 * All menu items for admin portal
 * Note: label is used as fallback, actual label comes from translations
 * Since this is admin-only portal, no role filtering needed
 */
export const ALL_MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: Home, translationKey: 'menu.dashboard' },
  { id: 'venues', label: 'Venues Management', path: '/dashboard/clubs', icon: VenueIcon, translationKey: 'menu.venuesManagement' },
  { id: 'operators', label: 'Operators Management', path: '/dashboard/karaoke', icon: UserCog, translationKey: 'menu.operatorsManagement' },
  { id: 'provider-accounts', label: 'Provider Accounts Management', path: '/dashboard/massages', icon: Building2, translationKey: 'menu.providerAccountsManagement' },
  // { id: 'roles-permissions', label: 'Roles & Permissions Management', path: '/dashboard/roles-permissions', icon: Shield, translationKey: 'menu.rolesPermissionsManagement' },
  { id: 'transactions', label: 'Transactions', path: '/dashboard/transactions', icon: CreditCard, translationKey: 'menu.transactions' },
  // { id: 'wallet', label: 'Wallet & Payment', path: '/dashboard/wallet', icon: Wallet, translationKey: 'menu.walletPayment' },
  { id: 'promotions', label: 'Promotions & Bonus', path: '/dashboard/promotions', icon: Gift, translationKey: 'menu.promotionsBonus' },
  // { id: 'reports', label: 'Reports & Statistics', path: '/dashboard/reports', icon: BarChart3, translationKey: 'menu.reports' },
  { id: 'analytics', label: 'Performance Analytics', path: '/dashboard/analytics', icon: TrendingUp, translationKey: 'menu.analytics' },
  { id: 'articles', label: 'Articles Management', path: '/dashboard/articles', icon: FileText, translationKey: 'menu.articlesManagement' },
  { id: 'users', label: 'Users Management', path: '/dashboard/users', icon: User, translationKey: 'menu.usersManagement' },
  // { id: 'monitoring', label: 'Monitoring', path: '/dashboard/monitoring', icon: Activity, translationKey: 'menu.monitoring' },
  // { id: 'risk', label: 'Risk Management', path: '/dashboard/risk', icon: Shield, translationKey: 'menu.riskManagement' },
  // { id: 'api', label: 'API Management', path: '/dashboard/api', icon: Network, translationKey: 'menu.apiManagement' },
  // { id: 'alerts', label: 'Alerts & Warnings', path: '/dashboard/alerts', icon: AlertTriangle, translationKey: 'menu.alerts' },
  // { id: 'logs', label: 'Audit Logs', path: '/dashboard/logs', icon: FileText, translationKey: 'menu.auditLogs' },
  { id: 'settings', label: 'System Settings', path: '/dashboard/settings', icon: Settings, translationKey: 'menu.systemSettings' },
];

/**
 * Get all menu items (no role filtering needed for admin-only portal)
 * @param t - Translation function (optional, if not provided, returns items with default labels)
 */
export const getMenuItemsByRole = (_role?: any, t?: (key: string) => string): MenuItem[] => {
  // If translation function is provided, update labels
  if (t) {
    return ALL_MENU_ITEMS.map(item => ({
      ...item,
      label: t(item.translationKey) || item.label
    }));
  }
  
  return ALL_MENU_ITEMS;
};

/**
 * Check if a path exists in menu items (no role check needed)
 */
export const canAccessPath = (path: string, _role?: any): boolean => {
  const menuItem = ALL_MENU_ITEMS.find(item => item.path === path);
  return !!menuItem;
};


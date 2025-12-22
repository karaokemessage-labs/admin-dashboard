import { UserRole } from '../contexts/AuthContext';
import { 
  Home, 
  Gamepad2,
  CreditCard,
  Users,
  UserCog,
  Building2,
  BarChart3,
  Settings,
  Network,
  Gift,
  Shield,
  Wallet,
  FileText,
  Activity,
  TrendingUp,
  AlertTriangle,
  LucideIcon
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  roles: UserRole[]; // Roles that can access this menu item
  icon: LucideIcon;
  translationKey: string; // Key for translation
}

/**
 * All menu items with their role permissions and icons
 * Note: label is used as fallback, actual label comes from translations
 */
export const ALL_MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', roles: ['provider', 'operator'], icon: Home, translationKey: 'menu.dashboard' },
  { id: 'games', label: 'Games Management', path: '/dashboard/games', roles: ['provider'], icon: Gamepad2, translationKey: 'menu.gamesManagement' },
  { id: 'operators', label: 'Operators Management', path: '/dashboard/operators', roles: ['provider'], icon: UserCog, translationKey: 'menu.operatorsManagement' },
  { id: 'provider-accounts', label: 'Provider Accounts Management', path: '/dashboard/provider-accounts', roles: ['provider'], icon: Building2, translationKey: 'menu.providerAccountsManagement' },
  { id: 'roles-permissions', label: 'Roles & Permissions Management', path: '/dashboard/roles-permissions', roles: ['provider'], icon: Shield, translationKey: 'menu.rolesPermissionsManagement' },
  { id: 'players', label: 'Players Management', path: '/dashboard/players', roles: ['operator'], icon: Users, translationKey: 'menu.playersManagement' },
  { id: 'transactions', label: 'Transactions', path: '/dashboard/transactions', roles: ['provider', 'operator'], icon: CreditCard, translationKey: 'menu.transactions' },
  { id: 'wallet', label: 'Wallet & Payment', path: '/dashboard/wallet', roles: ['provider', 'operator'], icon: Wallet, translationKey: 'menu.walletPayment' },
  { id: 'promotions', label: 'Promotions & Bonus', path: '/dashboard/promotions', roles: ['provider', 'operator'], icon: Gift, translationKey: 'menu.promotionsBonus' },
  { id: 'reports', label: 'Reports & Statistics', path: '/dashboard/reports', roles: ['provider', 'operator'], icon: BarChart3, translationKey: 'menu.reports' },
  { id: 'analytics', label: 'Performance Analytics', path: '/dashboard/analytics', roles: ['provider', 'operator'], icon: TrendingUp, translationKey: 'menu.analytics' },
  { id: 'monitoring', label: 'Monitoring', path: '/dashboard/monitoring', roles: ['provider', 'operator'], icon: Activity, translationKey: 'menu.monitoring' },
  { id: 'risk', label: 'Risk Management', path: '/dashboard/risk', roles: ['provider', 'operator'], icon: Shield, translationKey: 'menu.riskManagement' },
  { id: 'api', label: 'API Management', path: '/dashboard/api', roles: ['provider'], icon: Network, translationKey: 'menu.apiManagement' },
  { id: 'alerts', label: 'Alerts & Warnings', path: '/dashboard/alerts', roles: ['provider', 'operator'], icon: AlertTriangle, translationKey: 'menu.alerts' },
  { id: 'logs', label: 'Audit Logs', path: '/dashboard/logs', roles: ['provider', 'operator'], icon: FileText, translationKey: 'menu.auditLogs' },
  { id: 'settings', label: 'System Settings', path: '/dashboard/settings', roles: ['provider', 'operator'], icon: Settings, translationKey: 'menu.systemSettings' },
];

/**
 * Get menu items accessible by a specific role
 * @param role - User role
 * @param t - Translation function (optional, if not provided, returns items with default labels)
 */
export const getMenuItemsByRole = (role: UserRole, t?: (key: string) => string): MenuItem[] => {
  const items = ALL_MENU_ITEMS.filter(item => item.roles.includes(role));
  
  // If translation function is provided, update labels
  if (t) {
    return items.map(item => ({
      ...item,
      label: t(item.translationKey) || item.label
    }));
  }
  
  return items;
};

/**
 * Check if a user role can access a specific path
 */
export const canAccessPath = (path: string, role: UserRole): boolean => {
  const menuItem = ALL_MENU_ITEMS.find(item => item.path === path);
  return menuItem ? menuItem.roles.includes(role) : false;
};


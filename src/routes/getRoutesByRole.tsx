import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { UserRole } from '../contexts/AuthContext';

// Provider pages
import ProviderDashboard from '../modules/provider/pages/Dashboard';
import ProviderTransactions from '../modules/provider/pages/Transactions';
import ProviderWalletPayment from '../modules/provider/pages/WalletPayment';
import ProviderReports from '../modules/provider/pages/Reports';
import ProviderAnalytics from '../modules/provider/pages/Analytics';
import ProviderMonitoring from '../modules/provider/pages/Monitoring';
import ProviderAlerts from '../modules/provider/pages/Alerts';
import ProviderAuditLogs from '../modules/provider/pages/AuditLogs';
import ProviderSystemSettings from '../modules/provider/pages/SystemSettings';
import GamesManagement from '../modules/provider/pages/GamesManagement';
import OperatorsManagement from '../modules/provider/pages/OperatorsManagement';
import ProviderAccountManagement from '../modules/provider/pages/ProviderAccountManagement';
import RolePermissionManagement from '../modules/provider/pages/RolePermissionManagement';
import ProviderPromotionsBonus from '../modules/provider/pages/PromotionsBonus';
import ProviderRiskManagement from '../modules/provider/pages/RiskManagement';
import ApiManagement from '../modules/provider/pages/ApiManagement';
import ProviderMyProfile from '../modules/provider/pages/MyProfile';
import ProviderUserSettings from '../modules/provider/pages/UserSettings';

// Operator pages
import OperatorDashboard from '../modules/operator/pages/Dashboard';
import OperatorTransactions from '../modules/operator/pages/Transactions';
import OperatorWalletPayment from '../modules/operator/pages/WalletPayment';
import OperatorReports from '../modules/operator/pages/Reports';
import OperatorAnalytics from '../modules/operator/pages/Analytics';
import OperatorMonitoring from '../modules/operator/pages/Monitoring';
import OperatorAlerts from '../modules/operator/pages/Alerts';
import OperatorAuditLogs from '../modules/operator/pages/AuditLogs';
import OperatorSystemSettings from '../modules/operator/pages/SystemSettings';
import OperatorPlayersManagement from '../modules/operator/pages/PlayersManagement';
import OperatorPromotionsBonus from '../modules/operator/pages/PromotionsBonus';
import OperatorRiskManagement from '../modules/operator/pages/RiskManagement';
import OperatorMyProfile from '../modules/operator/pages/MyProfile';
import OperatorUserSettings from '../modules/operator/pages/UserSettings';

/**
 * Get routes based on user role
 */
export const getRoutesByRole = (role: UserRole): ReactElement[] => {
  if (role === 'provider') {
    return [
      <Route key="dashboard" path="/" element={<ProviderDashboard />} />,
      <Route key="venues" path="/venues" element={<GamesManagement />} />,
      <Route key="operators" path="/operators" element={<OperatorsManagement />} />,
      <Route key="provider-accounts" path="/provider-accounts" element={<ProviderAccountManagement />} />,
      <Route key="roles-permissions" path="/roles-permissions" element={<RolePermissionManagement />} />,
      <Route key="transactions" path="/transactions" element={<ProviderTransactions />} />,
      <Route key="wallet" path="/wallet" element={<ProviderWalletPayment />} />,
      <Route key="promotions" path="/promotions" element={<ProviderPromotionsBonus />} />,
      <Route key="reports" path="/reports" element={<ProviderReports />} />,
      <Route key="analytics" path="/analytics" element={<ProviderAnalytics />} />,
      <Route key="monitoring" path="/monitoring" element={<ProviderMonitoring />} />,
      <Route key="risk" path="/risk" element={<ProviderRiskManagement />} />,
      <Route key="api" path="/api" element={<ApiManagement />} />,
      <Route key="alerts" path="/alerts" element={<ProviderAlerts />} />,
      <Route key="logs" path="/logs" element={<ProviderAuditLogs />} />,
      <Route key="settings" path="/settings" element={<ProviderSystemSettings />} />,
      <Route key="profile" path="/profile" element={<ProviderMyProfile />} />,
      <Route key="user-settings" path="/user-settings" element={<ProviderUserSettings />} />,
    ];
  } else if (role === 'operator') {
    return [
      <Route key="dashboard" path="/" element={<OperatorDashboard />} />,
      <Route key="customers" path="/customers" element={<OperatorPlayersManagement />} />,
      <Route key="transactions" path="/transactions" element={<OperatorTransactions />} />,
      <Route key="wallet" path="/wallet" element={<OperatorWalletPayment />} />,
      <Route key="promotions" path="/promotions" element={<OperatorPromotionsBonus />} />,
      <Route key="reports" path="/reports" element={<OperatorReports />} />,
      <Route key="analytics" path="/analytics" element={<OperatorAnalytics />} />,
      <Route key="monitoring" path="/monitoring" element={<OperatorMonitoring />} />,
      <Route key="risk" path="/risk" element={<OperatorRiskManagement />} />,
      <Route key="alerts" path="/alerts" element={<OperatorAlerts />} />,
      <Route key="logs" path="/logs" element={<OperatorAuditLogs />} />,
      <Route key="settings" path="/settings" element={<OperatorSystemSettings />} />,
      <Route key="profile" path="/profile" element={<OperatorMyProfile />} />,
      <Route key="user-settings" path="/user-settings" element={<OperatorUserSettings />} />,
    ];
  }

  return [];
};


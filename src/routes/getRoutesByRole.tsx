import { ReactElement } from 'react';
import { Route } from 'react-router-dom';

// Admin pages
import AdminDashboard from '../modules/admin/pages/Dashboard';
// import AdminTransactions from '../modules/admin/pages/Transactions';
// import AdminWalletPayment from '../modules/admin/pages/WalletPayment';
// import AdminReports from '../modules/admin/pages/Reports';
// import AdminAnalytics from '../modules/admin/pages/Analytics';
// import ArticlesManagement from '../modules/admin/pages/ArticlesManagement';
import UsersManagement from '../modules/admin/pages/UsersManagement';
import CommentsManagement from '../modules/admin/pages/CommentsManagement';
import RatingManagement from '../modules/admin/pages/RatingManagement';
import KYCManagement from '../modules/admin/pages/KYCManagement';
// import AdminMonitoring from '../modules/admin/pages/Monitoring';
// import AdminAlerts from '../modules/admin/pages/Alerts';
// import AdminAuditLogs from '../modules/admin/pages/AuditLogs';
import AdminSystemSettings from '../modules/admin/pages/SystemSettings';
import GamesManagement from '../modules/admin/pages/ClubsManagement';
import KaraokesManagement from '../modules/admin/pages/KaraokesManagement';
import MassagesManagement from '../modules/admin/pages/MassagesManagement';
import RolePermissionManagement from '../modules/admin/pages/RolePermissionManagement';
import KaraokeDetails from '../modules/admin/pages/KaraokeDetails';
import UserDetails from '../modules/admin/pages/UserDetails';
// import AdminPromotionsBonus from '../modules/admin/pages/PromotionsBonus';
// import AdminRiskManagement from '../modules/admin/pages/RiskManagement';
// import ApiManagement from '../modules/admin/pages/ApiManagement';
import AdminMyProfile from '../modules/admin/pages/MyProfile';
import AdminUserSettings from '../modules/admin/pages/UserSettings';
import HelpSupport from '../modules/admin/pages/HelpSupport';
import NotificationsManagement from '../modules/admin/pages/NotificationsManagement';
import FeedsManagement from '../modules/admin/pages/FeedsManagement';

/**
 * Get all routes for admin portal
 * Since this is admin-only portal, no role checking needed
 */
export const getRoutesByRole = (): ReactElement[] => {
  return [
    <Route key="dashboard" path="/" element={<AdminDashboard />} />,
    <Route key="venues" path="/clubs" element={<GamesManagement />} />,
    <Route key="operators" path="/karaoke" element={<KaraokesManagement />} />,
    <Route key="karaoke-details" path="/karaoke/:id" element={<KaraokeDetails />} />,
    <Route key="provider-accounts" path="/massages" element={<MassagesManagement />} />,
    <Route key="roles-permissions" path="/roles-permissions" element={<RolePermissionManagement />} />,
    // <Route key="transactions" path="/transactions" element={<AdminTransactions />} />,
    // <Route key="wallet" path="/wallet" element={<AdminWalletPayment />} />,
    // <Route key="promotions" path="/promotions" element={<AdminPromotionsBonus />} />,
    // <Route key="reports" path="/reports" element={<AdminReports />} />,
    // <Route key="analytics" path="/analytics" element={<AdminAnalytics />} />,
    // <Route key="articles" path="/articles" element={<ArticlesManagement />} />,
    <Route key="users" path="/users" element={<UsersManagement />} />,
    <Route key="user-details" path="/users/:id" element={<UserDetails />} />,
    <Route key="comments" path="/comments" element={<CommentsManagement />} />,
    <Route key="ratings" path="/ratings" element={<RatingManagement />} />,
    <Route key="notifications" path="/notifications" element={<NotificationsManagement />} />,
    <Route key="feeds" path="/feeds" element={<FeedsManagement />} />,
    <Route key="kyc" path="/kyc" element={<KYCManagement />} />,
    // <Route key="monitoring" path="/monitoring" element={<AdminMonitoring />} />,
    // <Route key="risk" path="/risk" element={<AdminRiskManagement />} />,
    // <Route key="api" path="/api" element={<ApiManagement />} />,
    // <Route key="alerts" path="/alerts" element={<AdminAlerts />} />,
    // <Route key="logs" path="/logs" element={<AdminAuditLogs />} />,
    <Route key="settings" path="/settings" element={<AdminSystemSettings />} />,
    <Route key="profile" path="/profile" element={<AdminMyProfile />} />,
    <Route key="user-settings" path="/user-settings" element={<AdminUserSettings />} />,
    <Route key="help-support" path="/help-support" element={<HelpSupport />} />,
  ];
};


import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PermissionProvider } from '@/core/authorization/PermissionContext';
import { OrganizationProvider } from '@/features/admin/organization/context/OrganizationContext';
import { FeatureFlagProvider } from '@/core/feature-flags/FeatureFlagContext';
import { DensityProvider } from '@/core/density/DensityContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Login } from '@/pages/auth/Login';
import { MfaVerification } from '@/pages/auth/MfaVerification';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { AppLayout } from '@/components/layout/AppLayout';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { PageLoadingFallback } from '@/shared/components/feedback/PageLoadingFallback';

// Lazy-loaded Feature Modules
const MissionControlPage = lazy(() =>
  import('@/features/mission-control').then((m) => ({ default: m.MissionControlPage }))
);
const ComponentSandbox = lazy(() =>
  import('@/pages/dev/ComponentSandbox').then((m) => ({ default: m.ComponentSandbox }))
);

// Operations
const DeviceListPage = lazy(() =>
  import('@/features/operations/devices/pages/DeviceListPage').then((m) => ({ default: m.DeviceListPage }))
);
const DeviceDetailPage = lazy(() =>
  import('@/features/operations/devices/pages/DeviceDetailPage').then((m) => ({ default: m.DeviceDetailPage }))
);
const MonitoringPage = lazy(() =>
  import('@/features/operations/monitoring/pages/MonitoringPage').then((m) => ({ default: m.MonitoringPage }))
);
const AlertsPage = lazy(() =>
  import('@/features/operations/alerts/pages/AlertsPage').then((m) => ({ default: m.AlertsPage }))
);
const DeploymentsPage = lazy(() =>
  import('@/features/operations/deployments/pages/DeploymentsPage').then((m) => ({ default: m.DeploymentsPage }))
);

// Content
const MediaLibraryPage = lazy(() =>
  import('@/features/content/media/pages/MediaLibraryPage').then((m) => ({ default: m.MediaLibraryPage }))
);
const PlaylistsPage = lazy(() =>
  import('@/features/content/playlists/pages/PlaylistsPage').then((m) => ({ default: m.PlaylistsPage }))
);
const PlaylistEditorPage = lazy(() =>
  import('@/features/content/playlists/pages/PlaylistEditorPage').then((m) => ({ default: m.PlaylistEditorPage }))
);
const SchedulingPage = lazy(() =>
  import('@/features/content/schedules/pages/SchedulingPage').then((m) => ({ default: m.SchedulingPage }))
);

// Marketing
const AdvertiserListPage = lazy(() =>
  import('@/features/marketing/advertisers/pages/AdvertiserListPage').then((m) => ({ default: m.AdvertiserListPage }))
);
const CampaignListPage = lazy(() =>
  import('@/features/marketing/campaigns/pages/CampaignListPage').then((m) => ({ default: m.CampaignListPage }))
);
const CampaignEditorPage = lazy(() =>
  import('@/features/marketing/campaigns/pages/CampaignEditorPage').then((m) => ({ default: m.CampaignEditorPage }))
);
const CampaignAssignmentPage = lazy(() =>
  import('@/features/marketing/assignments/pages/CampaignAssignmentPage').then((m) => ({ default: m.CampaignAssignmentPage }))
);
const CampaignReportPage = lazy(() =>
  import('@/features/marketing/reports/pages/CampaignReportPage').then((m) => ({ default: m.CampaignReportPage }))
);

// Analytics
const ReportsOverviewPage = lazy(() =>
  import('@/features/analytics/reports/pages/ReportsOverviewPage').then((m) => ({ default: m.ReportsOverviewPage }))
);
const ReportBuilderPage = lazy(() =>
  import('@/features/analytics/reports/pages/ReportBuilderPage').then((m) => ({ default: m.ReportBuilderPage }))
);
const FleetInsightsPage = lazy(() =>
  import('@/features/analytics/insights/pages/FleetInsightsPage').then((m) => ({ default: m.FleetInsightsPage }))
);
const PlaybackInsightsPage = lazy(() =>
  import('@/features/analytics/insights/pages/PlaybackInsightsPage').then((m) => ({ default: m.PlaybackInsightsPage }))
);
const UserMetricsPage = lazy(() =>
  import('@/features/analytics/metrics/pages/UserMetricsPage').then((m) => ({ default: m.UserMetricsPage }))
);

// Admin
const TeamDirectoryPage = lazy(() =>
  import('@/features/admin/team/pages/TeamDirectoryPage').then((m) => ({ default: m.TeamDirectoryPage }))
);
const RoleListPage = lazy(() =>
  import('@/features/admin/roles/pages/RoleListPage').then((m) => ({ default: m.RoleListPage }))
);
const RoleEditorPage = lazy(() =>
  import('@/features/admin/roles/pages/RoleEditorPage').then((m) => ({ default: m.RoleEditorPage }))
);
const OrganizationSettingsPage = lazy(() =>
  import('@/features/admin/organization/pages/OrganizationSettingsPage').then((m) => ({ default: m.OrganizationSettingsPage }))
);
const BillingPage = lazy(() =>
  import('@/features/admin/billing/pages/BillingPage').then((m) => ({ default: m.BillingPage }))
);
const AuditLogPage = lazy(() =>
  import('@/features/admin/audit/pages/AuditLogPage').then((m) => ({ default: m.AuditLogPage }))
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PermissionProvider>
          <OrganizationProvider>
            <FeatureFlagProvider>
              <DensityProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Routes>
                      {/* Public Auth Routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/login/mfa" element={<MfaVerification />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      
                      {/* Developer Sandbox */}
                      <Route path="/dev/components" element={<ComponentSandbox />} />

                      {/* Protected Dashboard Routes */}
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <AppLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route path="overview" element={<MissionControlPage />} />
                        
                        {/* Operations Routes */}
                        <Route path="operations/devices" element={<DeviceListPage />} />
                        <Route path="operations/devices/:id" element={<DeviceDetailPage />} />
                        <Route path="operations/monitoring" element={<MonitoringPage />} />
                        <Route path="operations/alerts" element={<AlertsPage />} />
                        <Route path="operations/deployments" element={<DeploymentsPage />} />
                        
                        {/* Content Routes */}
                        <Route path="content/media" element={<MediaLibraryPage />} />
                        <Route path="content/playlists" element={<PlaylistsPage />} />
                        <Route path="content/playlists/:id" element={<PlaylistEditorPage />} />
                        <Route path="content/schedules" element={<SchedulingPage />} />

                        {/* Marketing Routes */}
                        <Route path="marketing/campaigns" element={<CampaignListPage />} />
                        <Route path="marketing/campaigns/:id" element={<CampaignEditorPage />} />
                        <Route path="marketing/advertisers" element={<AdvertiserListPage />} />
                        <Route path="marketing/assignments" element={<CampaignAssignmentPage />} />
                        <Route path="marketing/reports" element={<CampaignReportPage />} />

                        {/* Analytics Routes */}
                        <Route path="analytics/reports" element={<ReportsOverviewPage />} />
                        <Route path="analytics/reports/new" element={<ReportBuilderPage />} />
                        <Route path="analytics/insights/fleet" element={<FleetInsightsPage />} />
                        <Route path="analytics/insights/playback" element={<PlaybackInsightsPage />} />
                        <Route path="analytics/insights" element={<Navigate to="fleet" replace />} />
                        <Route path="analytics/metrics" element={<UserMetricsPage />} />

                        {/* Admin Routes */}
                        <Route path="admin/team" element={<TeamDirectoryPage />} />
                        <Route path="admin/roles" element={<RoleListPage />} />
                        <Route path="admin/roles/:id" element={<RoleEditorPage />} />
                        <Route path="admin/organization" element={<OrganizationSettingsPage />} />
                        <Route path="admin/billing" element={<BillingPage />} />
                        <Route path="admin/audit" element={<AuditLogPage />} />

                        {/* Fallback for invalid subroutes */}
                        <Route
                          path="*"
                          element={
                            <div className="flex items-center justify-center h-full min-h-[400px] text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-[16px]">
                              Module under construction
                            </div>
                          }
                        />
                      </Route>

                      {/* Root fallback */}
                      <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </BrowserRouter>
            </DensityProvider>
          </FeatureFlagProvider>
          </OrganizationProvider>
        </PermissionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

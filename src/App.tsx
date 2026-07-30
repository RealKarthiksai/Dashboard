import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PermissionProvider } from '@/core/authorization/PermissionContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Login } from '@/pages/auth/Login';
import { MfaVerification } from '@/pages/auth/MfaVerification';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { AppLayout } from '@/components/layout/AppLayout';
import { MissionControlPage } from '@/features/mission-control';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PermissionProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/login/mfa" element={<MfaVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

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

                {/* Placeholders for future sprints */}
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
          </BrowserRouter>
        </PermissionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

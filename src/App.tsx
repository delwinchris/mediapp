import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { type ReactNode } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardPage } from '@/pages/app/DashboardPage';
import { RecoveryTrackerPage } from '@/pages/app/RecoveryTrackerPage';
import { MentalRecoveryPage } from '@/pages/app/MentalRecoveryPage';
import { MindRecoveryPage } from '@/pages/app/MindRecoveryPage';
import { ExerciseLibraryPage } from '@/pages/app/ExerciseLibraryPage';
import { ProgressPage } from '@/pages/app/ProgressPage';
import { AICoachPage } from '@/pages/app/AICoachPage';
import { ProfilePage } from '@/pages/app/ProfilePage';
import { AnalyticsPage } from '@/pages/app/AnalyticsPage';
import { AchievementsPage } from '@/pages/app/AchievementsPage';
import { SettingsPage } from '@/pages/app/SettingsPage';
import { CalendarPage } from '@/pages/app/CalendarPage';
import { ReportPage } from '@/pages/app/ReportPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (user.isNewUser) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user && !user.isNewUser) return <Navigate to="/app/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/app">
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="tracker" element={<ProtectedRoute><RecoveryTrackerPage /></ProtectedRoute>} />
        <Route path="mental" element={<ProtectedRoute><MentalRecoveryPage /></ProtectedRoute>} />
        <Route path="mind" element={<ProtectedRoute><MindRecoveryPage /></ProtectedRoute>} />
        <Route path="exercises" element={<ProtectedRoute><ExerciseLibraryPage /></ProtectedRoute>} />
        <Route path="progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="coach" element={<ProtectedRoute><AICoachPage /></ProtectedRoute>} />
        <Route path="analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
        <Route path="calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

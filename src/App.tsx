import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardSkeleton, ChartSkeleton, ChatSkeleton, ProfileSkeleton, ExerciseSkeleton, RecoverySkeleton } from '@/components/ui/Skeleton';
import { NotFoundPage } from '@/pages/ErrorPages';

const DashboardPage = lazy(() => import('@/pages/app/DashboardPage').then(m => ({ default: m.DashboardPage })));
const RecoveryTrackerPage = lazy(() => import('@/pages/app/RecoveryTrackerPage').then(m => ({ default: m.RecoveryTrackerPage })));
const MentalRecoveryPage = lazy(() => import('@/pages/app/MentalRecoveryPage').then(m => ({ default: m.MentalRecoveryPage })));
const MindRecoveryPage = lazy(() => import('@/pages/app/MindRecoveryPage').then(m => ({ default: m.MindRecoveryPage })));
const ExerciseLibraryPage = lazy(() => import('@/pages/app/ExerciseLibraryPage').then(m => ({ default: m.ExerciseLibraryPage })));
const ExerciseDetailPage = lazy(() => import('@/pages/app/ExerciseDetailPage').then(m => ({ default: m.ExerciseDetailPage })));
const ProgressPage = lazy(() => import('@/pages/app/ProgressPage').then(m => ({ default: m.ProgressPage })));
const AICoachPage = lazy(() => import('@/pages/app/AICoachPage').then(m => ({ default: m.AICoachPage })));
const ProfilePage = lazy(() => import('@/pages/app/ProfilePage').then(m => ({ default: m.ProfilePage })));
const AnalyticsPage = lazy(() => import('@/pages/app/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const AchievementsPage = lazy(() => import('@/pages/app/AchievementsPage').then(m => ({ default: m.AchievementsPage })));
const SettingsPage = lazy(() => import('@/pages/app/SettingsPage').then(m => ({ default: m.SettingsPage })));
const CalendarPage = lazy(() => import('@/pages/app/CalendarPage').then(m => ({ default: m.CalendarPage })));
const ReportPage = lazy(() => import('@/pages/app/ReportPage').then(m => ({ default: m.ReportPage })));
const NotificationsPage = lazy(() => import('@/pages/app/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const RecoveryPlanPage = lazy(() => import('@/pages/app/RecoveryPlanPage').then(m => ({ default: m.RecoveryPlanPage })));
const AdvancedInsightsPage = lazy(() => import('@/pages/app/AdvancedInsightsPage').then(m => ({ default: m.AdvancedInsightsPage })));

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

const skeletonMap: Record<string, ReactNode> = {
  '/app/dashboard': <DashboardSkeleton />,
  '/app/tracker': <RecoverySkeleton />,
  '/app/mental': <RecoverySkeleton />,
  '/app/mind': <RecoverySkeleton />,
  '/app/exercises': <ExerciseSkeleton />,
  '/app/progress': <ChartSkeleton />,
  '/app/analytics': <ChartSkeleton />,
  '/app/coach': <ChatSkeleton />,
  '/app/profile': <ProfileSkeleton />,
  '/app/plan': <ChartSkeleton />,
  '/app/insights': <ChartSkeleton />,
  '/app/achievements': <ChartSkeleton />,
  '/app/calendar': <ChartSkeleton />,
  '/app/report': <ChartSkeleton />,
  '/app/notifications': <ChartSkeleton />,
  '/app/settings': <ChartSkeleton />,
};

function AppRoutes() {
  const location = useLocation();
  const fallback = skeletonMap[location.pathname] ?? <DashboardSkeleton />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/app">
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute><Suspense fallback={fallback}><DashboardPage /></Suspense></ProtectedRoute>} />
        <Route path="tracker" element={<ProtectedRoute><Suspense fallback={fallback}><RecoveryTrackerPage /></Suspense></ProtectedRoute>} />
        <Route path="mental" element={<ProtectedRoute><Suspense fallback={fallback}><MentalRecoveryPage /></Suspense></ProtectedRoute>} />
        <Route path="mind" element={<ProtectedRoute><Suspense fallback={fallback}><MindRecoveryPage /></Suspense></ProtectedRoute>} />
        <Route path="exercises" element={<ProtectedRoute><Suspense fallback={fallback}><ExerciseLibraryPage /></Suspense></ProtectedRoute>} />
        <Route path="exercises/:id" element={<ProtectedRoute><Suspense fallback={fallback}><ExerciseDetailPage /></Suspense></ProtectedRoute>} />
        <Route path="progress" element={<ProtectedRoute><Suspense fallback={fallback}><ProgressPage /></Suspense></ProtectedRoute>} />
        <Route path="coach" element={<ProtectedRoute><Suspense fallback={fallback}><AICoachPage /></Suspense></ProtectedRoute>} />
        <Route path="analytics" element={<ProtectedRoute><Suspense fallback={fallback}><AnalyticsPage /></Suspense></ProtectedRoute>} />
        <Route path="achievements" element={<ProtectedRoute><Suspense fallback={fallback}><AchievementsPage /></Suspense></ProtectedRoute>} />
        <Route path="calendar" element={<ProtectedRoute><Suspense fallback={fallback}><CalendarPage /></Suspense></ProtectedRoute>} />
        <Route path="report" element={<ProtectedRoute><Suspense fallback={fallback}><ReportPage /></Suspense></ProtectedRoute>} />
        <Route path="notifications" element={<ProtectedRoute><Suspense fallback={fallback}><NotificationsPage /></Suspense></ProtectedRoute>} />
        <Route path="plan" element={<ProtectedRoute><Suspense fallback={fallback}><RecoveryPlanPage /></Suspense></ProtectedRoute>} />
        <Route path="insights" element={<ProtectedRoute><Suspense fallback={fallback}><AdvancedInsightsPage /></Suspense></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><Suspense fallback={fallback}><SettingsPage /></Suspense></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Suspense fallback={fallback}><ProfilePage /></Suspense></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
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

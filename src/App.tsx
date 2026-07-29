import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/app">
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tracker" element={<RecoveryTrackerPage />} />
          <Route path="mental" element={<MentalRecoveryPage />} />
          <Route path="mind" element={<MindRecoveryPage />} />
          <Route path="exercises" element={<ExerciseLibraryPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="coach" element={<AICoachPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

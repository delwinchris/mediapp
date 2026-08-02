# MediRecover

A premium healthcare recovery companion app that helps patients track their physical and mental recovery after injury or surgery.

## Overview

MediRecover transforms the post-injury recovery experience by combining daily tracking, AI-powered insights, gamified achievements, and beautiful analytics into one cohesive platform. Built for patients recovering from sports injuries, surgeries, and rehabilitation programs.

## Features

### Core Modules
- **Smart Home Dashboard** — Dynamic greeting, recovery day counter, daily motivational quote, recovery score ring, AI insight card, quick actions, continue recovery button, recent activity, upcoming milestones, today's checklist, and weekly progress summary
- **Recovery Tracker** — Daily logging of pain, mobility, sleep, energy, and mood with visual feedback
- **Mental Recovery** — Journal entries, mood check-ins, and mental wellbeing tracking
- **Mind Recovery** — Breathing exercises, mindfulness sessions, and guided meditation
- **Exercise Library** — Categorized exercises with professional detail pages including images, videos, descriptions, muscles targeted, equipment, difficulty, sets, reps, tips, common mistakes, and safety notes
- **AI Recovery Coach** — ChatGPT-style chat interface with typing animation, suggested prompts, timestamps, and medical disclaimer
- **Advanced Analytics** — 8 chart types (Pain, Mobility, Strength, Sleep, Anxiety, Confidence, Recovery Score, Exercise Consistency) with weekly/monthly/yearly views
- **AI Insights** — Premium insight cards with trend indicators and beautiful icons
- **Personalized Recovery Plan** — Mock plan based on injury, recovery stage, pain, and mobility with today's goals, weekly goals, milestones, and recovery timeline
- **Achievements** — XP system, badges, recovery levels, and progress tracking
- **Calendar** — Exercises, appointments, medication, and recovery milestones in one view
- **Recovery Report** — Printable report with scores, charts, mental and physical summaries, achievements, timeline, AI summary, and doctor notes placeholder
- **Notification Center** — Read/unread state, filtering, and notification types
- **Global Search** — Search across exercises, recovery logs, journal entries, milestones, and AI conversations
- **Profile** — Editable personal, recovery, medical, goals, achievements, statistics, notifications, and security sections
- **Settings** — Theme, notifications, privacy, accessibility, language, and data export

### UX Features
- **Empty States** — Elegant empty states with illustrations and calls to action
- **Loading States** — Skeleton loading components for dashboard, recovery, charts, exercises, AI chat, and profile
- **Error Pages** — 404, network error, and empty data pages with retry buttons
- **Accessibility** — Keyboard navigation, ARIA labels, high contrast support, reduced motion support, skip-to-content link, and improved focus states
- **Performance** — Lazy loading, code splitting, and reusable components

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Recharts** — Data visualization
- **Lucide React** — Icons
- **React Router** — Routing
- **Supabase** — Backend (auth, database, edge functions) — ready for integration

## Architecture

```
src/
├── components/
│   ├── layout/          # AppLayout, Sidebar, Topbar, Footer, LandingNav, AuthLayout
│   └── ui/              # Reusable UI: Button, Card, Input, Logo, RecoveryRing, 
│                        # PageHeader, Section, BreathingModal, EmptyState, Skeleton
├── lib/
│   ├── analytics.ts     # Recovery score computation and data series
│   ├── auth.tsx         # Auth context and provider
│   ├── cn.ts            # Class name utility
│   ├── mockData.ts      # All mock data (ready for Supabase replacement)
│   └── types.ts         # TypeScript interfaces
├── pages/
│   ├── app/             # Authenticated app pages
│   ├── auth/            # Login, Signup, Forgot Password
│   ├── ErrorPages.tsx   # 404, Network Error, Empty Data
│   ├── LandingPage.tsx  # Marketing landing page
│   └── OnboardingPage.tsx
└── App.tsx              # Routes with lazy loading
```

## Installation

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run typecheck # Type checking
```

## Roadmap

### Phase 1 (Current) — Mock Data
- All features functional with mock data
- Full UI/UX polish
- Accessibility compliance
- Performance optimization

### Phase 2 — Supabase Integration
- Replace mock data with Supabase database
- User authentication (email/password)
- Real-time data sync
- Row-level security policies
- Cloud storage for exercise images/videos

### Phase 3 — AI Integration
- Connect AI Coach to Gemini/OpenAI API
- Real AI-generated insights based on user data
- Personalized recovery recommendations
- Natural language recovery queries

### Phase 4 — Advanced Features
- Wearable device integration (Apple Health, Google Fit)
- Physiotherapist dashboard
- Video call appointments
- Push notifications
- Multi-language support
- Offline mode

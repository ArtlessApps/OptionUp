import { useState, useEffect } from 'react';
import { LessonFlow } from './components/containers/LessonFlow';
import { SkillTree } from './components/containers/SkillTree';
import { StatsPanel } from './components/containers/StatsPanel';
import { LandingPage } from './components/screens/LandingPage';
import { AuthScreen } from './components/screens/AuthScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { UpgradeScreen } from './components/screens/UpgradeScreen';
import { PaywallScreen } from './components/screens/PaywallScreen';
import { useLessons } from './lib/LessonContext';
import { useAuth } from './lib/AuthContext';
import { useSubscription, isLessonLocked } from './lib/SubscriptionContext';
import { useNotification } from './lib/notificationContext';
import './index.css';

type AppView = 'landing' | 'home' | 'lesson' | 'completed' | 'auth' | 'profile' | 'upgrade' | 'paywall';

function App() {
  const {
    modules,
    currentLesson,
    currentLessonMetadata,
    totalXP,
    totalLessons,
    completedLessons,
    currentStreak,
    isLoading,
    isLoadingLesson,
    loadLesson,
    completeLesson,
    goToNextLesson,
    setErrorCallbacks,
  } = useLessons();

  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  const { showNotification } = useNotification();

  const [view, setView] = useState<AppView>('landing');
  const [pendingLesson, setPendingLesson] = useState<{ id: string; number: number } | null>(null);

  // Set up error callbacks for sync and lesson loading errors
  useEffect(() => {
    setErrorCallbacks(
      // Sync error callback
      (error) => {
        showNotification(error);
      },
      // Lesson load error callback
      (error) => {
        showNotification(error);
      }
    );
  }, [setErrorCallbacks, showNotification]);

  // If user is already authenticated, skip landing page
  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthenticated) {
        if (view === 'landing' || view === 'auth') {
          setView('home');
        }
      } else {
        // Not authenticated - they can see landing page but that's it
        if (view === 'home' || view === 'lesson') {
          setView('landing');
        }
      }
    }
  }, [isAuthLoading, isAuthenticated]);

  const handleLessonClick = (lessonId: string, lessonNumber: number) => {
    // Check if lesson is locked
    if (isLessonLocked(lessonNumber, hasActiveSubscription)) {
      setPendingLesson({ id: lessonId, number: lessonNumber });
      
      // Show auth if not authenticated, otherwise show paywall/upgrade
      if (!isAuthenticated) {
        setView('auth');
      } else {
        setView('paywall');
      }
      return;
    }

    // Lesson is accessible
    loadLesson(lessonId);
    setView('lesson');
  };

  // Loading state
  if (isLoading || isAuthLoading) {
    const loadingMessage = isAuthLoading ? 'Setting up your account...' : 'Loading your lessons...';
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{loadingMessage}</h1>
          <p className="text-gray-600">This will just take a moment</p>
        </div>
      </div>
    );
  }

  // Landing page (first thing visitors see)
  if (view === 'landing' && !isAuthenticated) {
    return <LandingPage onGetStarted={() => setView('auth')} />;
  }

  // Auth screen (after clicking "Get Started")
  if (view === 'auth') {
    return (
      <AuthScreen
        onSuccess={() => {
          // After successful auth, if there's a pending lesson, show paywall/upgrade
          if (pendingLesson) {
            setView('paywall');
          } else {
            setView('home');
          }
        }}
      />
    );
  }

  // Profile screen
  if (view === 'profile') {
    return (
      <ProfileScreen
        onClose={() => setView('home')}
        onUpgrade={() => setView('upgrade')}
      />
    );
  }

  // Upgrade screen
  if (view === 'upgrade') {
    return (
      <UpgradeScreen
        onClose={() => setView(isAuthenticated ? 'profile' : 'home')}
      />
    );
  }

  // Paywall screen
  if (view === 'paywall' && pendingLesson) {
    return (
      <PaywallScreen
        lessonTitle={modules
          .flatMap((m) => m.lessons)
          .find((l) => l.id === pendingLesson.id)?.title}
        onUpgrade={() => setView('upgrade')}
        onBack={() => {
          setPendingLesson(null);
          setView('home');
        }}
      />
    );
  }

  // Lesson completion view
  if (view === 'completed' && currentLessonMetadata) {
    // Get the actual earned XP from the current lesson metadata (refreshed after completion)
    const displayXP = currentLessonMetadata.totalXP;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-warning/20 to-yellow-100 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Lesson Complete!
          </h1>
          <p className="text-gray-700 mb-2 text-lg">
            <strong>{currentLessonMetadata.title}</strong>
          </p>
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
            <p className="text-warning font-bold text-5xl mb-2">
              +{displayXP} XP
            </p>
            <p className="text-gray-600">Total: {totalXP} XP</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={async () => {
                await goToNextLesson();
                setView('lesson');
              }}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 shadow-lg transition-all transform hover:scale-105"
            >
              Next Lesson →
            </button>
            <button
              onClick={() => setView('home')}
              className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 shadow transition-all"
            >
              Back to Path
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lesson flow view
  if (view === 'lesson' && currentLesson) {
    if (isLoadingLesson) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">⏳</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Preparing your lesson...</h1>
            <p className="text-gray-600">Getting everything ready</p>
          </div>
        </div>
      );
    }

    return (
      <LessonFlow
        lesson={currentLesson}
        onComplete={() => {
          // Extract XP from celebration screen
          const celebrationScreen = currentLesson.screens.find(
            (s): s is Extract<typeof s, { screen_type: 'celebration' }> => s.screen_type === 'celebration'
          );
          const earnedXP = celebrationScreen?.xp_earned || currentLesson.total_xp || 0;
          
          console.log('Lesson completion:', {
            lessonId: currentLesson.lesson_id,
            earnedXP,
            celebrationScreenXP: celebrationScreen?.xp_earned,
            rootLevelXP: currentLesson.total_xp,
          });
          
          // Mark lesson as complete with correct XP
          completeLesson(currentLesson.lesson_id, earnedXP);
          setView('completed');
        }}
      />
    );
  }

  // Home view - Duolingo-style skill tree
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">OptionUp</h1>
            <span className="px-3 py-1 bg-warning/20 text-warning text-xs font-bold rounded-full">
              BETA
            </span>
          </div>
          
          {/* Quick stats in header */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-sm font-semibold text-gray-700">{currentStreak} day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-sm font-semibold text-gray-700">{totalXP} XP</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Premium Badge or Upgrade Button */}
            {isAuthenticated && hasActiveSubscription ? (
              <span className="px-3 py-1 bg-gradient-to-r from-warning to-yellow-500 text-white text-xs font-bold rounded-full">
                ⭐ PREMIUM
              </span>
            ) : (
              <button
                onClick={() => setView('upgrade')}
                className="px-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-bold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all"
              >
                Upgrade
              </button>
            )}
            
            {/* Auth/Profile Button */}
            {isAuthenticated ? (
              <button
                onClick={() => setView('profile')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setView('auth')}
                className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Sign In
              </button>
            )}
            
            {/* Reset Progress Button (for testing) */}
            <button
              onClick={() => {
                if (window.confirm('Reset all progress? This cannot be undone.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Reset Progress"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main content - 2 column layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Left: Skill Tree (main content) */}
        <main className="flex-1 lg:max-w-3xl">
          <div className="py-8">
            {/* Mobile stats (show above skill tree on small screens) */}
            <div className="lg:hidden px-6 mb-6">
              <StatsPanel
                totalXP={totalXP}
                currentStreak={currentStreak}
                completedLessons={completedLessons}
                totalLessons={totalLessons}
              />
            </div>
            
            {/* Module title */}
            <div className="text-center mb-8 px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Path</h2>
              <p className="text-gray-600">Master options trading step by step</p>
            </div>
            
            {/* Skill Tree */}
            <SkillTree
              modules={modules}
              onLessonClick={handleLessonClick}
              hasActiveSubscription={hasActiveSubscription}
            />
          </div>
        </main>

        {/* Right: Stats Panel (desktop only) */}
        <aside className="hidden lg:block w-96 sticky top-20 h-screen overflow-y-auto">
          <StatsPanel
            totalXP={totalXP}
            currentStreak={currentStreak}
            completedLessons={completedLessons}
            totalLessons={totalLessons}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;

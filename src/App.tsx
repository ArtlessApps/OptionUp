import { useState } from 'react';
import { LessonFlow } from './components/containers/LessonFlow';
import { SkillTree } from './components/containers/SkillTree';
import { StatsPanel } from './components/containers/StatsPanel';
import { useLessons } from './lib/LessonContext';
import './index.css';

type AppView = 'home' | 'lesson' | 'completed';

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
  } = useLessons();

  const [view, setView] = useState<AppView>('home');

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <h1 className="text-2xl font-bold text-gray-900">Loading lessons...</h1>
        </div>
      </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Loading lesson...</h1>
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
              Reset Progress
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
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
              onLessonClick={(lessonId) => {
                loadLesson(lessonId);
                setView('lesson');
              }}
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

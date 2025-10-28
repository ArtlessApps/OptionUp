import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Lesson, Screen } from '../../types/lesson.types';
import { ProgressBar } from '../atomic/ProgressBar';
import { HookScreen } from '../screens/HookScreen';
import { DefinitionScreen } from '../screens/DefinitionScreen';
import { AnalogyScreen } from '../screens/AnalogyScreen';
import { KeyTermsScreen } from '../screens/KeyTermsScreen';
import { MultipleChoiceScreen } from '../screens/MultipleChoiceScreen';
import { ScenarioScreen } from '../screens/ScenarioScreen';
import { SummaryCardsScreen } from '../screens/SummaryCardsScreen';
import { CelebrationScreen } from '../screens/CelebrationScreen';

interface LessonFlowProps {
  lesson: Lesson;
  onComplete: () => void;
}

export function LessonFlow({ lesson, onComplete }: LessonFlowProps) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  
  const currentScreen = lesson.screens[currentScreenIndex];
  const totalScreens = lesson.screens.length;
  
  const handleContinue = () => {
    if (currentScreenIndex < totalScreens - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
    } else {
      onComplete();
    }
  };
  
  const handleXPEarned = (xp: number) => {
    setTotalXP(totalXP + xp);
  };
  
  const renderScreen = (screen: Screen) => {
    switch (screen.screen_type) {
      case 'hook':
        return <HookScreen data={screen} onContinue={handleContinue} />;
      
      case 'definition':
        return <DefinitionScreen data={screen} onContinue={handleContinue} />;
      
      case 'analogy':
        return <AnalogyScreen data={screen} onContinue={handleContinue} />;
      
      case 'key_terms':
        return <KeyTermsScreen data={screen} onContinue={handleContinue} />;
      
      case 'multiple_choice':
        return (
          <MultipleChoiceScreen
            data={screen}
            onContinue={handleContinue}
            onXPEarned={handleXPEarned}
          />
        );
      
      case 'scenario':
        return (
          <ScenarioScreen
            data={screen}
            onContinue={handleContinue}
            onXPEarned={handleXPEarned}
          />
        );
      
      case 'summary_cards':
        return <SummaryCardsScreen data={screen} onContinue={handleContinue} />;
      
      case 'celebration':
        return <CelebrationScreen data={screen} onContinue={handleContinue} />;
      
      default:
        return <div>Unknown screen type</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                if (window.confirm('Exit lesson? Progress will be lost.')) {
                  onComplete();
                }
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                {currentScreenIndex + 1} / {totalScreens}
              </span>
              {totalXP > 0 && (
                <span className="text-sm font-bold text-warning">
                  ⭐ {totalXP} XP
                </span>
              )}
            </div>
          </div>
          
          <ProgressBar current={currentScreenIndex + 1} total={totalScreens} />
        </div>
      </div>
      
      {/* Screen content */}
      <div className="flex-1 flex items-stretch">
        <div className="w-full max-w-2xl mx-auto flex">
          <AnimatePresence mode="wait">
            <div key={currentScreenIndex} className="w-full h-full">
              {renderScreen(currentScreen)}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

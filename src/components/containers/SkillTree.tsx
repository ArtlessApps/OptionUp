import { LessonNode } from '../atomic/LessonNode';
import type { ModuleMetadata } from '../../types/lesson.types';
import { isLessonLocked } from '../../lib/SubscriptionContext';

interface SkillTreeProps {
  modules: ModuleMetadata[];
  onLessonClick: (lessonId: string, lessonNumber: number) => void;
  hasActiveSubscription: boolean;
}

export function SkillTree({ modules, onLessonClick, hasActiveSubscription }: SkillTreeProps) {
  // Flatten all lessons for the skill tree
  const allLessons = modules.flatMap((module) => module.lessons);
  
  // Find the first incomplete lesson index for sequential locking
  const firstIncompleteIndex = allLessons.findIndex((lesson) => !lesson.isCompleted);
  const unlockedUpToIndex = firstIncompleteIndex === -1 ? allLessons.length : firstIncompleteIndex + 1;
  
  return (
    <div className="relative py-12 px-8 flex flex-col items-center gap-8">
      {/* Vertical path line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 -z-10" />
      
      {allLessons.map((lesson, index) => {
        const lessonNumber = index + 1; // 1-indexed
        const isSequentiallyLocked = index >= unlockedUpToIndex;
        const isPremiumLocked = isLessonLocked(lessonNumber, hasActiveSubscription);
        const isLocked = isSequentiallyLocked || isPremiumLocked;
        
        return (
          <div key={lesson.id} className="relative">
            {/* Path connector dots */}
            {index > 0 && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full" />
            )}
            
            {/* Module separator banner */}
            {index > 0 && lesson.moduleNumber !== allLessons[index - 1].moduleNumber && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 text-center">
                <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg text-sm font-bold">
                  Module {lesson.moduleNumber} {isPremiumLocked && !hasActiveSubscription && '🔒'}
                </div>
              </div>
            )}
            
            {/* Lesson node */}
            <LessonNode
              lesson={lesson}
              isLocked={isLocked}
              isPremium={isPremiumLocked}
              onClick={() => onLessonClick(lesson.id, lessonNumber)}
            />
          </div>
        );
      })}
      
      {/* Bottom completion indicator */}
      {allLessons.every((l) => l.isCompleted) && (
        <div className="mt-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-warning">All Lessons Complete!</h2>
          <p className="text-gray-600">You're an options trading master!</p>
        </div>
      )}
    </div>
  );
}


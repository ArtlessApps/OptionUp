import { motion } from 'framer-motion';
import type { LessonMetadata } from '../../types/lesson.types';

interface LessonNodeProps {
  lesson: LessonMetadata;
  isLocked: boolean;
  isPremium?: boolean;
  onClick: () => void;
}

// Fun emoji icons for different lesson numbers (rotate through)
const LESSON_ICONS = ['📊', '📈', '💰', '🎯', '⚡', '🔥', '💎', '🚀', '⭐', '🎓'];

export function LessonNode({ lesson, isLocked, isPremium = false, onClick }: LessonNodeProps) {
  const icon = LESSON_ICONS[lesson.lessonNumber % LESSON_ICONS.length];
  
  // Determine node state
  const isCompleted = lesson.isCompleted;
  
  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={onClick}
        disabled={isLocked && !isPremium}
        className="relative"
        whileHover={isLocked && !isPremium ? {} : { scale: 1.05 }}
        whileTap={isLocked && !isPremium ? {} : { scale: 0.95 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer progress ring (for active lessons) */}
        {!isCompleted && !isLocked && (
          <svg className="absolute inset-0 w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#FCD34D"
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset="100"
              className="animate-pulse"
            />
          </svg>
        )}
        
        {/* Main lesson circle */}
        <div
          className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all ${
            isCompleted
              ? 'bg-gradient-to-br from-warning to-yellow-600 border-4 border-yellow-400'
              : isLocked && isPremium
              ? 'bg-gradient-to-br from-warning/30 to-yellow-600/30 border-4 border-yellow-400/50 cursor-pointer'
              : isLocked
              ? 'bg-gray-300 border-4 border-gray-400 opacity-50 cursor-not-allowed'
              : 'bg-gradient-to-br from-primary-500 to-primary-700 border-4 border-primary-300'
          }`}
        >
          {isCompleted ? (
            <span className="text-white text-4xl">✓</span>
          ) : isLocked && isPremium ? (
            <span className="text-yellow-700 text-2xl">⭐</span>
          ) : isLocked ? (
            <span className="text-gray-500 text-2xl">🔒</span>
          ) : (
            <span>{icon}</span>
          )}
        </div>
        
        {/* Premium badge */}
        {isPremium && !isCompleted && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-warning to-yellow-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
            <span className="text-white text-xs">⭐</span>
          </div>
        )}
        
        {/* Completion star badge */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-md"
          >
            <span className="text-white text-sm font-bold">{lesson.lessonNumber}</span>
          </motion.div>
        )}
        
        {/* XP badge for completed lessons */}
        {isCompleted && lesson.earnedXP > 0 && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md border-2 border-warning">
            <span className="text-xs font-bold text-warning">+{lesson.earnedXP}</span>
          </div>
        )}
      </motion.button>
      
      {/* Lesson title */}
      <div className="mt-3 text-center max-w-[120px]">
        <p className={`text-sm font-bold ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
          {lesson.title}
        </p>
        {!isLocked && (
          <p className="text-xs text-gray-500 mt-1">
            ⏱️ {lesson.estimatedTime}
          </p>
        )}
      </div>
    </div>
  );
}


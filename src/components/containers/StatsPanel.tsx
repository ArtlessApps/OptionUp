import { motion } from 'framer-motion';

interface StatsPanelProps {
  totalXP: number;
  currentStreak: number;
  completedLessons: number;
  totalLessons: number;
  dailyGoalXP?: number;
  earnedTodayXP?: number;
}

export function StatsPanel({
  totalXP,
  currentStreak,
  completedLessons,
  totalLessons,
  dailyGoalXP = 50,
  earnedTodayXP = 0,
}: StatsPanelProps) {
  const dailyProgress = Math.min((earnedTodayXP / dailyGoalXP) * 100, 100);
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  // Calculate hours left in day
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const hoursLeft = Math.max(0, Math.ceil((endOfDay.getTime() - now.getTime()) / (1000 * 60 * 60)));
  
  return (
    <div className="space-y-6 p-6">
      {/* Crown Level / Total XP */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg p-6"
      >
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Crown Level</h3>
        <div className="flex flex-col items-center">
          <div className="relative">
            <span className="text-7xl">👑</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white drop-shadow-lg mt-6">
                {Math.floor(totalXP / 50)}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{totalXP} Total XP</p>
        </div>
      </motion.div>
      
      {/* Daily Goal */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600">Daily Goal</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center justify-center mb-4">
          {/* Circular progress */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#FCD34D"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="339.292"
                initial={{ strokeDashoffset: 339.292 }}
                animate={{ strokeDashoffset: 339.292 - (339.292 * dailyProgress) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-warning">{earnedTodayXP}/{dailyGoalXP}</span>
              <span className="text-xs text-gray-500">xp gained</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-800">{currentStreak}</div>
            <div className="text-gray-500">day streak 🔥</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-800">{hoursLeft}</div>
            <div className="text-gray-500">hours left</div>
          </div>
        </div>
        
        {/* Week progress dots */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
              const dayOfWeek = now.getDay();
              const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert Sunday=0 to Sunday=6
              const isCompleted = index < adjustedDay || (index === adjustedDay && earnedTodayXP >= dailyGoalXP);
              
              return (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-400 mb-1">{day}</div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isCompleted ? 'bg-warning' : 'bg-gray-200'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
      
      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-lg p-6"
      >
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Overall Progress</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Lessons Completed</span>
              <span className="font-bold text-gray-800">{completedLessons}/{totalLessons}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="text-center pt-2">
            <span className="text-3xl font-bold text-primary-600">{completionPercentage}%</span>
            <p className="text-xs text-gray-500 mt-1">Course Completion</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


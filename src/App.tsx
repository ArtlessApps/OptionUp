import { useState } from 'react';
import { LessonFlow } from './components/containers/LessonFlow';
import lessonData from './content/lessons/option_fundamentals.json';
import type { Lesson } from './types/lesson.types';
import './index.css';

function App() {
  const [lessonStarted, setLessonStarted] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  const lesson = lessonData as Lesson;
  
  if (lessonCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Lesson Complete!
          </h1>
          <p className="text-gray-600 mb-8">
            Great job completing "{lesson.title}"
          </p>
          <button
            onClick={() => {
              setLessonCompleted(false);
              setLessonStarted(false);
            }}
            className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-primary-700"
          >
            Restart Lesson
          </button>
        </div>
      </div>
    );
  }
  
  if (!lessonStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {lesson.title}
          </h1>
          <p className="text-gray-600 mb-2">
            Module 1: Fundamentals
          </p>
          <p className="text-sm text-gray-500 mb-8">
            ⏱️ {lesson.estimated_time}
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              What you'll learn:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>What options contracts are</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>Key terminology (premium, strike, expiration)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>How to calculate profit/loss</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>Your maximum risk</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => setLessonStarted(true)}
            className="w-full bg-primary-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary-700 transition-colors"
          >
            Start Lesson →
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <LessonFlow
      lesson={lesson}
      onComplete={() => setLessonCompleted(true)}
    />
  );
}

export default App;

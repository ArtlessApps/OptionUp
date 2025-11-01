import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import { XPBadge } from '../atomic/XPBadge';
import type { CalculationScreen as CalculationScreenType } from '../../types/lesson.types';

interface CalculationScreenProps {
  data: CalculationScreenType;
  onContinue: () => void;
  onXPEarned: (xp: number) => void;
}

export function CalculationScreen({ data, onContinue, onXPEarned }: CalculationScreenProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Normalize answer by removing common formatting (spaces, $, commas)
  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .replace(/[\s$,]/g, '')
      .trim();
  };
  
  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(data.answer);
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsCorrect(correct);
    setHasAnswered(true);
    
    if (correct) {
      onXPEarned(data.xp_reward);
    }
  };
  
  const handleContinue = () => {
    if (!isCorrect) {
      // Reset for retry
      setUserAnswer('');
      setHasAnswered(false);
      setIsCorrect(false);
    } else {
      onContinue();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !hasAnswered && userAnswer.trim()) {
      handleSubmit();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-2xl overflow-y-auto">
        {data.headline && (
          <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
            {data.headline}
          </h2>
        )}
        
        <p className="text-lg text-gray-700 mb-6 text-center">
          {data.question}
        </p>
        
        {/* Input field */}
        <div className="w-full max-w-md mb-6">
          <motion.input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={hasAnswered}
            placeholder="Enter your answer..."
            className={`w-full px-6 py-4 text-xl text-center font-semibold rounded-2xl border-2 transition-all ${
              hasAnswered
                ? isCorrect
                  ? 'border-success bg-success/10 text-success'
                  : 'border-error bg-error/10 text-error'
                : 'border-gray-300 bg-white focus:border-primary-500 focus:outline-none'
            }`}
            autoFocus
            animate={!isCorrect && hasAnswered ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <Card
                className={isCorrect ? 'bg-success/10 border-2 border-success' : 'bg-warning/10 border-2 border-warning'}
                padding="md"
              >
                {isCorrect && (
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">🎉</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">Correct!</h3>
                        <p className="text-gray-700 text-sm">{data.explanation}</p>
                      </div>
                      <XPBadge amount={data.xp_reward} animate />
                    </div>
                    
                    {data.teaching_point && (
                      <div className="mt-4 pt-4 border-t border-success/20">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">💡</span>
                          <p className="text-sm text-gray-700 italic">
                            {data.teaching_point}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {!isCorrect && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💭</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">Not quite...</h3>
                      <p className="text-gray-700 text-sm mb-2">{data.explanation}</p>
                      <p className="text-sm text-gray-600">
                        Expected answer: <span className="font-semibold">{data.answer}</span>
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="w-full">
        {!hasAnswered ? (
          <Button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            fullWidth
          >
            Check answer
          </Button>
        ) : (
          <Button
            onClick={handleContinue}
            variant={isCorrect ? 'success' : 'secondary'}
            fullWidth
          >
            {isCorrect ? 'Continue →' : 'Try again'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import { XPBadge } from '../atomic/XPBadge';
import type { MultipleChoiceScreen as MultipleChoiceScreenType } from '../../types/lesson.types';

interface MultipleChoiceScreenProps {
  data: MultipleChoiceScreenType;
  onContinue: () => void;
  onXPEarned: (xp: number) => void;
}

export function MultipleChoiceScreen({ data, onContinue, onXPEarned }: MultipleChoiceScreenProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === data.correct;
    setIsCorrect(correct);
    setHasAnswered(true);
    
    if (correct) {
      onXPEarned(data.xp_reward);
    }
  };
  
  const handleContinue = () => {
    if (!isCorrect) {
      // Reset for retry
      setSelectedOption(null);
      setHasAnswered(false);
      setIsCorrect(false);
    } else {
      onContinue();
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
        <h2 className="text-xl font-bold mb-6 text-gray-900 text-center">
          {data.question}
        </h2>
        
        <div className="w-full space-y-3 mb-6">
          {data.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectAnswer = index === data.correct;
            const showCorrect = hasAnswered && isCorrectAnswer;
            const showIncorrect = hasAnswered && isSelected && !isCorrect;
            
            let bgColor = 'bg-white hover:bg-gray-50';
            let borderColor = 'border-2 border-gray-200';
            
            if (isSelected && !hasAnswered) {
              bgColor = 'bg-primary-50';
              borderColor = 'border-2 border-primary-500';
            }
            
            if (showCorrect) {
              bgColor = 'bg-success/10';
              borderColor = 'border-2 border-success';
            }
            
            if (showIncorrect) {
              bgColor = 'bg-error/10';
              borderColor = 'border-2 border-error';
            }
            
            return (
              <motion.div
                key={index}
                whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
                animate={showIncorrect ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card
                  onClick={() => handleOptionSelect(index)}
                  className={`${bgColor} ${borderColor} ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  padding="md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium flex-1">{option}</span>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showIncorrect && <span className="text-2xl">✗</span>}
                  </div>
                </Card>
              </motion.div>
            );
          })}
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
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">🎉</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">Perfect!</h3>
                      <p className="text-gray-700 text-sm">{data.explanation_correct}</p>
                    </div>
                    <XPBadge amount={data.xp_reward} animate />
                  </div>
                )}
                
                {!isCorrect && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💭</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">Not quite...</h3>
                      <p className="text-gray-700 text-sm">{data.explanation_wrong}</p>
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
            disabled={selectedOption === null}
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

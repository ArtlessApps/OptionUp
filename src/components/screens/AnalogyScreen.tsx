import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import type { AnalogyScreen as AnalogyScreenType } from '../../types/lesson.types';

interface AnalogyScreenProps {
  data: AnalogyScreenType;
  onContinue: () => void;
}

export function AnalogyScreen({ data, onContinue }: AnalogyScreenProps) {
  const [revealedSections, setRevealedSections] = useState<number[]>([]);
  const allRevealed = revealedSections.length === data.reveal_sections.length;
  
  const handleReveal = (index: number) => {
    if (!revealedSections.includes(index)) {
      setRevealedSections([...revealedSections, index]);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-2xl overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          {data.headline}
        </h2>
        
        <Card className="w-full mb-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.text}
          </p>
        </Card>
        
        <div className="w-full space-y-3">
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Tap to reveal connections:
          </p>
          
          {data.reveal_sections.map((section, index) => (
            <motion.div key={index}>
              {!revealedSections.includes(index) ? (
                <Card
                  onClick={() => handleReveal(index)}
                  className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300"
                  padding="md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-primary-800 font-medium">Tap to reveal</span>
                    <span className="text-2xl">🎯</span>
                  </div>
                </Card>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <Card className="bg-success/10 border-2 border-success" padding="md">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✓</span>
                      <p className="text-gray-800 font-medium flex-1">
                        {section.label}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <Button onClick={onContinue} fullWidth>
              Makes sense! →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import { XPBadge } from '../atomic/XPBadge';
import type { CelebrationScreen as CelebrationScreenType } from '../../types/lesson.types';

interface CelebrationScreenProps {
  data: CelebrationScreenType;
  onContinue: () => void;
}

export function CelebrationScreen({ data, onContinue }: CelebrationScreenProps) {
  useEffect(() => {
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0ea5e9', '#10b981', '#f59e0b'],
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0ea5e9', '#10b981', '#f59e0b'],
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-4 text-gray-900 text-center"
        >
          Lesson Complete!
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <XPBadge amount={data.xp_earned} animate />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-gray-700 mb-8 text-center max-w-md"
        >
          {data.celebration_message}
        </motion.p>
        
        {/* Badge earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏆</div>
              <div>
                <h3 className="font-bold text-gray-900">{data.badge}</h3>
                <p className="text-sm text-gray-700">{data.badge_description}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Next lesson preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full"
        >
          <Card className="bg-primary-50 border-2 border-primary-300">
            <h3 className="font-bold text-gray-900 mb-2">Up Next:</h3>
            <p className="text-lg font-semibold text-primary-700 mb-1">
              {data.next_lesson_preview.title}
            </p>
            <p className="text-sm text-gray-700">
              {data.next_lesson_preview.description}
            </p>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="w-full"
      >
        <Button onClick={onContinue} variant="success" fullWidth>
          Continue to next lesson →
        </Button>
      </motion.div>
    </motion.div>
  );
}

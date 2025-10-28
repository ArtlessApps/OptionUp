import { motion } from 'framer-motion';
import { Button } from '../atomic/Button';
import type { HookScreen as HookScreenType } from '../../types/lesson.types';

interface HookScreenProps {
  data: HookScreenType;
  onContinue: () => void;
}

export function HookScreen({ data, onContinue }: HookScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Visual placeholder - would be actual image */}
        <div className="w-64 h-64 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl mb-8 flex items-center justify-center">
          <span className="text-6xl">💰</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          {data.headline}
        </h1>
        
        <p className="text-lg text-gray-600 max-w-md leading-relaxed">
          {data.text}
        </p>
      </div>
      
      <Button onClick={onContinue} fullWidth>
        Let's go! →
      </Button>
    </motion.div>
  );
}

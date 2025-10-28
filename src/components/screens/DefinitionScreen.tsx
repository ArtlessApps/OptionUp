import { motion } from 'framer-motion';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import type { DefinitionScreen as DefinitionScreenType } from '../../types/lesson.types';

interface DefinitionScreenProps {
  data: DefinitionScreenType;
  onContinue: () => void;
}

export function DefinitionScreen({ data, onContinue }: DefinitionScreenProps) {
  const highlightText = (text: string, words?: string[]) => {
    if (!words || words.length === 0) return text;
    
    let highlightedText = text;
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<strong class="text-primary-700 font-bold">$1</strong>'
      );
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          {data.headline}
        </h2>
        
        {/* Visual placeholder */}
        <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6 flex items-center justify-center">
          <span className="text-6xl">📄</span>
        </div>
        
        <Card className="w-full">
          <p className="text-lg text-gray-700 leading-relaxed">
            {highlightText(data.text, data.highlight_words)}
          </p>
        </Card>
      </div>
      
      <Button onClick={onContinue} fullWidth>
        Got it →
      </Button>
    </motion.div>
  );
}

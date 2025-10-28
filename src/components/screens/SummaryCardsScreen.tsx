import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import type { SummaryCardsScreen as SummaryCardsScreenType } from '../../types/lesson.types';

interface SummaryCardsScreenProps {
  data: SummaryCardsScreenType;
  onContinue: () => void;
}

export function SummaryCardsScreen({ data, onContinue }: SummaryCardsScreenProps) {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const allFlipped = flippedCards.length === data.cards.length;
  
  const toggleFlip = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter(i => i !== index));
    } else {
      setFlippedCards([...flippedCards, index]);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-2xl overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 text-center">
          {data.headline}
        </h2>
        
        <p className="text-sm text-gray-600 mb-6">Tap each card to review</p>
        
        <div className="w-full space-y-4">
          {data.cards.map((card, index) => {
            const isFlipped = flippedCards.includes(index);
            
            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => toggleFlip(index)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="relative w-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformStyle: 'preserve-3d', minHeight: '100px' }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white min-h-[100px] flex items-center justify-center">
                      <p className="text-lg font-semibold text-center px-4">
                        {card.front}
                      </p>
                    </Card>
                  </div>
                  
                  {/* Back */}
                  <div
                    className="absolute w-full"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <Card className="bg-white min-h-[100px] flex items-center justify-center">
                      <p className="text-base text-gray-700 text-center px-4">
                        {card.back}
                      </p>
                    </Card>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
        
        {allFlipped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center"
          >
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-sm font-semibold text-success">
              All key concepts reviewed!
            </p>
          </motion.div>
        )}
      </div>
      
      <Button
        onClick={onContinue}
        disabled={!allFlipped}
        fullWidth
      >
        {allFlipped ? "Let's finish! →" : 'Review all cards first'}
      </Button>
    </motion.div>
  );
}

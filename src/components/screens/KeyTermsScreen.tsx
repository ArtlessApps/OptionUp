import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import type { KeyTermsScreen as KeyTermsScreenType } from '../../types/lesson.types';

interface KeyTermsScreenProps {
  data: KeyTermsScreenType;
  onContinue: () => void;
}

export function KeyTermsScreen({ data, onContinue }: KeyTermsScreenProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const isLastCard = currentCard === data.cards.length - 1;
  
  const handleNext = () => {
    if (!isLastCard) {
      setIsFlipped(false);
      setCurrentCard(currentCard + 1);
    }
  };
  
  const card = data.cards[currentCard];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          {data.headline}
        </h2>
        
        <div className="text-sm text-gray-600 mb-4">
          Card {currentCard + 1} of {data.cards.length}
        </div>
        
        {/* Flip Card */}
        <div
          className="relative w-full h-96 cursor-pointer mb-6"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="w-full h-full relative"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <div
              className="absolute w-full h-full"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Card className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-3xl font-bold text-center">{card.term}</h3>
                <p className="text-sm mt-4 opacity-75">Tap to flip</p>
              </Card>
            </div>
            
            {/* Back of card */}
            <div
              className="absolute w-full h-full"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <Card className="w-full h-full flex flex-col justify-center p-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Definition</h4>
                    <p className="text-lg text-gray-800">{card.definition}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Example</h4>
                    <p className="text-base text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {card.example}
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-4 text-gray-500 text-center">Tap to flip back</p>
              </Card>
            </div>
          </motion.div>
        </div>
        
        <div className="flex gap-2">
          {data.cards.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentCard ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="w-full space-y-2">
        {!isLastCard ? (
          <Button onClick={handleNext} fullWidth variant="secondary">
            Next term →
          </Button>
        ) : (
          <Button onClick={onContinue} fullWidth>
            I've got these! →
          </Button>
        )}
      </div>
    </motion.div>
  );
}

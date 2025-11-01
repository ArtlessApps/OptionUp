import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';
import type { InteractiveExampleScreen as InteractiveExampleScreenType } from '../../types/lesson.types';

interface InteractiveExampleScreenProps {
  data: InteractiveExampleScreenType;
  onContinue: () => void;
}

export function InteractiveExampleScreen({ data, onContinue }: InteractiveExampleScreenProps) {
  // Initialize state with default values from the lesson data
  const [inputValues, setInputValues] = useState<Record<string, number | string | boolean>>(
    data.inputs.reduce((acc, input, index) => ({
      ...acc,
      [index]: input.value
    }), {})
  );
  
  const handleInputChange = (index: number, value: number | string | boolean) => {
    setInputValues(prev => ({
      ...prev,
      [index]: value
    }));
  };
  
  const renderInput = (input: InteractiveExampleScreenType['inputs'][0], index: number) => {
    const currentValue = inputValues[index];
    
    // Slider input
    if (input.type === 'slider' || (input.min !== undefined && input.max !== undefined)) {
      return (
        <div key={index} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              {input.label}
            </label>
            <span className="text-lg font-bold text-primary-600">
              {currentValue}
            </span>
          </div>
          
          <input
            type="range"
            min={input.min}
            max={input.max}
            step={input.step || 1}
            value={currentValue as number}
            onChange={(e) => handleInputChange(index, parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${
                ((currentValue as number - (input.min || 0)) / ((input.max || 100) - (input.min || 0))) * 100
              }%, #E5E7EB ${
                ((currentValue as number - (input.min || 0)) / ((input.max || 100) - (input.min || 0))) * 100
              }%, #E5E7EB 100%)`
            }}
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{input.min}</span>
            <span>{input.max}</span>
          </div>
        </div>
      );
    }
    
    // Toggle input
    if (input.type === 'toggle') {
      return (
        <div key={index} className="mb-6 flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">
            {input.label}
          </label>
          <button
            onClick={() => handleInputChange(index, !currentValue)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              currentValue ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                currentValue ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      );
    }
    
    // Text/number input (fallback)
    return (
      <div key={index} className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {input.label}
        </label>
        <input
          type="text"
          value={currentValue as string}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
        />
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-between h-full px-6 py-8"
    >
      <div className="flex-1 flex flex-col items-start justify-start w-full max-w-2xl overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          {data.headline}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {data.description}
        </p>
        
        {/* Interactive Inputs Section */}
        <div className="w-full mb-6">
          <Card className="bg-white border-2 border-primary-100" padding="lg">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Adjust Parameters
            </h3>
            {data.inputs.map((input, index) => renderInput(input, index))}
          </Card>
        </div>
        
        {/* Outputs Section */}
        <div className="w-full mb-6">
          <Card className="bg-gradient-to-br from-primary-50 to-purple-50 border-2 border-primary-200" padding="lg">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Results
            </h3>
            <div className="space-y-3">
              {data.outputs.map((output, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-2 border-b border-primary-200 last:border-b-0"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {output.label}
                  </span>
                  <span className="text-lg font-bold text-primary-700">
                    {output.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Teaching Points Section */}
        {data.teaching_points && data.teaching_points.length > 0 && (
          <div className="w-full mb-6">
            <Card className="bg-warning/10 border-2 border-warning/30" padding="md">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Key Insights</h3>
                  <ul className="space-y-2">
                    {data.teaching_points.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-warning mt-0.5">•</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
      
      <div className="w-full">
        <Button onClick={onContinue} fullWidth>
          Continue →
        </Button>
      </div>
    </motion.div>
  );
}


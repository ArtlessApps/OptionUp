import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface DeltaVisualizationChartProps {
  stockPrice: number;
  strikePrice: number;
  daysToExpiration: number;
  optionType: 'call' | 'put';
  stockPriceRange?: [number, number];
}

export function DeltaVisualizationChart({ 
  stockPrice, 
  strikePrice,
  daysToExpiration,
  optionType,
  stockPriceRange 
}: DeltaVisualizationChartProps) {
  
  // Calculate range if not provided
  const [minPrice, maxPrice] = stockPriceRange || [
    Math.floor(strikePrice * 0.85),
    Math.ceil(strikePrice * 1.15)
  ];
  
  // Simple delta approximation using Black-Scholes concept
  // For educational purposes - simplified calculation
  const calculateDelta = (stock: number, strike: number, dte: number, isCall: boolean): number => {
    const moneyness = stock / strike;
    const timeToExp = dte / 365;
    
    // Simplified delta approximation
    let delta: number;
    
    if (isCall) {
      // For calls: 0 (deep OTM) to 1 (deep ITM)
      if (moneyness < 0.9) {
        delta = 0.1 + (moneyness - 0.85) * 2;
      } else if (moneyness > 1.1) {
        delta = 0.9 + (moneyness - 1.1) * 0.5;
      } else {
        // Near ATM - use S-curve
        const x = (moneyness - 1) * 5;
        delta = 0.5 + 0.4 * Math.tanh(x);
      }
    } else {
      // For puts: 0 (deep OTM) to -1 (deep ITM)
      if (moneyness > 1.1) {
        delta = -0.1 - (moneyness - 1.15) * 2;
      } else if (moneyness < 0.9) {
        delta = -0.9 - (0.9 - moneyness) * 0.5;
      } else {
        // Near ATM - use S-curve
        const x = (moneyness - 1) * 5;
        delta = -0.5 - 0.4 * Math.tanh(x);
      }
    }
    
    // Time decay effect on delta (smaller near expiration for OTM)
    const timeFactor = Math.min(1, timeToExp * 2);
    if (Math.abs(moneyness - 1) > 0.1) {
      delta = delta * (0.7 + 0.3 * timeFactor);
    }
    
    // Clamp values
    if (isCall) {
      return Math.max(0, Math.min(1, delta));
    } else {
      return Math.max(-1, Math.min(0, delta));
    }
  };
  
  const calculateOptionPrice = (stock: number, strike: number, delta: number, isCall: boolean): number => {
    const intrinsic = isCall 
      ? Math.max(0, stock - strike)
      : Math.max(0, strike - stock);
    
    // Time value decreases as we move away from ATM
    const moneyness = stock / strike;
    const atmDistance = Math.abs(moneyness - 1);
    const timeValue = Math.max(0, (5 - atmDistance * 20) * (daysToExpiration / 30));
    
    return intrinsic + timeValue;
  };
  
  // Generate data
  const data = useMemo(() => {
    const points: Array<{ 
      stockPrice: number; 
      delta: number; 
      optionPrice: number;
      moneyness: string;
    }> = [];
    const step = (maxPrice - minPrice) / 100;
    
    for (let price = minPrice; price <= maxPrice; price += step) {
      const delta = calculateDelta(price, strikePrice, daysToExpiration, optionType === 'call');
      const optionPrice = calculateOptionPrice(price, strikePrice, delta, optionType === 'call');
      
      let moneyness = 'ATM';
      if (optionType === 'call') {
        if (price < strikePrice * 0.95) moneyness = 'OTM';
        else if (price > strikePrice * 1.05) moneyness = 'ITM';
      } else {
        if (price > strikePrice * 1.05) moneyness = 'OTM';
        else if (price < strikePrice * 0.95) moneyness = 'ITM';
      }
      
      points.push({
        stockPrice: Number(price.toFixed(2)),
        delta: Number(delta.toFixed(3)),
        optionPrice: Number(optionPrice.toFixed(2)),
        moneyness
      });
    }
    
    return points;
  }, [strikePrice, daysToExpiration, optionType, minPrice, maxPrice]);
  
  // Current values
  const currentDelta = calculateDelta(stockPrice, strikePrice, daysToExpiration, optionType === 'call');
  const currentOptionPrice = calculateOptionPrice(stockPrice, strikePrice, currentDelta, optionType === 'call');
  
  // Determine moneyness
  let currentMoneyness = 'ATM';
  if (optionType === 'call') {
    if (stockPrice < strikePrice * 0.95) currentMoneyness = 'OTM';
    else if (stockPrice > strikePrice * 1.05) currentMoneyness = 'ITM';
  } else {
    if (stockPrice > strikePrice * 1.05) currentMoneyness = 'OTM';
    else if (stockPrice < strikePrice * 0.95) currentMoneyness = 'ITM';
  }
  
  // Calculate what a $1 move would do
  const dollarMove = currentDelta * 100; // Per contract

  return (
    <div className="w-full space-y-4">
      {/* Current Values Display */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          key={currentDelta}
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`rounded-lg p-4 text-center border-2 ${
            currentMoneyness === 'ITM' 
              ? 'bg-green-50 border-green-300'
              : currentMoneyness === 'OTM'
              ? 'bg-red-50 border-red-300'
              : 'bg-yellow-50 border-yellow-300'
          }`}
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Delta (Δ)</div>
          <div className="text-3xl font-bold text-primary-700">
            <CountUp 
              start={0}
              end={currentDelta}
              duration={0.5}
              decimals={2}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">{currentMoneyness}</div>
        </motion.div>
        
        <motion.div
          key={currentOptionPrice}
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4 text-center border-2 border-primary-200"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Option Price</div>
          <div className="text-3xl font-bold text-primary-700">
            $<CountUp 
              start={0}
              end={currentOptionPrice}
              duration={0.5}
              decimals={2}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">per share</div>
        </motion.div>
        
        <motion.div
          key={dollarMove}
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border-2 border-purple-200"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">$1 Stock Move</div>
          <div className="text-3xl font-bold text-purple-700">
            {dollarMove >= 0 ? '+' : ''}$<CountUp 
              start={0}
              end={Math.abs(dollarMove)}
              duration={0.5}
              decimals={0}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">option value change</div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">
          Delta Across Stock Prices - {optionType === 'call' ? 'Call' : 'Put'} Option (Strike ${strikePrice})
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis 
              dataKey="stockPrice" 
              label={{ value: 'Stock Price ($)', position: 'insideBottom', offset: -15 }}
              stroke="#6b7280"
              tickFormatter={(value) => `$${value}`}
            />
            
            <YAxis 
              domain={optionType === 'call' ? [0, 1] : [-1, 0]}
              label={{ value: 'Delta (Δ)', angle: -90, position: 'insideLeft' }}
              stroke="#6b7280"
              tickFormatter={(value) => value.toFixed(2)}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'delta') {
                  return [value.toFixed(3), 'Delta'];
                }
                return [value, name];
              }}
              labelFormatter={(stockPrice) => `Stock: $${stockPrice}`}
            />
            
            {/* Strike price line */}
            <ReferenceLine 
              x={strikePrice} 
              stroke="#374151" 
              strokeWidth={2}
              strokeDasharray="5 5"
            >
              <Label 
                value={`Strike: $${strikePrice}`}
                position="top"
                fill="#374151"
                fontSize={11}
                fontWeight="bold"
              />
            </ReferenceLine>
            
            {/* Current stock price line */}
            <ReferenceLine 
              x={stockPrice} 
              stroke="#4F46E5" 
              strokeWidth={2}
            >
              <Label 
                value={`Current: $${stockPrice.toFixed(2)}`}
                position="bottom"
                fill="#4F46E5"
                fontSize={11}
                fontWeight="bold"
              />
            </ReferenceLine>
            
            {/* 0.5 delta line for calls, -0.5 for puts */}
            <ReferenceLine 
              y={optionType === 'call' ? 0.5 : -0.5} 
              stroke="#f59e0b" 
              strokeWidth={1}
              strokeDasharray="3 3"
            >
              <Label 
                value="ATM (~0.50Δ)"
                position="right"
                fill="#f59e0b"
                fontSize={10}
              />
            </ReferenceLine>
            
            {/* Delta line */}
            <Line
              type="monotone"
              dataKey="delta"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-400"></div>
            <span className="text-gray-700">OTM (Low Δ)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <span className="text-gray-700">ATM (~0.50Δ)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-400"></div>
            <span className="text-gray-700">ITM (High Δ)</span>
          </div>
        </div>
      </div>
      
      {/* Explanation */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎯</span>
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium mb-2">
              What this means:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Current Delta {currentDelta.toFixed(2)}:</strong> If stock moves $1, your option moves ${Math.abs(dollarMove).toFixed(0)} (per contract)</li>
              <li>• <strong>Low Delta ({optionType === 'call' ? '~0.20' : '~-0.20'}):</strong> OTM - option barely moves with stock</li>
              <li>• <strong>Mid Delta ({optionType === 'call' ? '~0.50' : '~-0.50'}):</strong> ATM - option moves 50¢ per $1 stock move</li>
              <li>• <strong>High Delta ({optionType === 'call' ? '~0.80' : '~-0.80'}):</strong> ITM - option moves almost 1:1 with stock</li>
              <li>• <strong>Notice:</strong> Delta changes as stock price moves - that change is gamma!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


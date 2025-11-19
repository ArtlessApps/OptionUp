import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { motion } from 'framer-motion';

interface ProfitLossChartProps {
  strikePrice: number;
  premium: number;
  optionType: 'call' | 'put';
  stockPriceNow: number;
  stockPriceRange?: [number, number];
}

export function ProfitLossChart({ 
  strikePrice, 
  premium, 
  optionType,
  stockPriceNow,
  stockPriceRange 
}: ProfitLossChartProps) {
  
  // Calculate range if not provided
  const [minPrice, maxPrice] = stockPriceRange || [
    Math.floor(strikePrice * 0.7),
    Math.ceil(strikePrice * 1.3)
  ];
  
  // Generate P/L data
  const data = useMemo(() => {
    const points: Array<{ stockPrice: number; profitLoss: number; breakeven: boolean }> = [];
    const step = (maxPrice - minPrice) / 100;
    
    for (let price = minPrice; price <= maxPrice; price += step) {
      let profitLoss: number;
      
      if (optionType === 'call') {
        // Long call: Profit = max(0, stock - strike) - premium
        const intrinsicValue = Math.max(0, price - strikePrice);
        profitLoss = intrinsicValue - premium;
      } else {
        // Long put: Profit = max(0, strike - stock) - premium
        const intrinsicValue = Math.max(0, strikePrice - price);
        profitLoss = intrinsicValue - premium;
      }
      
      // Convert to per-contract ($100 multiplier)
      profitLoss = profitLoss * 100;
      
      points.push({
        stockPrice: Number(price.toFixed(2)),
        profitLoss: Number(profitLoss.toFixed(2)),
        breakeven: Math.abs(profitLoss) < 10 // Within $10 of breakeven
      });
    }
    
    return points;
  }, [strikePrice, premium, optionType, minPrice, maxPrice]);
  
  // Calculate key metrics
  const breakeven = optionType === 'call' 
    ? strikePrice + premium 
    : strikePrice - premium;
    
  const maxLoss = -premium * 100;
  
  const maxProfit = optionType === 'call'
    ? Infinity // Unlimited for calls
    : (strikePrice - premium) * 100; // Capped at strike - premium for puts
    
  // Find current P/L
  const currentPL = useMemo(() => {
    if (optionType === 'call') {
      return (Math.max(0, stockPriceNow - strikePrice) - premium) * 100;
    } else {
      return (Math.max(0, strikePrice - stockPriceNow) - premium) * 100;
    }
  }, [stockPriceNow, strikePrice, premium, optionType]);

  return (
    <div className="w-full space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-red-50 rounded-lg p-3 text-center border-2 border-red-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Max Loss</div>
          <div className="text-lg font-bold text-red-600">${Math.abs(maxLoss).toFixed(0)}</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-3 text-center border-2 border-yellow-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Breakeven</div>
          <div className="text-lg font-bold text-warning">${breakeven.toFixed(2)}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Max Profit</div>
          <div className="text-lg font-bold text-green-600">
            {maxProfit === Infinity ? '∞' : `$${maxProfit.toFixed(0)}`}
          </div>
        </div>
        
        <motion.div 
          key={currentPL}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-lg p-3 text-center border-2 ${
            currentPL >= 0 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Current P/L</div>
          <div className={`text-lg font-bold ${
            currentPL >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {currentPL >= 0 ? '+' : ''}${currentPL.toFixed(0)}
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">
          Profit/Loss at Expiration - Long {optionType === 'call' ? 'Call' : 'Put'}
        </h3>
        
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis 
              dataKey="stockPrice" 
              label={{ value: 'Stock Price at Expiration ($)', position: 'insideBottom', offset: -15 }}
              stroke="#6b7280"
              tickFormatter={(value) => `$${value}`}
            />
            
            <YAxis 
              label={{ value: 'Profit/Loss ($)', angle: -90, position: 'insideLeft' }}
              stroke="#6b7280"
              tickFormatter={(value) => `$${value}`}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number) => {
                const color = value >= 0 ? '#10b981' : '#ef4444';
                return [
                  <span style={{ color, fontWeight: 'bold' }}>
                    {value >= 0 ? '+' : ''}${value.toFixed(2)}
                  </span>,
                  'P/L'
                ];
              }}
              labelFormatter={(stockPrice) => `Stock Price: $${stockPrice}`}
            />
            
            {/* Zero line (breakeven) */}
            <ReferenceLine 
              y={0} 
              stroke="#374151" 
              strokeWidth={2}
            />
            
            {/* Breakeven vertical line */}
            <ReferenceLine 
              x={breakeven} 
              stroke="#f59e0b" 
              strokeWidth={2}
              strokeDasharray="5 5"
            >
              <Label 
                value={`Breakeven: $${breakeven.toFixed(2)}`}
                position="top"
                fill="#f59e0b"
                fontSize={12}
                fontWeight="bold"
              />
            </ReferenceLine>
            
            {/* Current stock price line */}
            <ReferenceLine 
              x={stockPriceNow} 
              stroke="#4F46E5" 
              strokeWidth={2}
              strokeDasharray="5 5"
            >
              <Label 
                value={`Current: $${stockPriceNow.toFixed(2)}`}
                position="bottom"
                fill="#4F46E5"
                fontSize={12}
                fontWeight="bold"
              />
            </ReferenceLine>
            
            {/* Profit area (positive P/L) */}
            <Area
              type="monotone"
              dataKey="profitLoss"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#profitGradient)"
              fillOpacity={1}
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-gray-700">Profit Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-gray-700">Loss Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-warning"></div>
            <span className="text-gray-700">Breakeven</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-primary-600"></div>
            <span className="text-gray-700">Current Price</span>
          </div>
        </div>
      </div>
      
      {/* Explanation */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📊</span>
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium mb-1">
              How to read this chart:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Below breakeven:</strong> You lose money (max loss = premium paid)</li>
              <li>• <strong>At breakeven:</strong> You recover your premium cost</li>
              <li>• <strong>Above breakeven:</strong> Pure profit! 
                {optionType === 'call' ? ' (unlimited upside ∞)' : ` (capped at $${maxProfit.toFixed(0)})`}
              </li>
              <li>• <strong>Current position:</strong> You're {currentPL >= 0 ? 'profitable' : 'underwater'} by ${Math.abs(currentPL).toFixed(0)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


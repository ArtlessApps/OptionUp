import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface SpreadLeg {
  strike: number;
  premium: number;
  type: 'call' | 'put';
  position: 'long' | 'short';
}

interface SpreadPLChartProps {
  legs: SpreadLeg[];
  stockPriceNow: number;
  stockPriceRange?: [number, number];
  spreadType?: string;
}

export function SpreadPLChart({ 
  legs, 
  stockPriceNow,
  stockPriceRange,
  spreadType = 'Spread'
}: SpreadPLChartProps) {
  
  // Calculate range if not provided
  const strikes = legs.map(leg => leg.strike);
  const minStrike = Math.min(...strikes);
  const maxStrike = Math.max(...strikes);
  
  const [minPrice, maxPrice] = stockPriceRange || [
    Math.floor(minStrike * 0.8),
    Math.ceil(maxStrike * 1.2)
  ];
  
  // Calculate net debit/credit
  const netCost = legs.reduce((sum, leg) => {
    if (leg.position === 'long') {
      return sum - leg.premium;
    } else {
      return sum + leg.premium;
    }
  }, 0);
  
  // Generate P/L data
  const data = useMemo(() => {
    const points: Array<{ 
      stockPrice: number; 
      totalPL: number;
      [key: string]: number;
    }> = [];
    const step = (maxPrice - minPrice) / 100;
    
    for (let price = minPrice; price <= maxPrice; price += step) {
      const point: any = { stockPrice: Number(price.toFixed(2)) };
      let totalPL = 0;
      
      // Calculate P/L for each leg
      legs.forEach((leg, index) => {
        let legPL: number;
        
        if (leg.type === 'call') {
          const intrinsicValue = Math.max(0, price - leg.strike);
          if (leg.position === 'long') {
            legPL = intrinsicValue - leg.premium;
          } else {
            legPL = leg.premium - intrinsicValue;
          }
        } else { // put
          const intrinsicValue = Math.max(0, leg.strike - price);
          if (leg.position === 'long') {
            legPL = intrinsicValue - leg.premium;
          } else {
            legPL = leg.premium - intrinsicValue;
          }
        }
        
        // Convert to per-contract
        legPL = legPL * 100;
        totalPL += legPL;
        
        // Store individual leg P/L
        point[`leg${index}`] = Number(legPL.toFixed(2));
      });
      
      point.totalPL = Number(totalPL.toFixed(2));
      points.push(point);
    }
    
    return points;
  }, [legs, minPrice, maxPrice]);
  
  // Calculate key metrics
  const maxProfit = Math.max(...data.map(d => d.totalPL));
  const maxLoss = Math.min(...data.map(d => d.totalPL));
  
  // Find breakeven points (where totalPL crosses zero)
  const breakevens: number[] = [];
  for (let i = 1; i < data.length; i++) {
    if ((data[i-1].totalPL < 0 && data[i].totalPL >= 0) || 
        (data[i-1].totalPL > 0 && data[i].totalPL <= 0)) {
      breakevens.push(data[i].stockPrice);
    }
  }
  
  // Find current P/L
  const currentPL = useMemo(() => {
    let total = 0;
    legs.forEach(leg => {
      let legPL: number;
      
      if (leg.type === 'call') {
        const intrinsicValue = Math.max(0, stockPriceNow - leg.strike);
        if (leg.position === 'long') {
          legPL = intrinsicValue - leg.premium;
        } else {
          legPL = leg.premium - intrinsicValue;
        }
      } else {
        const intrinsicValue = Math.max(0, leg.strike - stockPriceNow);
        if (leg.position === 'long') {
          legPL = intrinsicValue - leg.premium;
        } else {
          legPL = leg.premium - intrinsicValue;
        }
      }
      
      total += legPL * 100;
    });
    return total;
  }, [stockPriceNow, legs]);

  return (
    <div className="w-full space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-2">
        <div className={`rounded-lg p-3 text-center border-2 ${
          netCost < 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        }`}>
          <div className="text-xs text-gray-600 font-medium mb-1">
            {netCost < 0 ? 'Net Debit' : 'Net Credit'}
          </div>
          <div className={`text-lg font-bold ${
            netCost < 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            ${Math.abs(netCost * 100).toFixed(0)}
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-3 text-center border-2 border-red-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Max Loss</div>
          <div className="text-lg font-bold text-red-600">${Math.abs(maxLoss).toFixed(0)}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Max Profit</div>
          <div className="text-lg font-bold text-green-600">${maxProfit.toFixed(0)}</div>
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

      {/* Spread Structure */}
      <div className="bg-gray-50 rounded-lg p-3 border-2 border-gray-200">
        <div className="text-xs font-bold text-gray-700 mb-2">Spread Structure:</div>
        <div className="space-y-1">
          {legs.map((leg, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className={`font-medium ${
                leg.position === 'long' ? 'text-green-700' : 'text-red-700'
              }`}>
                {leg.position === 'long' ? 'BUY' : 'SELL'} ${leg.strike} {leg.type.toUpperCase()}
              </span>
              <span className="text-gray-600">
                {leg.position === 'long' ? '-' : '+'}${(leg.premium * 100).toFixed(0)}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-300 pt-1 mt-1 flex items-center justify-between font-bold">
            <span className="text-gray-700">Net {netCost < 0 ? 'Debit' : 'Credit'}:</span>
            <span className={netCost < 0 ? 'text-red-700' : 'text-green-700'}>
              ${Math.abs(netCost * 100).toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">
          {spreadType} - Profit/Loss at Expiration
        </h3>
        
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
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
              formatter={(value: number, name: string) => {
                if (name === 'totalPL') {
                  const color = value >= 0 ? '#10b981' : '#ef4444';
                  return [
                    <span style={{ color, fontWeight: 'bold' }}>
                      {value >= 0 ? '+' : ''}${value.toFixed(2)}
                    </span>,
                    'Total P/L'
                  ];
                }
                return [`$${value.toFixed(2)}`, name];
              }}
              labelFormatter={(stockPrice) => `Stock: $${stockPrice}`}
            />
            
            {/* Zero line */}
            <ReferenceLine 
              y={0} 
              stroke="#374151" 
              strokeWidth={2}
            />
            
            {/* Breakeven lines */}
            {breakevens.map((be, idx) => (
              <ReferenceLine 
                key={`be-${idx}`}
                x={be} 
                stroke="#f59e0b" 
                strokeWidth={2}
                strokeDasharray="5 5"
              >
                {idx === 0 && (
                  <Label 
                    value={`BE: $${be.toFixed(2)}`}
                    position="top"
                    fill="#f59e0b"
                    fontSize={11}
                    fontWeight="bold"
                  />
                )}
              </ReferenceLine>
            ))}
            
            {/* Current stock price */}
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
                fontSize={11}
                fontWeight="bold"
              />
            </ReferenceLine>
            
            {/* Individual leg lines (faded) */}
            {legs.map((leg, index) => (
              <Line
                key={`leg-${index}`}
                type="monotone"
                dataKey={`leg${index}`}
                stroke={leg.position === 'long' ? '#10b981' : '#ef4444'}
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                opacity={0.3}
                isAnimationActive={false}
              />
            ))}
            
            {/* Total P/L line (bold) */}
            <Line
              type="monotone"
              dataKey="totalPL"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-primary-600"></div>
            <span className="text-gray-700">Total P/L</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-green-400 opacity-50"></div>
            <span className="text-gray-700">Long Legs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-red-400 opacity-50"></div>
            <span className="text-gray-700">Short Legs</span>
          </div>
        </div>
      </div>
      
      {/* Risk/Reward Analysis */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📊</span>
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium mb-1">
              Risk/Reward Analysis:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Max Risk:</strong> ${Math.abs(maxLoss).toFixed(0)} 
                {maxLoss < 0 && ` (occurs if stock ${legs[0].type === 'call' ? 'falls below' : 'rises above'} extremes)`}
              </li>
              <li>• <strong>Max Reward:</strong> ${maxProfit.toFixed(0)}
                {maxProfit > 0 && ` (achieved in profit zone)`}
              </li>
              <li>• <strong>Risk/Reward Ratio:</strong> {(Math.abs(maxLoss) / maxProfit).toFixed(2)}:1
                {netCost > 0 ? ' (Credit spread - high win rate needed)' : ' (Debit spread - lower win rate OK)'}
              </li>
              <li>• <strong>Breakeven{breakevens.length > 1 ? 's' : ''}:</strong> {breakevens.map(be => `$${be.toFixed(2)}`).join(' and ')}
              </li>
              <li>• <strong>Current Status:</strong> {currentPL >= 0 ? '✅ Profitable' : '❌ Underwater'} by ${Math.abs(currentPL).toFixed(0)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


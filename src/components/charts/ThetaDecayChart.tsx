import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

interface ThetaDecayChartProps {
  daysToExpiration: number;
  optionPremium: number;
  intrinsicValue: number;
}

export function ThetaDecayChart({ daysToExpiration, optionPremium, intrinsicValue }: ThetaDecayChartProps) {
  // Calculate time value
  const timeValue = Math.max(0, optionPremium - intrinsicValue);
  
  // Generate decay curve data
  const data = useMemo(() => {
    const points: Array<{ day: number; optionValue: number; timeValue: number; intrinsicValue: number }> = [];
    const totalDays = 90;
    
    for (let day = totalDays; day >= 0; day--) {
      // Calculate remaining time value using exponential decay
      // Theta accelerates as we get closer to expiration
      const timeRemaining = day / totalDays;
      
      // Exponential decay formula that accelerates near expiration
      // Using a power function to simulate theta acceleration
      const decayFactor = Math.pow(timeRemaining, 1.5);
      const remainingTimeValue = timeValue * decayFactor;
      
      const optionValue = intrinsicValue + remainingTimeValue;
      
      points.push({
        day: totalDays - day,
        optionValue: Number(optionValue.toFixed(2)),
        timeValue: Number(remainingTimeValue.toFixed(2)),
        intrinsicValue: intrinsicValue,
      });
    }
    
    return points;
  }, [optionPremium, intrinsicValue, timeValue]);
  
  // Find current day index
  const currentDayIndex = 90 - daysToExpiration;
  const currentValue = data[currentDayIndex]?.optionValue || optionPremium;
  const currentTimeValue = data[currentDayIndex]?.timeValue || timeValue;
  
  // Calculate theta (daily decay rate at current point)
  const theta = currentDayIndex < data.length - 1 
    ? (data[currentDayIndex].optionValue - data[currentDayIndex + 1].optionValue)
    : 0;

  return (
    <div className="w-full space-y-4">
      {/* Current Values Display */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          key={currentValue}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-3 text-center"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Option Value</div>
          <div className="text-2xl font-bold text-primary-700">${currentValue.toFixed(2)}</div>
        </motion.div>
        
        <motion.div
          key={currentTimeValue}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-warning/20 to-warning/30 rounded-lg p-3 text-center"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Time Value</div>
          <div className="text-2xl font-bold text-warning">${currentTimeValue.toFixed(2)}</div>
        </motion.div>
        
        <motion.div
          key={theta}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 text-center"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Daily Decay (θ)</div>
          <div className="text-2xl font-bold text-red-600">-${theta.toFixed(2)}</div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="timeValueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="intrinsicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis 
              dataKey="day" 
              label={{ value: 'Days Passed', position: 'insideBottom', offset: -10 }}
              stroke="#6b7280"
            />
            
            <YAxis 
              label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
              stroke="#6b7280"
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px'
              }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  optionValue: 'Option Value',
                  timeValue: 'Time Value',
                  intrinsicValue: 'Intrinsic Value'
                };
                return [`$${value.toFixed(2)}`, labels[name] || name];
              }}
              labelFormatter={(day) => `Day ${day} of 90`}
            />
            
            {/* Intrinsic value area (bottom) */}
            <Area
              type="monotone"
              dataKey="intrinsicValue"
              stackId="1"
              stroke="#4F46E5"
              strokeWidth={2}
              fill="url(#intrinsicGradient)"
              name="Intrinsic Value"
            />
            
            {/* Time value area (stacked on top) */}
            <Area
              type="monotone"
              dataKey="timeValue"
              stackId="1"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#timeValueGradient)"
              name="Time Value"
            />
            
            {/* Current position marker */}
            <ReferenceLine 
              x={currentDayIndex} 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ 
                value: `You are here (${daysToExpiration} DTE)`, 
                position: 'top',
                fill: '#ef4444',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            />
            
            {/* 30-day warning line */}
            <ReferenceLine 
              x={60} 
              stroke="#f59e0b" 
              strokeWidth={1}
              strokeDasharray="3 3"
              label={{ 
                value: 'Decay accelerates →', 
                position: 'bottom',
                fill: '#f59e0b',
                fontSize: 10
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4F46E5', opacity: 0.6 }}></div>
            <span className="text-gray-700">Intrinsic Value (never decays)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning"></div>
            <span className="text-gray-700">Time Value (decays to $0)</span>
          </div>
        </div>
      </div>
      
      {/* Explanation */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm text-gray-700 font-medium mb-1">
              Notice the curve steepening after day 60?
            </p>
            <p className="text-xs text-gray-600">
              That's theta acceleration. The final 30 days is where most time value disappears. 
              {daysToExpiration < 30 && " You're in the danger zone - time decay is brutal here!"}
              {daysToExpiration >= 30 && daysToExpiration < 60 && " Time decay is picking up speed - watch closely!"}
              {daysToExpiration >= 60 && " You have time, but it's ticking away..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


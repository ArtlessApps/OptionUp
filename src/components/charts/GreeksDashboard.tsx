import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface GreeksDashboardProps {
  stockPrice: number;
  strikePrice: number;
  daysToExpiration: number;
  impliedVolatility: number;
  optionType: 'call' | 'put';
}

export function GreeksDashboard({ 
  stockPrice, 
  strikePrice,
  daysToExpiration,
  impliedVolatility,
  optionType
}: GreeksDashboardProps) {
  
  // Simplified Black-Scholes Greeks calculations for educational purposes
  const calculateGreeks = (S: number, K: number, T: number, IV: number, isCall: boolean) => {
    const t = T / 365; // Convert days to years
    const v = IV / 100; // Convert percentage to decimal
    
    if (t <= 0) {
      // At expiration
      return {
        delta: isCall ? (S > K ? 1 : 0) : (S < K ? -1 : 0),
        gamma: 0,
        theta: 0,
        vega: 0,
        rho: 0,
        optionPrice: Math.max(0, isCall ? S - K : K - S)
      };
    }
    
    // Simplified calculations
    const moneyness = S / K;
    const sqrtT = Math.sqrt(t);
    
    // Delta calculation (simplified)
    let delta: number;
    if (isCall) {
      const x = (moneyness - 1) * 5 / sqrtT;
      delta = 0.5 + 0.4 * Math.tanh(x);
      delta = Math.max(0.05, Math.min(0.95, delta));
    } else {
      const x = (moneyness - 1) * 5 / sqrtT;
      delta = -0.5 - 0.4 * Math.tanh(x);
      delta = Math.max(-0.95, Math.min(-0.05, delta));
    }
    
    // Gamma calculation (highest at ATM, decreases with time and away from ATM)
    const atmDistance = Math.abs(moneyness - 1);
    const gammaBase = Math.exp(-Math.pow(atmDistance * 3, 2));
    const gamma = gammaBase * (1 / sqrtT) * 0.1;
    
    // Theta calculation (accelerates near expiration)
    const thetaBase = 0.5 + 0.5 * (1 - Math.exp(-atmDistance * 2));
    const theta = -(thetaBase * v * K * 0.01 * (1 / sqrtT));
    
    // Vega calculation (highest at ATM, decreases away from ATM)
    const vega = K * sqrtT * gammaBase * 0.4;
    
    // Rho calculation (simplified)
    const rho = isCall ? K * t * Math.abs(delta) * 0.01 : -K * t * Math.abs(delta) * 0.01;
    
    // Option price (simplified)
    const intrinsic = Math.max(0, isCall ? S - K : K - S);
    const timeValue = vega * v;
    const optionPrice = intrinsic + timeValue;
    
    return { delta, gamma, theta, vega, rho, optionPrice };
  };
  
  // Generate data for stock price variation
  const stockPriceData = useMemo(() => {
    const points: any[] = [];
    const range = strikePrice * 0.3;
    const minPrice = strikePrice - range;
    const maxPrice = strikePrice + range;
    const step = (maxPrice - minPrice) / 50;
    
    for (let price = minPrice; price <= maxPrice; price += step) {
      const greeks = calculateGreeks(price, strikePrice, daysToExpiration, impliedVolatility, optionType === 'call');
      points.push({
        stockPrice: Number(price.toFixed(2)),
        delta: Number(greeks.delta.toFixed(4)),
        gamma: Number(greeks.gamma.toFixed(4)),
        theta: Number(greeks.theta.toFixed(4)),
        vega: Number(greeks.vega.toFixed(4)),
        rho: Number((greeks.rho / 10).toFixed(4)), // Scale down for visibility
      });
    }
    
    return points;
  }, [strikePrice, daysToExpiration, impliedVolatility, optionType]);
  
  // Current Greeks
  const currentGreeks = useMemo(() => {
    return calculateGreeks(stockPrice, strikePrice, daysToExpiration, impliedVolatility, optionType === 'call');
  }, [stockPrice, strikePrice, daysToExpiration, impliedVolatility, optionType]);

  return (
    <div className="w-full space-y-4">
      {/* Greeks Display Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <motion.div
          key={currentGreeks.delta}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center border-2 border-blue-200"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Delta (Δ)</div>
          <div className="text-2xl font-bold text-blue-700">
            <CountUp 
              start={0}
              end={currentGreeks.delta}
              duration={0.5}
              decimals={3}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Directional</div>
        </motion.div>
        
        <motion.div
          key={currentGreeks.gamma}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center border-2 border-green-200"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Gamma (Γ)</div>
          <div className="text-2xl font-bold text-green-700">
            <CountUp 
              start={0}
              end={currentGreeks.gamma}
              duration={0.5}
              decimals={3}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Acceleration</div>
        </motion.div>
        
        <motion.div
          key={currentGreeks.theta}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 text-center border-2 border-red-200"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Theta (Θ)</div>
          <div className="text-2xl font-bold text-red-700">
            <CountUp 
              start={0}
              end={currentGreeks.theta}
              duration={0.5}
              decimals={2}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Time Decay</div>
        </motion.div>
        
        <motion.div
          key={currentGreeks.vega}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center border-2 border-purple-200"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Vega (ν)</div>
          <div className="text-2xl font-bold text-purple-700">
            <CountUp 
              start={0}
              end={currentGreeks.vega}
              duration={0.5}
              decimals={2}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Volatility</div>
        </motion.div>
        
        <motion.div
          key={currentGreeks.rho}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 text-center border-2 border-gray-300"
        >
          <div className="text-xs text-gray-600 font-medium mb-1">Rho (ρ)</div>
          <div className="text-2xl font-bold text-gray-700">
            <CountUp 
              start={0}
              end={currentGreeks.rho}
              duration={0.5}
              decimals={2}
              preserveValue
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Interest Rate</div>
        </motion.div>
      </div>

      {/* Option Price Display */}
      <motion.div
        key={currentGreeks.optionPrice}
        initial={{ scale: 1.05, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-4 text-center border-2 border-primary-200"
      >
        <div className="text-sm text-gray-600 font-medium mb-1">Estimated Option Price</div>
        <div className="text-4xl font-bold text-primary-700">
          $<CountUp 
            start={0}
            end={currentGreeks.optionPrice}
            duration={0.5}
            decimals={2}
            preserveValue
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {optionType === 'call' ? 'Call' : 'Put'} Option | Strike ${strikePrice} | {daysToExpiration} DTE | IV {impliedVolatility}%
        </div>
      </motion.div>

      {/* Greeks Chart - Stock Price Variation */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">
          How Greeks Change with Stock Price
        </h3>
        
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={stockPriceData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis 
              dataKey="stockPrice" 
              label={{ value: 'Stock Price ($)', position: 'insideBottom', offset: -10 }}
              stroke="#6b7280"
              tickFormatter={(value) => `$${value}`}
            />
            
            <YAxis 
              label={{ value: 'Greek Value', angle: -90, position: 'insideLeft' }}
              stroke="#6b7280"
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  delta: 'Delta (Δ)',
                  gamma: 'Gamma (Γ)',
                  theta: 'Theta (Θ)',
                  vega: 'Vega (ν)',
                  rho: 'Rho (ρ) ×10'
                };
                return [value.toFixed(4), labels[name] || name];
              }}
              labelFormatter={(stockPrice) => `Stock: $${stockPrice}`}
            />
            
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            
            {/* Strike price reference */}
            <ReferenceLine 
              x={strikePrice} 
              stroke="#374151" 
              strokeWidth={1}
              strokeDasharray="5 5"
              label={{ 
                value: 'Strike', 
                position: 'top',
                fill: '#374151',
                fontSize: 10
              }}
            />
            
            {/* Current stock price */}
            <ReferenceLine 
              x={stockPrice} 
              stroke="#4F46E5" 
              strokeWidth={2}
              label={{ 
                value: 'Current', 
                position: 'bottom',
                fill: '#4F46E5',
                fontSize: 10,
                fontWeight: 'bold'
              }}
            />
            
            {/* Greek lines */}
            <Line
              type="monotone"
              dataKey="delta"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Delta (Δ)"
              isAnimationActive={true}
            />
            
            <Line
              type="monotone"
              dataKey="gamma"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Gamma (Γ)"
              isAnimationActive={true}
            />
            
            <Line
              type="monotone"
              dataKey="theta"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="Theta (Θ)"
              isAnimationActive={true}
            />
            
            <Line
              type="monotone"
              dataKey="vega"
              stroke="#a855f7"
              strokeWidth={2}
              dot={false}
              name="Vega (ν)"
              isAnimationActive={true}
            />
            
            <Line
              type="monotone"
              dataKey="rho"
              stroke="#6b7280"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              dot={false}
              name="Rho (ρ) ×10"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Greeks Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">🎯</span>
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1">Delta (Δ) - Directional Risk</p>
              <p className="text-xs text-gray-600">
                How much option price changes per $1 stock move. 
                Current: {currentGreeks.delta > 0 ? '+' : ''}{(currentGreeks.delta * 100).toFixed(0)} delta = 
                ${Math.abs(currentGreeks.delta * 100).toFixed(0)} per $1 move
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">⚡</span>
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1">Gamma (Γ) - Delta's Acceleration</p>
              <p className="text-xs text-gray-600">
                How much delta changes per $1 stock move. 
                Highest at ATM, near expiration. Current: {currentGreeks.gamma.toFixed(3)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">⏰</span>
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1">Theta (Θ) - Time Decay</p>
              <p className="text-xs text-gray-600">
                Daily value loss from time passing. 
                Current: {currentGreeks.theta.toFixed(2)}/day = ${(Math.abs(currentGreeks.theta) * 100).toFixed(0)} loss per contract daily
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">📊</span>
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1">Vega (ν) - Volatility Sensitivity</p>
              <p className="text-xs text-gray-600">
                Price change per 1% IV change. 
                Current: ${currentGreeks.vega.toFixed(2)} per 1% IV move (${(currentGreeks.vega * 100).toFixed(0)} per contract)
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">
              What to notice:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Delta</strong> increases as option goes ITM (approaches {optionType === 'call' ? '+1.0' : '-1.0'})</li>
              <li>• <strong>Gamma</strong> peaks at ATM - this is where delta changes fastest</li>
              <li>• <strong>Theta</strong> is highest near ATM - time decay hurts most here</li>
              <li>• <strong>Vega</strong> also peaks at ATM - ATM options most sensitive to IV changes</li>
              <li>• All Greeks interact - a stock move changes delta (via gamma), which affects other Greeks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


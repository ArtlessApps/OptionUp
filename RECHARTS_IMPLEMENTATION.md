# Recharts Financial Visualizations Implementation

## Overview
This document summarizes the implementation of Recharts-based financial data visualizations for the OptionUp options education platform.

## Installed Dependencies
- `recharts` - Composable charting library built on React components
- `@types/recharts` - TypeScript type definitions (assumed installed by user)

## Created Components

### 1. ThetaDecayChart (`src/components/charts/ThetaDecayChart.tsx`)
**Purpose:** Visualizes option value decay over time, demonstrating theta acceleration.

**Features:**
- Animated stacked area chart showing intrinsic value vs time value
- Real-time metrics display (option value, time value, daily theta)
- Visual indicators for current position and 30-day acceleration zone
- Color-coded areas with gradient fills
- Dynamic explanations based on days to expiration

**Props:**
- `daysToExpiration: number` - Current days until option expires
- `optionPremium: number` - Total option premium
- `intrinsicValue: number` - Intrinsic value of the option

**Used in:** Lesson 09 (Theta Decay)

### 2. ProfitLossChart (`src/components/charts/ProfitLossChart.tsx`)
**Purpose:** Classic hockey stick P/L diagrams for long call/put positions.

**Features:**
- Area chart with gradient fills (green for profit, red for loss)
- Key metrics display: Max Loss, Breakeven, Max Profit, Current P/L
- Breakeven and current price markers
- Zero line reference
- Responsive to stock price changes with Framer Motion animations

**Props:**
- `strikePrice: number` - Option strike price
- `premium: number` - Premium paid per share
- `optionType: 'call' | 'put'` - Type of option
- `stockPriceNow: number` - Current stock price
- `stockPriceRange?: [number, number]` - Optional price range for chart

**Used in:** Lessons 05, 06, 07 (P/L Diagrams)

### 3. DeltaVisualizationChart (`src/components/charts/DeltaVisualizationChart.tsx`)
**Purpose:** Interactive delta sensitivity demonstration with real-time updates.

**Features:**
- Line chart showing delta across stock prices
- Animated value counters using react-countup
- Color-coded moneyness indicators (OTM, ATM, ITM)
- Live calculation of $1 stock move impact
- Strike price and current price markers
- Simplified Black-Scholes delta approximation

**Props:**
- `stockPrice: number` - Current stock price
- `strikePrice: number` - Option strike price
- `daysToExpiration: number` - Days until expiration
- `optionType: 'call' | 'put'` - Type of option
- `stockPriceRange?: [number, number]` - Optional price range

**Used in:** Lesson 55 (Delta Explained)

### 4. SpreadPLChart (`src/components/charts/SpreadPLChart.tsx`)
**Purpose:** Multi-leg spread visualization with comprehensive risk analysis.

**Features:**
- Combined P/L line for total spread position
- Individual leg lines (faded) showing components
- Spread structure breakdown
- Risk/reward metrics
- Multiple breakeven support
- Net debit/credit display
- Supports any multi-leg strategy

**Props:**
- `legs: SpreadLeg[]` - Array of spread legs (strike, premium, type, position)
- `stockPriceNow: number` - Current stock price
- `stockPriceRange?: [number, number]` - Optional price range
- `spreadType?: string` - Display name for the spread

**Used in:** Lessons 29, 32, 44 (Spread Strategies)

### 5. GreeksDashboard (`src/components/charts/GreeksDashboard.tsx`)
**Purpose:** Comprehensive Greeks visualization showing all five Greeks simultaneously.

**Features:**
- Multi-line chart with all Greeks (Delta, Gamma, Theta, Vega, Rho)
- Individual Greek value cards with animated counters
- Option price estimation
- Greeks change visualization across stock prices
- Color-coded Greek indicators
- Educational explanations for each Greek

**Props:**
- `stockPrice: number` - Current stock price
- `strikePrice: number` - Option strike price
- `daysToExpiration: number` - Days until expiration
- `impliedVolatility: number` - IV percentage
- `optionType: 'call' | 'put'` - Type of option

**Used in:** Lesson 64 (Greeks Calculator)

## Type System Updates

### Extended `lesson.types.ts`:

**Added InteractiveType:**
```typescript
export type InteractiveType =
  | 'theta_decay'
  | 'delta_simulator'
  | 'pl_diagram'
  | 'spread_calculator'
  | 'greeks_dashboard'
  | 'iron_condor_builder'
  | 'generic';
```

**Enhanced InteractiveExampleScreen:**
- Added `interactive_type?: InteractiveType` field
- Extended input types to support dropdown and number inputs
- Added `name` field to inputs for easier value lookup
- Added `locked` field for read-only inputs
- Enhanced outputs with calculation, format, highlight, and note fields
- Added `chartConfig` for future chart customization options

## InteractiveExampleScreen Updates

**Enhanced rendering logic:**
- Added `getInputValue()` helper for name-based or index-based value retrieval
- Added `renderChart()` function that maps interactive_type to chart component
- Added dropdown input support
- Chart renders above inputs when interactive_type is specified
- Outputs section now conditionally renders only when outputs exist

**Chart Mapping:**
- `theta_decay` → ThetaDecayChart
- `delta_simulator` → DeltaVisualizationChart
- `pl_diagram` → ProfitLossChart
- `spread_calculator` / `iron_condor_builder` → SpreadPLChart
- `greeks_dashboard` → GreeksDashboard

## Updated Lesson Files

### Lesson 09 (Theta Decay)
- Added `interactive_type: "theta_decay"`
- Converted input `default` to `value`
- Added `name` fields to inputs
- Added empty `outputs` array

### Lesson 05 (Profit/Loss Diagram)
- Added `interactive_type: "pl_diagram"`
- Converted input structure to new format
- Added `label` and `name` fields

### Lesson 55 (Delta Explained)
- Restructured from `params` object to `inputs` array
- Added `interactive_type: "delta_simulator"`
- Added dropdown for option type selection
- Replaced complex nested structure with flat inputs

### Lesson 64 (Greeks Calculator)
- Restructured from nested `params` to flat `inputs`
- Added `interactive_type: "greeks_dashboard"`
- Converted guided experiments to teaching_points
- Simplified dropdown inputs

### Lesson 32 (Spread Calculator)
- Added `interactive_type: "spread_calculator"`
- Added stock price input slider
- Converted number inputs to sliders for better UX
- Added `name` fields to all inputs

## Design Decisions

### Color Scheme
- Primary: `#4F46E5` (Indigo-600)
- Success/Profit: `#10b981` (Green-500)
- Warning/Caution: `#f59e0b` (Amber-500)
- Danger/Loss: `#ef4444` (Red-500)
- Greeks: Blue (Delta), Green (Gamma), Red (Theta), Purple (Vega), Gray (Rho)

### Animation Strategy
- Recharts built-in animations (800ms duration)
- Framer Motion for value changes and card animations
- CountUp for smooth number transitions
- Smooth curve interpolation using `monotone` type

### Responsive Design
- All charts use `<ResponsiveContainer>` at 100% width
- Chart heights: 300-340px for optimal visibility
- Mobile-friendly touch targets
- Gradient fills for visual depth

### Educational Focus
- Real-time feedback as users adjust parameters
- Color-coded indicators for different states
- Contextual explanations that update with user input
- Visual markers for key concepts (breakeven, ATM, current position)

## Testing Approach

All priority lessons (09, 05, 55, 64, 32) have been updated with:
1. Correct `interactive_type` field
2. Properly formatted inputs with `value` instead of `default`
3. Added `name` fields for value lookup
4. Empty `outputs` arrays where needed (charts provide their own output displays)

The visualizations are now fully integrated and will render automatically when lessons are loaded.

## Future Enhancements

Potential improvements:
1. Add more sophisticated option pricing models (Black-Scholes implementation)
2. Support for multi-leg iron condors with 4+ legs
3. Historical volatility charts
4. Probability cone visualizations
5. Time-series animations showing how Greeks evolve over time
6. Export chart functionality
7. Mobile gesture support for chart interactions

## Files Modified

### Created:
- `src/components/charts/ThetaDecayChart.tsx`
- `src/components/charts/DeltaVisualizationChart.tsx`
- `src/components/charts/ProfitLossChart.tsx`
- `src/components/charts/SpreadPLChart.tsx`
- `src/components/charts/GreeksDashboard.tsx`
- `src/components/charts/index.ts`

### Modified:
- `src/types/lesson.types.ts`
- `src/components/screens/InteractiveExampleScreen.tsx`
- `content/lessons/module-1/09_theta_decay.json`
- `content/lessons/module-1/05_profit_loss_diagram.json`
- `content/lessons/module-5/55_delta_explained.json`
- `content/lessons/module-5/64_greeks_calculator.json`
- `content/lessons/module-3/32_spread_calculator.json`

## Dependencies

The implementation relies on:
- `recharts` - Chart library
- `react` - UI framework
- `framer-motion` - Animations
- `react-countup` - Number animations
- Existing Tailwind CSS configuration

No additional dependencies were required beyond Recharts itself.


# OptionUp Lessons - Review & Notes

**Purpose:** This document contains all lesson content from the OptionUp course in an easy-to-read format for review and note-taking.

**Total Lessons:** 86 lessons across 7 modules
**Last Updated:** November 6, 2025

---

## TABLE OF CONTENTS

- [Module 1: Options Fundamentals](#module-1-options-fundamentals) (Lessons 1-15)
- [Module 2: Income Strategies](#module-2-income-strategies) (Lessons 16-27)
- [Module 3: Spreads & Advanced](#module-3-spreads--advanced) (Lessons 28-42)
- [Module 4: Neutral Strategies](#module-4-neutral-strategies) (Lessons 43-54)
- [Module 5: The Greeks](#module-5-the-greeks) (Lessons 55-64)
- [Module 6: Risk Management & Taxes](#module-6-risk-management--taxes) (Lessons 65-76)
- [Module 7: Real Trades & Next Steps](#module-7-real-trades--next-steps) (Lessons 77-86)

---

## MODULE 1: OPTIONS FUNDAMENTALS
*Goal: Understand what options are, how they work, and basic terminology*

### Lesson 01: Options vs Stocks

**Time:** 6 min | **XP:** 60 | **Badge:** 🎓 Options Apprentice

**Key Concept:** Options give you leverage - control $10,000 of stock for just $200

**Hook:** Last month, NVDA moved 10%. Stock investors made $1,000. Options traders made $4,000. Same stock, same move, but 4x the returns.

**Main Points:**
- An option is a CONTRACT giving you the RIGHT (not obligation) to buy/sell 100 shares at a specific price by a specific date
- Key difference from stocks: Options EXPIRE (countdown clock), stocks don't
- 1 option contract = 100 shares (critical detail beginners miss)
- Max loss for option buyers = premium paid (defined risk)

**Analogy:** Like a house deposit - pay $5k to lock in $400k price for 90 days
- House value rises: Exercise right, profit
- House value drops: Walk away, lose only deposit
- Deposit = premium, Locked price = strike, 90 days = expiration

**Key Terms:**
- **Premium:** Price you pay for the option (e.g., $3.50 × 100 = $350 total)
- **Strike Price:** Price you can buy/sell stock at
- **Expiration Date:** Last day to use or lose it

**📝 NOTES:**


---

### Lesson 02: Calls vs Puts

**Time:** 7 min | **XP:** 70 | **Badge:** ⬆️⬇️ Call & Put Master

**Key Concept:** CALL = bet on price going UP. PUT = bet on price going DOWN

**Hook:** Stocks only make money one way. Options make money two ways.

**Main Points:**
- Only TWO types of options: Calls (up) and Puts (down)
- Every strategy uses these two building blocks
- CALL = right to BUY at strike price (profit when stock rises)
- PUT = right to SELL at strike price (profit when stock falls)

**Analogies:**
- **CALL** = Sale price coupon (lock in lower buy price, profit if value rises)
- **PUT** = Insurance policy (guarantee sell price, profit if value drops)

**Memory Trick:**
- CALL = Bullish = UP 🚀
- PUT = Bearish = DOWN 📉

**Example Math:**
- META $300 → buy $320 call for $500 → META goes to $340
- Value = ($340 - $320) × 100 = $2,000
- Profit = $2,000 - $500 = $1,500 (300% return!)

**📝 NOTES:**


---

### Lesson 03: Strike Price & Expiration

**Time:** 7 min | **XP:** 70 | **Badge:** 🎯 Strike Selector

**Key Concept:** Two decisions make or break your trade: WHAT price (strike) and by WHEN (expiration)

**Hook:** Pick wrong = lose money even if you're right about direction

**Strike Price Selection:**
- **Close to current price** = expensive but likely to profit
- **Far from price** = cheap but needs big move
- Match strike to your conviction level

**Expiration Types:**
- **Weeklies** (0-14 days): Cheap, fast movement needed, high risk
- **Monthlies** (30-90 days): Balanced, most popular
- **LEAPS** (1+ years): Expensive, works like stock, low risk

**Strategy Matching:**
- **Known catalyst (earnings)** → Short expiration
- **Uncertain timing** → 60-90 days
- **Long-term thesis** → LEAPS

**Golden Rule:** Give yourself MORE time than you think you need. Most beginners are RIGHT on direction but WRONG on timing.

**📝 NOTES:**


---

### Lesson 04: Premium: Intrinsic vs Time Value

**Time:** 8 min | **XP:** 80 | **Badge:** 💎 Premium Expert

**Key Concept:** Your option loses value every single day - even if the stock doesn't move

**Hook:** Fighting a countdown clock called theta

**Premium Breakdown:**
- **Premium = Intrinsic Value + Time Value**
- **Intrinsic:** Value if exercised RIGHT NOW (can never go negative)
- **Time Value:** What you pay for the possibility of bigger moves (ALWAYS goes to zero at expiration)

**Example Calculation:**
- NVDA at $500, own $480 call, costs $28
- Intrinsic = $500 - $480 = $20
- Time Value = $28 - $20 = $8
- That $8 will decay to zero by expiration

**Key Point:** At expiration, time value = $0. Only intrinsic remains.

**Why Options Decay:**
- Less time = less opportunity for big moves = lower value
- Time decay accelerates in final 30 days
- Even if you're right about direction, you can lose to time decay

**📝 NOTES:**


---

### Lesson 05: Profit/Loss Diagram

**Time:** 7 min | **XP:** 70 | **Badge:** 📊 Chart Reader

**Key Concept:** One chart shows your entire trade risk - max profit, max loss, breakeven

**Hook:** Professional traders look at P/L diagrams before EVERY trade

**What It Shows:**
- **X-axis:** Stock price at expiration
- **Y-axis:** Your profit/loss
- One glance = full risk picture

**Key Numbers to Find:**
1. **Max Loss:** Bottom of diagram (for option buyers = premium paid)
2. **Breakeven:** Where line crosses $0
3. **Max Profit:** Top (unlimited for calls, capped for puts)

**Breakeven Formulas:**
- **Call:** Strike Price + Premium
  - Example: $150 strike + $8 premium = $158 breakeven
- **Put:** Strike Price - Premium

**Visual Recognition:**
- **Call diagram:** Line goes UP to right (unlimited upside)
- **Put diagram:** Line goes DOWN to left (capped at $0)
- Max loss for both = flat line at -Premium

**📝 NOTES:**


---

### Lesson 06: Buying a Call

**Time:** 8 min | **XP:** 80 | **Badge:** 📞 Call Buyer

**Key Concept:** Simplest bullish trade - leveraged upside with defined risk

**When to Buy Calls:**
- Bullish and expect upward movement
- Best scenarios: earnings, product launches, technical breakouts, sector momentum

**Strike Selection for Calls:**
- **Conservative:** ATM or slightly OTM
- **Aggressive:** 10-20% OTM
- Rule: Give yourself 60%+ probability of profit
- Check delta (0.5 = 50% chance of ITM)

**Exit Strategy:**
- Take profits at 50-100% gain
- Cut losses at -50%
- Don't hold to expiration unless deep ITM
- Time decay accelerates in final 30 days

**Common Mistakes:**
- Buying short-dated OTM calls (high risk)
- Not taking profits (greed)
- Stock moved up 5% but call is down (theta > delta)

**Professional Tip:** Sell half at 100% gain, let rest ride on house money

**📝 NOTES:**


---

### Lesson 07: Buying a Put

**Time:** 8 min | **XP:** 80 | **Badge:** 🐻 Bear Trader

**Key Concept:** Make money when stocks crash - hedging and bearish trades

**Two Reasons to Buy Puts:**
1. **PROTECTION:** Hedge stocks you own (protective put = insurance)
2. **SPECULATION:** Bet on price drops (naked put = bearish trade)

**When to Buy Puts:**
- Bearish (think stock drops)
- Want protection on stocks you own
- Expecting volatility/big move down

**Max Profit:** Limited to strike price (stock can only go to $0)
- Example: $100 put, stock goes to $0 = $10,000 max profit per contract

**Protective Put Strategy:**
- Own 100 NVDA at $500
- Buy $480 put for protection
- If NVDA crashes to $300, put lets you sell at $480
- You risk $20/share but protect against unlimited downside

**Put vs Short Selling:**
- **Put:** Max loss = premium (defined risk)
- **Short Stock:** UNLIMITED loss if stock rises
- Puts are safer for bearish bets

**📝 NOTES:**


---

### Lesson 08: In the Money vs Out of the Money

**Time:** 7 min | **XP:** 70 | **Badge:** 🎯 Moneyness Master

**Key Concept:** This determines if your option has ANY value right now

**The Three States:**
- **ITM (In The Money):** Has intrinsic value if exercised now
- **ATM (At The Money):** Strike equals stock price
- **OTM (Out of The Money):** Zero intrinsic value, only time value

**For CALLS:**
- **ITM:** Stock ABOVE strike ($250 stock, $230 call = $20 ITM)
- **ATM:** Stock equals strike ($250 stock, $250 call)
- **OTM:** Stock BELOW strike ($250 stock, $270 call = $20 OTM)

**For PUTS (opposite):**
- **ITM:** Stock BELOW strike ($180 stock, $200 put = $20 ITM)
- **ATM:** Stock equals strike
- **OTM:** Stock ABOVE strike ($180 stock, $160 put = $20 OTM)

**Risk Profile:**
- **ITM:** Safer, expensive, already has value, behaves like stock
- **ATM:** Balanced risk/reward, most liquid
- **OTM:** Risky, cheap, needs big moves, high leverage

**Memory Aid:** "In" = already winning

**📝 NOTES:**


---

### Lesson 09: Theta - Why Options Decay

**Time:** 8 min | **XP:** 80 | **Badge:** ⏰ Theta Warrior

**Key Concept:** Your option loses $50 every single day due to time decay

**Hook:** Stock doesn't move. Market closed. Yet your call drops $450 to $500 overnight.

**What is Theta:**
- Rate at which option loses value as time passes
- Every day closer to expiration = less time for stock to move = lower value
- Accelerates in final 30 days
- At expiration, time value = $0 (always)

**Theta Examples:**
- Theta = -$0.50 means lose $50/day per contract (×100 shares)
- 90-day option: might lose $5/day
- 7-day option: might lose $30+/day (exponential acceleration)

**Weekend Theta:** Options decay over weekends even though market is closed (clock never stops)

**The Theta Trap:**
- Stock moves up 3% (good)
- But option expires in 2 days (massive theta)
- Your gains from stock movement erased by time decay
- Result: flat or down even though you were "right"

**How to Fight Theta:**
- Buy longer expirations (90+ days)
- Avoid holding through final 30 days
- Sell winners early (50-100% gain)
- Cut losers fast (-50%)
- OR become a seller and LET theta work for you

**The Theta Rule:** Never buy options with <30 days unless you have SPECIFIC catalyst (earnings)

**📝 NOTES:**


---

### Lesson 10: Assignment & Exercise

**Time:** 7 min | **XP:** 70 | **Badge:** 📬 Assignment Expert

**Key Concept:** Friday 4pm - your broker just assigned you 100 shares you didn't plan to buy

**Definitions:**
- **EXERCISE:** YOU decide to use your option (buy/sell shares at strike)
- **ASSIGNMENT:** SOMEONE ELSE exercised and YOU'RE on the hook to deliver
- Happens automatically if option is ITM at expiration

**What 95% of Traders Do:**
SELL the option before expiration for cash. Never exercise, never get assigned. Treat options like trading cards - buy low, sell high, collect cash.

**Automatic Exercise:**
- If your option is ITM by $0.01+ at 4pm Friday
- Most brokers auto-exercise
- Monday morning: you own shares (calls) or are short (puts)
- Avoid surprise: SELL before 4pm or have cash ready

**Who Has Assignment Risk:**
- Only option SELLERS have assignment risk
- If you only BUY options, you control when/if to exercise
- You can't be assigned if you're a buyer
- This is why beginners should stick to buying initially

**Example Scenario:**
- You own $100 call, stock at $105, forgot to sell
- Your broker exercises automatically
- Monday: you own 100 shares (need $10,000 in account)
- If you don't have cash = on margin (borrowing) = paying interest

**Pro Tip:** Always SELL options before expiration for cash, don't exercise

**📝 NOTES:**


---

### Lesson 11: Max Loss vs Max Gain

**Time:** 7 min | **XP:** 70 | **Badge:** 🛡️ Risk Manager

**Key Concept:** Know your max loss BEFORE you click buy

**Hook:** Professional rule: Never enter a trade without knowing worst-case scenario

**Definitions:**
- **MAX LOSS:** MOST you can lose if everything goes wrong
  - For option buyers = premium paid (always defined)
- **MAX GAIN:** MOST you can profit if everything goes right
  - Calls = unlimited
  - Puts = strike × 100

**Risk/Reward Concepts:**
- **Risk/Reward Ratio:** How much you can make vs risk
  - Good: Risk $500, make $2,000 = 4:1 ratio
  - Bad: Risk $1,000, make $500 = 1:2 ratio
  - Target: At least 2:1 for most trades

- **Defined Risk:** Loss is CAPPED at specific dollar amount
  - Buying options = defined risk (max loss = premium)
  - Shorting stock = UNLIMITED risk

- **Risk of Ruin:** Betting too much on one trade can blow up account
  - Example: $10k account, $5k risk (50%), three losses = broke
  - Rule: Keep risk to 2-5% per trade

**Position Sizing:**
- Account = poker stack
- Each trade = a hand
- Bet small (2-5% risk), live to play 20-50 more hands
- Bet big (50%), one bad hand = game over

**Taking Profits:**
- 50-100% gain = sell at least half
- 200%+ = sell 75%
- Rule: "Pigs get fat, hogs get slaughtered"
- Lock in wins, let runners run with house money

**📝 NOTES:**


---

### Lesson 12: Position Sizing

**Time:** 8 min | **XP:** 80 | **Badge:** 📐 Position Sizer

**Key Concept:** Same trade, two traders: One makes $50k, one loses everything. The difference? Position sizing.

**Position Sizing Formula:**
- Position Size = (Account Size × Risk %) ÷ Max Loss per Contract

**Example:**
- $20,000 account
- 3% risk tolerance
- Risk per trade = $20,000 × 0.03 = $600
- If option costs $600 = buy 1 contract
- If option costs $300 = can buy 2 contracts
- If option costs $1,200 = skip trade or accept 6% risk

**The Math of Ruin:**
- 10% risk per trade × 10 losses = 100% gone
- Even 7 losses in a row at 10% = down 50%+
- Recovering from -50% requires +100% gains (fighting uphill)

**Risk % Guidelines:**
- **Beginners:** 1-2% (ultra-safe, learn without pain)
- **Intermediate:** 2-5% (balance growth/safety)
- **Advanced:** 3-7% (only with proven edge)
- **Never:** >10% per trade. Ever.

**Trader A vs Trader B:**
- Both have winning strategy
- Trader A risks 5% per trade
- Trader B risks 50% per trade
- After 10-trade losing streak:
  - Trader A: down 20% (can recover)
  - Trader B: broke (game over)

**What If Position Doesn't Fit?**
- Skip the trade
- Yes, it's hard
- Yes, you'll miss winners
- But discipline keeps you alive for the NEXT 100 trades

**📝 NOTES:**


---

### Lesson 13: Liquidity & Bid-Ask Spread

**Time:** 7 min | **XP:** 70 | **Badge:** 💧 Liquidity Hunter

**Key Concept:** Your option is up 200%... but nobody will buy it

**Hook:** Trying to sell for $5. Bid is $2.50. Ask is $7.50. Spread is $5 - that's 100% of value!

**Definitions:**
- **LIQUIDITY:** How easily you can buy/sell without moving the price
- **BID:** Highest price buyers offer (you sell here)
- **ASK:** Lowest price sellers want (you buy here)
- **SPREAD:** Ask - Bid (the cost of trading)

**Example:**
- Bid $4.90, Ask $5.10 = $0.20 spread (GOOD - only 2% slippage)
- Bid $3.00, Ask $6.00 = $3 spread (TERRIBLE - 57% slippage!)

**Key Metrics:**
- **Open Interest:** Total outstanding contracts
  - Want: 1,000+ (liquid)
  - Avoid: <100 (illiquid, hard to exit)
- **Volume:** Contracts traded TODAY
  - Want: 1,000+ daily
  - Avoid: <50 (ghost town)
- **Spread:** Ask - Bid
  - Want: <5% of option price
  - Avoid: >10% spread

**Slippage Example:**
- You pay $5.10 (ask)
- You sell at $4.90 (bid)
- = $0.20 instant loss per share × 100 = $20 per contract
- Wide spreads = expensive slippage

**Which Options Are Most Liquid:**
- SPY, QQQ, AAPL, MSFT, TSLA, NVDA (mega caps)
- ATM and slightly OTM strikes
- Monthly expirations (not weeklies far out)

**If Stuck in Illiquid Option:**
- Place limit order at midpoint, wait hours/days
- Sell at bid and take the loss
- Hold to expiration if ITM
- Lesson learned: check liquidity BEFORE buying!

**📝 NOTES:**


---

### Lesson 14: Choosing Expiration Dates

**Time:** 8 min | **XP:** 80 | **Badge:** 📅 Expiration Expert

**Key Concept:** Right prediction, wrong timing = $0

**Hook:** You predicted TSLA would hit $300. It did... 3 days after your options expired.

**Expiration Types:**
- **WEEKLIES (0-14 days):** High risk, theta acceleration, cheap, binary outcome, 80% expire worthless
- **MONTHLIES (30-90 days):** Balanced, most popular, sweet spot for directional trades
- **QUARTERLIES (90-120 days):** Slower pace, good time cushion
- **LEAPS (12+ months):** Behaves like stock (delta ~0.80), lower risk, expensive

**Match Expiration to Catalyst:**
- **Known catalyst (earnings in 3 days):** Use weeklies (no need to pay for extra time)
- **Uncertain timing (sector rotation):** Use 60-90 days monthlies
- **Long-term thesis (AI boom over 2 years):** Use LEAPS

**The 30-Day Rule:**
- Avoid buying options with <30 days unless you have specific near-term catalyst
- Theta accelerates after 30 days
- Exception: earnings, Fed meetings, product launches

**Rolling Options:**
- Roll when: Thesis intact but need more time, can roll for credit/small debit, >30 days left on new expiration
- Don't roll when: Down 50%+ (accept loss), thesis broken, just hoping

**Example Comparison:**
- Want 3-month view on stock
- 7-day option: $2 each, need to roll 12x = $24+ total
- 45-day option: $5 once = perfect timeframe
- 365-day option: $15 = overpaying for 9 extra months
- Match expiration to thesis!

**📝 NOTES:**


---

### Lesson 15: Reading an Options Chain

**Time:** 9 min | **XP:** 90 | **Badge:** 🎓 Module 1 Complete!

**Key Concept:** This screen has all the data you need to trade

**Hook:** Beginners see chaos. Pros see opportunity.

**Options Chain Layout:**
- **LEFT side:** Calls (bullish)
- **CENTER:** Current stock price
- **RIGHT side:** Puts (bearish)
- **ROWS:** Different strike prices
- **COLUMNS:** Bid, Ask, Volume, Open Interest, IV, Greeks

**Key Columns:**
- **Volume:** Contracts traded TODAY (resets daily)
  - Want: 1,000+ (liquid)
- **Open Interest (OI):** Total outstanding contracts
  - Updates overnight
  - Want: 1,000+ (liquid market)
- **Implied Volatility (IV):** Market's expectation of future volatility (%)
  - High IV before earnings = big move expected
  - Low IV in quiet periods
  - Affects premium price

**Pre-Buy Checklist:**
1. Bid-Ask spread (<5% of price)
2. Volume (1,000+ today)
3. Open Interest (1,000+ total)
4. IV level (high = expensive)
5. Delta (probability)

**Where Are Most Liquid Options:**
- ATM and 1-2 strikes OTM (highest volume/OI)
- Monthly expirations (not weeklies far out)
- Mega-cap stocks (SPY, QQQ, AAPL, TSLA, NVDA)

**Example Analysis:**
- Strike $150: Bid $4.90, Ask $5.10, Volume 8,500, OI 45,000
- Spread = $0.20 (4%) ✅
- Volume = 8,500 ✅
- OI = 45,000 ✅
- This is VERY LIQUID - trade it!

**📝 NOTES:**


---

## MODULE 2: INCOME STRATEGIES
*Goal: Generate consistent income from stocks you own or want to own*

### Lesson 16: Covered Call Basics

**Time:** 8 min | **XP:** 80 | **Badge:** 🏠 Landlord

**Key Concept:** Collect "rent" ($350/month) from stocks you already own

**Hook:** Want to collect $350 every month from stocks you already own?

**Definition:**
- You OWN 100 shares of stock
- SELL someone the right to buy it from you at higher price (strike)
- They pay you premium
- You keep premium no matter what

**Analogy:** Being a landlord
- You own house ($200k stock)
- Tenant pays $1,000/month rent (premium)
- Tenant has option to buy house for $220k (strike)
- If they buy: you profit $20k + all rent collected
- If they don't buy: you keep house + all rent

**Key Terms:**
- **Covered:** You OWN the 100 shares (not naked/risky)
- **Strike Price:** Price someone can buy your stock at
- **Premium Collected:** Income you receive upfront (yours to keep)
- **Assignment:** When stock gets "called away" (sold at strike)

**Max Profit Example:**
- Own 100 MSFT at $300
- Sell $320 call for $5/share ($500 premium)
- Max profit = $500 premium + $2,000 stock gain = $2,500
- Upside is CAPPED at strike - that's the trade-off

**Biggest Risk:**
- Stock crashes (you lose on stock value)
- Premium gives small cushion but doesn't protect from major drops
- Example: Stock crashes $180 → $120 = lose $6,000 on stock, keep $350 premium = -$5,650 net

**Best Case:**
- Stock stays below strike
- Option expires worthless
- You keep stock + premium
- Repeat next month!

**📝 NOTES:**


---

### Lesson 17: Covered Call Calculator

**Time:** 8 min | **XP:** 80 | **Badge:** 🧮 Income Calculator

**Key Concept:** Is 1.9% return in 30 days good or bad? Let's do the math.

**The 3 Numbers That Matter:**
1. Max Profit (if called away)
2. Income (if expires)
3. Breakeven (if stock drops)

**Calculation #1: Max Profit (Stock Called Away)**
- Formula: `[(Strike - Cost Basis) × 100] + (Premium × 100)`
- Example:
  - Cost basis $180, Strike $190, Premium $3.50
  - Capital gain: ($190-$180) × 100 = $1,000
  - Premium: $3.50 × 100 = $350
  - Total: $1,350
  - ROI: ($10 + $3.50) / $180 = 7.5%

**Calculation #2: Premium Income (Stock Stays Flat)**
- Formula: `(Premium / Stock Price) × (30 / Days)`
- Example:
  - Premium $3.50, Stock $185, 30 DTE
  - Monthly return: ($3.50 / $185) = 1.89%
  - Annualized: 1.89% × 12 = 22.7%

**Calculation #3: Breakeven & Downside Cushion**
- Formula: `Current Price - Premium`
- Example:
  - Stock $185, Premium $3.50
  - Breakeven = $185 - $3.50 = $181.50
  - Cushion = 1.89% (stock can drop 1.89% before you lose money)

**Target Returns:**
- Most covered calls target 1-3% monthly return
- Annualized: 12-36%
- Compare to: CDs (5%), dividend stocks (2-4%), S&P 500 (10% historical)

**📝 NOTES:**


---

### Lesson 18: Strike Selection Strategy

**Time:** 7 min | **XP:** 70 | **Badge:** 🎯 Strike Picker

**Key Concept:** Why did you choose THAT strike price?

**Strike Selection = Risk vs Reward:**
- **Higher strikes:** MORE upside potential, LESS premium income
- **Lower strikes:** MORE premium income, cap gains sooner

**3 Types of Strikes:**
- **At-The-Money (ATM):** Strike = stock price, highest premium, immediate cap
- **Out-of-The-Money (OTM):** Strike > stock price, lower premium, room for stock gain
- **Delta:** Probability option ends ITM (0.30 = ~30% chance of assignment)

**Strike Selection by Outlook:**
- **Neutral to bearish:** Sell ATM strikes (max premium, don't expect stock to run)
- **Slightly bullish:** Sell OTM 2-5% above current price (balanced)
- **Very bullish:** DON'T sell calls OR sell FAR OTM (>10%) to preserve upside

**Example Comparison:**
Stock at $180:
- $180 ATM: $5 premium, 0% upside, 50% assignment prob
- $185 OTM: $3.50 premium, 2.8% upside, 35% assignment prob
- $190 OTM: $2 premium, 5.6% upside, 20% assignment prob

**Rule:** Match strike to YOUR outlook. If very bullish and expect big gains, don't cap upside with covered call. Wait for thesis to play out, THEN start selling calls.

**📝 NOTES:**


---

### Lesson 19: Closing Covered Calls Early

**Time:** 7 min | **XP:** 70 | **Badge:** 🚪 Exit Expert

**Key Concept:** You sold call for $3. Now it's worth $0.30. Close early and redeploy capital!

**Hook:** Most beginners wait until expiration - missing huge opportunities

**Closing = Buying Back Your Sold Call:**
- When you SELL a covered call, you can BUY it back anytime
- If option has decayed toward $0, buy it back cheap
- Keep most of original premium
- Sell NEW call immediately
- This is how pros maximize income

**The 50% Rule:**
- Common strategy: close when option decays to 50% of value
- Example: Sold for $2, close when it hits $1 (50% profit captured)
- Simple, effective, proven

**When to DEFINITELY Close:**
- Option decayed 70%+ AND >2 weeks remaining
- Example: Sold $5, now $1, with 20 days left
- Close, lock profit, sell new call

**When to WAIT:**
- Less than 3-5 days to expiration
- OR option still has significant value (>50%)
- Let time decay work for you

**Example:**
- Sold call for $4.00
- A week later worth $2.00
- 3+ weeks left: wait longer (might get closer to $0)
- <1 week left: close now and sell new 30-day call

**Time Efficiency:**
- Like rental: tenant cancels early for $50 buyout
- You keep $450 profit in 1 week instead of $500 in 1 month
- Immediately rent to someone else for another $500
- $450/week > $500/month!

**📝 NOTES:**


---

### Lesson 20: Covered Call Mistakes

**Time:** 7 min | **XP:** 70 | **Badge:** ⚠️ Mistake Avoider

**Key Concept:** Why did I just get assigned the day before earnings?!

**Mistake #1: Ignoring Dividend Dates**
- If you sell covered call and stock pays dividend
- Call buyer might exercise EARLY (day before ex-div) to capture dividend
- You lose both dividend AND your stock
- **Solution:** Close call before ex-dividend date

**Example:**
- Stock pays $2 dividend Friday (ex-div)
- Your $180 call worth $6
- Call buyer exercises Thursday night to get $2 dividend
- You lose stock + $2 dividend
- **Rule:** Close ITM calls before ex-div date

**Mistake #2: Earnings Gaps**
- Sold $200 call on Monday
- Earnings Thursday after close
- Stock at $195 (below strike - seems safe)
- Stock gaps to $220 Friday on great earnings
- You're assigned at $200, missing $20/share = $2,000
- **Solution:** Close calls BEFORE major events or sell far OTM

**Mistake #3: Selling Calls on Stocks You Love**
- Don't sell covered calls on core long-term holdings
- If stock 10x after assignment, you'll regret it forever
- Only use for "trading" positions you're OK selling
- **Analogy:** Don't rent out your dream car

**Mistake #4: Panic Trading**
- Stock drops, you panic buy back call at loss
- Remember: you OWN the stock anyway!
- Premium is your cushion
- Don't close just because stock dropped

**Mistake #5: Ignoring Taxes**
- Getting assigned triggers capital gains tax
- Track your cost basis
- Short-term gains (<1 year) = higher tax rate
- Factor taxes into return calculations

**📝 NOTES:**


---

### Lesson 21: Covered Call Case Study

**Time:** 8 min | **XP:** 80 | **Badge:** 📈 Trade Analyst

**Key Concept:** Real 6-month covered call campaign on MSFT - every trade, decision, mistake

**Setup:**
- Bought 100 MSFT at $366 (Jan 2024)
- Investment: $36,600
- Goal: 2% monthly income
- Strategy: Sell 30-45 day calls, 5-7% OTM, close at 50%

**Trade Results:**
Month 1: Sold Feb $385 call for $720 → Closed at 51% profit ($370 net in 17 days) ✅
Month 2: Sold Mar $390 call for $680 → Expired worthless ($680 kept) ✅
Month 3: Sold Apr $400 call for $550 → ASSIGNED (MSFT hit $410) ❌
- Mistake: Missed $10/share ($1,000) in gains
Month 4: Re-bought MSFT at $415 (FOMO) ❌
- Emotional trade - paid $15/share MORE to get back in
Months 5-6: Sold covered calls, collected $1,400 more

**Final Results:**
- Total premiums: $4,750
- Stock gains: $3,400
- BUT: FOMO re-entry cost $4,900
- Net profit: $5,550 on $78,100 invested = 7.1% (vs simple hold)

**BIGGEST MISTAKE:**
- Getting assigned at $400 was fine (planned)
- Buying back at $415 was EMOTIONAL
- Should have: waited for pullback, moved to different stock, or walked away
- Chasing cost $4,900!

**Alternative Outcomes:**
- Buy & Hold (no calls): $7,490 (20.5%)
- Perfect Wheel (no FOMO): $5,770 (15.8%)
- Far OTM Calls (10%): $9,290 (25.4%)

**Lesson:** Match strategy to outlook. Bullish? Go far OTM or skip calls. Neutral? ATM/slight OTM.

**📝 NOTES:**


---

### Lesson 22: Cash-Secured Put Basics

**Time:** 8 min | **XP:** 80 | **Badge:** 💰 Premium Collector

**Key Concept:** Get paid $500 to wait for a stock you want to buy anyway

**Hook:** CSPs are the "flip side" of covered calls - generate income from stocks you WANT to own

**Definition:**
- You SELL a put option
- Set aside cash to buy 100 shares
- If stock drops below strike: you're ASSIGNED (buy shares at strike)
- If stock stays above strike: you keep premium and try again
- Either way, you win!

**Analogy:** Writing insurance
- Someone wants insurance on car (stock)
- They pay you $500 premium
- You promise: "If car worth <$20k (strike), I'll buy it for $20k"
- Car stays fine: you keep $500
- Car totals: you buy at $20k (which you agreed to)

**Key Terms:**
- **Cash-Secured:** You have CASH set aside to buy 100 shares
  - $350 strike = need $35,000 available
- **Put Option Sold:** You sold someone right to sell YOU the stock
- **Assignment:** You're obligated to BUY 100 shares at strike
- **Effective Cost Basis:** Strike price MINUS premium collected

**Example:**
- Want to buy AAPL at $180 or lower
- AAPL currently $200
- Sell $180 put for $3-4 premium
- If AAPL drops to $180: assigned at $180 (effective cost $176-177 after premium)
- If AAPL stays $200: keep premium, try again next month

**Best Case:** Stock stays ABOVE strike = put expires worthless, keep 100% premium, repeat monthly

**Worst Case:** Stock crashes to $0 = assigned at strike, hold worthless shares (ONLY sell puts on stocks you'd want to own!)

**📝 NOTES:**


---

### Lesson 23: CSP Calculator

**Time:** 8 min | **XP:** 80 | **Badge:** 🧮 Put Calculator

**Key Concept:** Is 1.4% monthly return on cash good enough?

**The 4 CSP Calculations:**
1. ROI on cash reserved
2. Annualized return
3. Effective purchase price if assigned
4. Breakeven price

**Calculation #1: Return on Cash Reserved**
- Formula: `(Premium × 100) / (Strike × 100) × 100%`
- Example:
  - Strike $360, Premium $5, 30 DTE
  - Cash reserved: $36,000
  - Premium income: $500
  - Return on cash: ($500 / $36,000) = 1.39%
  - Annualized: 1.39% × 12 = 16.7%

**Calculation #2: Effective Purchase Price**
- Formula: `Strike Price - Premium Collected`
- Example:
  - Strike $360, Premium $5
  - Effective cost = $360 - $5 = $355
  - If assigned at $360 when market is $345:
    - You paid $360 but effective cost $355
    - Currently down: $355 - $345 = -$10/share = -$1,000

**Strike Comparison:**
Stock at $380:
- $360 put (5% OTM): $5 premium, 1.4% ROI, 17% annual, 30% assignment prob
- $370 put (3% OTM): $7 premium, 1.9% ROI, 23% annual, 40% assignment prob
- $380 put (ATM): $11 premium, 2.9% ROI, 35% annual, 50% assignment prob

**Decision Framework:**
- Want to own stock? → ATM (high premium, high assignment chance)
- Don't want stock? → OTM (low premium, low assignment risk)

**Compare to Alternatives:**
- CD rates: 5% annual
- Dividend stocks: 2-4% annual
- CSPs: 12-36% annual (but with assignment risk)

**📝 NOTES:**


---

### Lesson 24: Getting Assigned - Is It Bad?

**Time:** 7 min | **XP:** 70 | **Badge:** 📦 Assignment Handler

**Key Concept:** ASSIGNED: You bought 100 shares. Now what?

**Hook:** Getting assigned terrifies beginners. But it's NOT a disaster - it's part of the strategy!

**Assignment = Not a Punishment:**
- You sold put, assignment means you're OBLIGATED to buy 100 shares at strike
- Happens when stock drops below strike at expiration
- You already collected premium, so effective cost is lower than strike
- You bought the stock you wanted - just at a discount!

**Example:**
- Sold $100 put for $3 premium
- Stock drops to $90 at expiration
- Assignment price: $100 (you buy at strike, not market)
- Effective cost: $100 - $3 = $97
- Current market: $90
- You're $7/share underwater ($700 total)
- BUT you wanted this stock at $100, now you got in at $97

**What to Do When Assigned Underwater:**
- **If still bullish:** HOLD (you wanted it at $150, now "on sale" at $130)
- **If neutral:** Sell covered call to collect more premium and reduce cost basis
- **Only panic sellers:** Immediately sell at loss (don't be one!)

**Assignment Isn't Bad - It's The Plan:**
- You bought stock you WANTED
- At price you CHOSE
- Premium reduced your cost
- Getting assigned is the PLAN, not a failure

**How to Avoid Assignment:**
- Sell far OTM puts (10%+ below stock price)
- Lower premium but much safer
- OR close put early if stock is dropping

**📝 NOTES:**


---

### Lesson 25: The Wheel Strategy

**Time:** 8 min | **XP:** 80 | **Badge:** 🎡 Wheel Master

**Key Concept:** Generate income whether you own a stock or not - the infinite income loop

**Hook:** What if you could generate income in ALL market conditions?

**The Wheel Cycle:**
1. **Phase 1:** Sell CSP, collect premium (no stock)
2. **Phase 2:** Get assigned, buy stock
3. **Phase 3:** Sell covered call on shares, collect premium (own stock)
4. **Phase 4:** Get called away, sell stock
5. **Repeat:** Back to Phase 1 forever

**Key Point:** You generate income at EVERY step, whether you own stock or not!

**Example 6-Month Campaign:**
Months 1-2: Sold CSPs, collected $1,100, no assignment
Month 3: Assigned at $350 (stock $340), collected $800
Months 4-5: Sold covered calls, collected $1,100 more
Month 6: Called away at $360 (stock gain $1,000)
**Total:** $3,600 profit ($2,600 premiums + $1,000 stock gain) = 20.6% annualized

**Best Market for Wheel:**
- SIDEWAYS markets with volatility
- Stock bounces in range = collect premium every month
- Bull markets = wheel underperforms buy & hold (capped upside)
- Bear markets = wheel softens crashes (premium cushion)

**Real Performance:**
- Bull market (+20%): Wheel 17.7% vs Buy & Hold 20% (underperforms)
- Flat market (±5%): Wheel 20.6% vs Buy & Hold 0% (CRUSHES)
- Bear market (-20%): Wheel 4% vs Buy & Hold -20% (protects)

**Biggest Wheel Mistake:**
- Getting impatient when underwater
- If assigned at $350 and stock drops to $320, DON'T panic sell
- Keep selling covered calls to lower cost basis
- Each $500 premium = -$5/share cost
- Patience wins

**Analogy:** Running a pawn shop
- Customer promises to sell item (CSP)
- You buy item when needed (assignment)
- You offer to sell item (covered call)
- Item sells (called away)
- Repeat forever

**📝 NOTES:**


---

### Lesson 26: Picking Stocks for CSPs

**Time:** 7 min | **XP:** 70 | **Badge:** 🔍 Stock Screener

**Key Concept:** Stock selection is 70% of CSP success

**Hook:** Why did your CSP lose 40% while mine made 20%?

**The Golden Rule:** Only sell puts on stocks you WANT to own
- If you wouldn't buy 100 shares at this price TODAY, don't sell a put
- Getting assigned should be HAPPY outcome, not disaster
- If assignment scares you = wrong stock

**5 Criteria for CSP Stocks:**
1. **Quality Company:** Strong business, good financials, you'd hold 5+ years if needed
   - ✅ AAPL, MSFT, GOOGL
   - ❌ Meme stocks, penny stocks

2. **High Implied Volatility:** Higher IV = bigger premiums
   - Look for IV Rank >50 or premiums >2% monthly

3. **Liquid Options:** Tight bid-ask, high volume
   - ✅ Spread $0.05-0.10
   - ❌ Spread $0.50+

4. **Support Level Nearby:** Technical support near strike
   - Stock $380, support at $360, sell $360 put

5. **Reasonable Valuation:** Not at all-time highs, not bubble
   - ✅ P/E 20-30
   - ❌ P/E 200

**Stock Comparison:**
**AAPL:**
- Quality: ✅ Excellent
- IV: 45 (moderate premiums)
- Liquidity: ✅ Excellent
- Support: Strong at $170
- Valuation: Fair (P/E 28)
- Premium: $3.50 (2.1% monthly)
- **Verdict:** 9/10 - Great CSP candidate

**TSLA:**
- Quality: ⚠️ Good but volatile
- IV: 75 (high premiums)
- Liquidity: ✅ Excellent
- Support: Weak
- Valuation: ⚠️ High (P/E 60)
- Premium: $12 (6% monthly!)
- **Verdict:** 6/10 - Only if you LOVE Tesla

**SOXL (3x leveraged):**
- Quality: ❌ Not a stock (decay)
- IV: 95 (insanely high)
- Support: None
- Premium: $8 (10% monthly - too good to be true)
- **Verdict:** 2/10 - AVOID (gambling, not investing)

**Red Flags to Avoid:**
- Meme stocks you don't believe in
- Leveraged ETFs
- Penny stocks
- Stocks with bad earnings
- Anything you wouldn't hold if assigned

**📝 NOTES:**


---

### Lesson 27: CSP Case Study - Real Trade

**Time:** 8 min | **XP:** 80 | **Badge:** 📊 CSP Analyst

**Key Concept:** Real 9-month CSP campaign: $35,000 cash, Disney (DIS), 13 trades

**Setup:**
- $35,000 cash in savings (earning 5% APY = $1,750/year)
- Wanted to build Disney position long-term
- Strategy: Sell 30-day puts, 5-8% below price, target 2% monthly

**Key Trades:**
Months 1-2: Sold puts, collected $1,350, no assignment
Month 3: Assigned at $115 (DIS dropped to $105)
- Now own 100 DIS at $115, market $105 = -$1,000 unrealized
- ❌ Mistake: Market turned, earnings weak
Month 4-6: Sold covered calls, collected $1,450
- Month 4: Sold $120 call for $350 (14% OTM - too far!) ❌
- Months 5-6: Sold $115 calls, collected $950
Month 6: Called away at $115 (stock recovered to $116)
- Stock P/L: $0 (bought $115, sold $115)
Months 7-9: Back to CSPs, collected $1,800

**Final Results:**
- Total premiums: $6,250
- Stock P/L: $0
- Net profit: $4,250
- Starting cash: $35,000
- ROI: 12.1% in 9 months (16.1% annualized)
- vs Savings: Would have earned $1,313 at 5%
- Alpha: +$2,937

**BIGGEST MISTAKE:**
- When assigned at $115 with stock at $105, sold $120 call (14% OTM)
- Too conservative! Only collected $350
- Should have sold $110-112 calls for $600-700
- Cost: $250-350 lost income
- **Lesson:** When underwater, sell ATM covered calls for MAX premium to recover faster

**Alternative Strategies Compared:**
- Actual CSP: $4,250 (12.1% in 9 months)
- Savings Account: $1,313 (5% annual) - simple but lowest
- Buy & Hold DIS: $380 (almost no return, same drawdown)
- S&P 500 Index: $5,450 (22% return) - best return, simplest
- Aggressive CSPs: $8,500 estimated (but very active, high stress)

**Was It Worth It?**
- Beat savings by 11% annualized
- But S&P 500 outperformed by 6%
- Depends on YOUR goals:
  - Want income on idle cash? CSPs are great
  - Purely growth-focused? Maybe stick to index funds
  - Have time to manage? CSPs add value

**Key Lessons:**
- Even 5-8% OTM, assignment happens (markets drop!)
- After assignment underwater, sell ATM calls (not far OTM)
- Compare CSP returns to alternatives (savings, stocks, bonds)
- CSPs best for: income on cash you're waiting to deploy

**📝 NOTES:**


---

## MODULE 3: SPREADS & ADVANCED
*Goal: Learn how to combine options for defined risk/reward profiles*

### Lesson 28: What is a Spread?
- Introduction to combining multiple options
- Defined risk/defined reward strategies

### Lesson 29: Bull Call Spread
- Buying + selling calls for bullish plays
- Lower cost than buying calls alone
- Capped profit and loss

### Lesson 30: Bear Put Spread
- Buying + selling puts for bearish plays
- Defined risk bearish strategy

### Lesson 31: Credit Spreads vs Debit Spreads
- Understanding premium collection vs payment
- When to use each type

### Lesson 32: Spread Calculator
- Interactive tool for spread P/L calculations

### Lesson 33: Managing Spreads
- When to close, roll, or hold spreads
- Adjustment strategies

### Lesson 34: Spread Selection
- Choosing the right strikes for spreads
- Risk/reward optimization

### Lesson 35: Vertical Spread Case Study
- Real trade analysis with spreads

### Lesson 36: Long Straddle
- Betting on big moves (either direction)
- High volatility plays

### Lesson 37: Long Strangle
- Similar to straddle but cheaper (OTM)

### Lesson 38: Calendar Spread
- Different expirations, same strike
- Theta capture strategy

### Lesson 39: Diagonal Spread
- Different expirations + different strikes
- Hybrid strategy

### Lesson 40: LEAPS
- Long-term options (1-2 years)
- Stock replacement strategies

### Lesson 41: Poor Man's Covered Call
- Using LEAPS instead of owning stock
- Lower capital requirement

### Lesson 42: When NOT to Trade
- Recognizing bad setups
- Discipline and patience

**📝 MODULE 3 NOTES:**


---

## MODULE 4: NEUTRAL STRATEGIES
*Goal: Profit from sideways markets and manage volatility*

### Lesson 43: Short Strangle
- Selling OTM calls + puts
- Collect premium in range-bound markets

### Lesson 44: Iron Condor Basics
- Four-leg strategy for neutral outlook
- Popular income strategy

### Lesson 45: Iron Condor Management
- Adjustments and exit strategies
- Managing winners and losers

### Lesson 46: Butterfly Spread
- Precise price prediction strategy
- Low cost, defined risk

### Lesson 47: Iron Butterfly
- ATM version of iron condor
- Higher premium collection

### Lesson 48: Comparing Neutral Strategies
- When to use each neutral strategy
- Risk/reward comparison

### Lesson 49: Double Diagonal
- Calendar spreads on both sides
- Theta collection strategy

### Lesson 50: Jade Lizard
- Bullish-neutral strategy
- No upside risk

### Lesson 51: Big Lizard
- Variation of jade lizard

### Lesson 52: Ratio Spreads (Caution)
- Advanced: unbalanced spreads
- High risk if wrong

### Lesson 53: Adjusting Losing Trades
- Techniques to save losing positions
- When to cut vs adjust

### Lesson 54: Probability of Profit
- Understanding win rates
- Expected value calculations

**📝 MODULE 4 NOTES:**


---

## MODULE 5: THE GREEKS
*Goal: Master the forces that drive option prices*

### Lesson 55: Delta Explained
- Price sensitivity to stock movement
- Hedging with delta

### Lesson 56: Delta Hedging
- Delta-neutral strategies
- Professional risk management

### Lesson 57: Gamma Explained
- Rate of delta change
- Acceleration risk

### Lesson 58: Theta: Time Decay Patterns
- How theta accelerates
- Theta decay curves

### Lesson 59: Vega: Volatility Impact
- How IV affects prices
- Volatility trading

### Lesson 60: Implied Volatility Rank (IVR)
- Measuring relative volatility
- When premiums are "expensive"

### Lesson 61: IV Crush
- Post-earnings volatility collapse
- How to avoid/profit from it

### Lesson 62: Rho: Interest Rates
- Rate sensitivity (minor greek)
- When it matters

### Lesson 63: Greeks in Spreads
- How spreads modify greek exposure
- Portfolio greeks

### Lesson 64: Greeks Calculator
- Interactive tool for greek analysis

**📝 MODULE 5 NOTES:**


---

## MODULE 6: RISK MANAGEMENT & TAXES
*Goal: Protect capital and understand tax implications*

### Lesson 65: Trading Around Earnings
- Earnings strategies
- Risk management during events

### Lesson 66: Volatility Smile
- Skew in option pricing
- What it tells you

### Lesson 67: Skew Trading
- Trading volatility structure
- Advanced strategies

### Lesson 68: VIX Options Basics
- Trading fear itself
- Hedging with VIX

### Lesson 69: Portfolio Heat
- Managing overall risk
- Position correlation

### Lesson 70: Correlation Risk
- When trades move together
- Diversification strategies

### Lesson 71: Black Swan Protection
- Tail risk hedging
- Insurance strategies

### Lesson 72: When to Stop Trading
- Recognizing when to take a break
- Emotional discipline

### Lesson 73: Wash Sales
- Tax rule that catches traders
- How to avoid violations

### Lesson 74: Short vs Long Term Gains
- Tax rates on options
- Holding period strategies

### Lesson 75: Assignment & Exercise Taxes
- Tax implications of assignment
- When it happens

### Lesson 76: Record Keeping
- Trade journaling
- Tax documentation

**📝 MODULE 6 NOTES:**


---

## MODULE 7: REAL TRADES & NEXT STEPS
*Goal: See real examples and plan your trading journey*

### Lesson 77: Winning Covered Call
- Real trade autopsy: what went right

### Lesson 78: Losing Iron Condor
- Real trade autopsy: what went wrong

### Lesson 79: Perfect Vertical Spread Timing
- Successful spread trade analysis

### Lesson 80: Getting Assigned
- Assignment story and lessons

### Lesson 81: IV Crush Win
- Profiting from volatility collapse

### Lesson 82: Black Swan Event
- Trading through market crash

### Lesson 83: Creating Trading Plan
- Building your personal strategy
- Rules and guidelines

### Lesson 84: Backtesting Strategies
- Testing before risking real money
- Historical analysis

### Lesson 85: Journal Template
- How to track your trades
- Learning from history

### Lesson 86: Next Steps and Resources
- Where to go from here
- Continuing education

**📝 MODULE 7 NOTES:**

---

## GENERAL NOTES SECTION

### Overall Course Feedback:
- 

### Key Concepts to Review:
- 

### Questions/Clarifications Needed:
- 

### Action Items:
- 

---

*End of Document - Continue adding notes as you review each lesson*


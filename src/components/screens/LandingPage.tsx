/**
 * Landing Page - First screen visitors see
 * IMPROVED: Better value prop, removed Duolingo, enhanced social proof
 */

import { motion } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">OptionUp</h1>
          </div>
          <button
            onClick={onGetStarted}
            className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-semibold rounded-full shadow-sm border border-green-200">
              🎓 Step-by-Step Options Education
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Finally Understand{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600">
              Options Trading
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-700 mt-2 inline-block">(Without Losing Your Shirt)</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Learn proven strategies in 15-minute lessons. No experience required. 
            Build real skills with risk management from day one.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={onGetStarted}
              className="px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-lg rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Start Learning Free
            </button>
            <div className="text-sm text-gray-600 font-medium">
              ✓ No credit card needed • ✓ 5 free lessons
            </div>
          </div>

          {/* Enhanced Social Proof */}
          <div className="mt-8">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⭐⭐⭐⭐⭐</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Based on 2,847 active traders</p>
                <p className="text-sm text-gray-600">Join traders who have completed over 45,000 lessons</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Image / Demo with floating elements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 max-w-6xl mx-auto relative z-10"
        >
          <div className="relative">
            {/* Main mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-purple-50/50 rounded-3xl"></div>
              
              <div className="relative aspect-video bg-gradient-to-br from-primary-100 via-blue-100 to-purple-100 rounded-2xl flex items-center justify-center border border-gray-200 shadow-inner">
                <div className="text-center">
                  <div className="text-7xl mb-4 animate-bounce">📊</div>
                  <p className="text-gray-700 font-bold text-xl mb-2">Interactive Lessons</p>
                  <p className="text-gray-600">Learn covered calls, spreads & risk management</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements with better design */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute -top-6 -left-6 bg-gradient-to-br from-green-400 to-green-600 text-white px-6 py-3 rounded-2xl font-bold text-base shadow-2xl border-2 border-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span>7 Day Streak</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold text-base shadow-2xl border-2 border-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span>Level 3</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-purple-500 to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl border-2 border-white"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                <span>15 Lessons Complete</span>
              </div>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary-200/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-purple-200/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </motion.div>
      </section>

      {/* What You'll Learn Section - NEW */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              What You'll Learn
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real strategies used by professional traders, broken down into bite-sized lessons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">💰</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Generate 3-5% Monthly Returns
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn covered calls and cash-secured puts to create consistent income from your portfolio
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">🛡️</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Limit Losses to 2% Per Trade
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Master protective strategies and position sizing to minimize risk and protect your capital
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">📈</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Real Trade Examples
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                See actual P&L screenshots and step-by-step breakdowns of winning and losing trades
              </p>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">🎯</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Portfolio Strategy
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Build proper allocation that fits your risk tolerance and financial goals
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real Results Section - NEW TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Real Results from Real Traders
            </h3>
            <p className="text-xl text-gray-600">
              Here's what students achieved after completing OptionUp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow relative"
            >
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-400 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                VERIFIED
              </div>
              <div className="mb-4">
                <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                "I made my first $347 in 2 weeks after finishing Lesson 8. Finally understand how options actually work."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah M.</p>
                  <p className="text-sm text-gray-500">Teacher • Started with $2,000</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow relative"
            >
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-400 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                VERIFIED
              </div>
              <div className="mb-4">
                <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                "Lost $1,200 learning on my own before OptionUp. Now up $4,500 in 3 months. The risk management module saved me."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">MR</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mike R.</p>
                  <p className="text-sm text-gray-500">Engineer • 3 months active</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow relative"
            >
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-green-400 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                VERIFIED
              </div>
              <div className="mb-4">
                <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                "The step-by-step approach makes sense. Started with covered calls, now trading spreads confidently."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">JL</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Jennifer L.</p>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2">2,847</div>
              <div className="text-sm text-gray-600 font-medium">Active Traders</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">$1.2M+</div>
              <div className="text-sm text-gray-600 font-medium">Student Profits Tracked</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">94%</div>
              <div className="text-sm text-gray-600 font-medium">Complete All Lessons</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">45,000+</div>
              <div className="text-sm text-gray-600 font-medium">Lessons Completed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Why OptionUp Works
            </h3>
            <p className="text-gray-600">
              A structured path from zero to profitable trader
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                15-Minute Lessons
              </h4>
              <p className="text-gray-600">
                Video lessons break down complex strategies into simple steps. Practice with virtual money first.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="text-5xl mb-4">🎮</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Track Your Progress
              </h4>
              <p className="text-gray-600">
                Earn XP, maintain streaks, unlock badges. Stay motivated as you build real trading skills.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6"
            >
              <div className="text-5xl mb-4">📈</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Real Strategies
              </h4>
              <p className="text-gray-600">
                From covered calls to iron condors. Real trades with actual P&L examples explained step-by-step.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your Learning Path */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Your Learning Path
            </h3>
            <p className="text-gray-600">
              76+ lessons covering everything from basics to advanced strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Module 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-300">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 1: Foundations <span className="text-green-600 text-xs">✓ 5 FREE LESSONS</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Options basics, terminology, and your first trades
                  </p>
                  <span className="text-xs text-gray-500">15 lessons total • 2 hours</span>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💰</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 2: Income Strategies <span className="text-warning text-xs">⭐ PREMIUM</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Covered calls, cash-secured puts, the wheel strategy
                  </p>
                  <span className="text-xs text-gray-500">18 lessons • 2.5 hours</span>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📊</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 3: The Greeks <span className="text-warning text-xs">⭐ PREMIUM</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Delta, theta, vega, gamma—understand pricing
                  </p>
                  <span className="text-xs text-gray-500">12 lessons • 2 hours</span>
                </div>
              </div>
            </div>

            {/* Module 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🦅</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 4: Advanced Strategies <span className="text-warning text-xs">⭐ PREMIUM</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Iron condors, butterflies, ratio spreads
                  </p>
                  <span className="text-xs text-gray-500">12 lessons • 2.5 hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">+ Modules 5-7: Risk Management, Portfolio Management & Advanced Topics</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Simple, Transparent Pricing
            </h3>
            <p className="text-gray-600">
              Start free. Upgrade when you're ready for advanced strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Free</h4>
              <div className="text-4xl font-bold text-gray-900 mb-4">$0</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">First 5 lessons</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Options fundamentals</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Progress tracking & streaks</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-gray-400 mt-0.5">✗</span>
                  <span className="text-gray-400">Advanced strategies</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-gray-400 mt-0.5">✗</span>
                  <span className="text-gray-400">The Greeks & risk management</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                Start Free
              </button>
            </div>

            {/* Monthly */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Monthly</h4>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                $9.99<span className="text-lg text-gray-500">/mo</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Billed monthly</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">All 76+ lessons</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Advanced strategies & spreads</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">The Greeks mastery</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Risk & portfolio management</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Real trade case studies</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Yearly */}
            <div className="bg-gradient-to-br from-warning/10 to-yellow-100 rounded-2xl p-8 border-2 border-warning relative overflow-hidden">
              <div className="absolute -top-1 -right-12 bg-warning text-white px-12 py-1 text-xs font-bold transform rotate-45">
                SAVE 33%
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Yearly</h4>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                $79.99<span className="text-lg text-gray-500">/yr</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Just $6.67/month</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">All 76+ lessons</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Advanced strategies & spreads</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">The Greeks mastery</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Risk & portfolio management</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Save $40/year</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-gradient-to-r from-warning to-yellow-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-warning transition-all transform hover:scale-105"
              >
                Best Value
              </button>
            </div>
          </div>

          {/* Money-back guarantee */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm">
              ✓ Cancel anytime • ✓ 30-day money-back guarantee • ✓ Secure payment
            </p>
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-yellow-50 border-l-4 border-warning rounded-r-xl p-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Risk Disclosure:</strong> Options trading involves substantial risk and is not suitable for all investors. Past performance does not guarantee future results. The information provided is for educational purposes only and should not be considered financial advice. Always consult with a licensed financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Finally Understand Options?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join 2,847 traders learning strategies that actually work
            </p>
            <button
              onClick={onGetStarted}
              className="px-10 py-5 bg-white text-primary-600 font-bold text-xl rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              Start Learning Free Today
            </button>
            <p className="text-white/80 text-sm mt-6 font-medium">
              No credit card required • Start learning in 60 seconds
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-white font-bold mb-3">OptionUp</h5>
              <p className="text-sm">
                Master options trading with structured, bite-sized lessons.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><button onClick={onGetStarted} className="hover:text-white transition">Start Learning</button></li>
                <li><a href="/about" className="hover:text-white transition">Our Story</a></li>
                <li><button onClick={onGetStarted} className="hover:text-white transition">Pricing</button></li>
                <li><button onClick={onGetStarted} className="hover:text-white transition">Sign In</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 OptionUp. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Options trading involves risk. Educational content only, not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
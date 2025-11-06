/**
 * Landing Page - First screen visitors see
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
            <span className="px-3 py-1 bg-warning/20 text-warning text-xs font-bold rounded-full">
              BETA
            </span>
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
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              🎓 Master Options Trading in Minutes a Day
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Options Trading Like You're Playing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
              Duolingo
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Bite-sized lessons, gamified learning, and real-world strategies. 
            From complete beginner to confident trader in weeks, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-lg rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Learning Free
            </button>
            <div className="text-sm text-gray-500">
              ✓ 5 lessons free • ✓ No credit card needed
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">4.9/5</span> from early users
            </div>
          </div>
        </motion.div>

        {/* Hero Image / Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Mockup placeholder - you can add screenshot later */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-600 font-semibold">Interactive Lessons</p>
                  <p className="text-sm text-gray-500">Screenshot coming soon</p>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-warning text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              +10 XP
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              Streak: 7 🔥
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Why OptionUp Works
            </h3>
            <p className="text-gray-600">
              Traditional courses overwhelm you. We make it simple.
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
                5-Minute Lessons
              </h4>
              <p className="text-gray-600">
                No 3-hour video courses. Learn one concept at a time, master it, move on.
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
                Gamified Progress
              </h4>
              <p className="text-gray-600">
                Earn XP, maintain streaks, unlock badges. Learning feels like leveling up.
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
                From covered calls to iron condors. Real trades, real profit potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50">
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
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📚</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 1: Fundamentals <span className="text-green-600 text-sm">(FREE)</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Calls, puts, Greeks, profit/loss diagrams, position sizing
                  </p>
                  <span className="text-xs text-gray-500">5 lessons • ~45 mins</span>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-warning/30">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💰</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 2: Income Strategies <span className="text-warning text-xs">⭐ PREMIUM</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Covered calls, cash-secured puts, the wheel strategy
                  </p>
                  <span className="text-xs text-gray-500">12 lessons</span>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-warning/30">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 3: Spreads <span className="text-warning text-xs">⭐ PREMIUM</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Verticals, calendars, diagonals, LEAPs
                  </p>
                  <span className="text-xs text-gray-500">5 lessons</span>
                </div>
              </div>
            </div>

            {/* Module 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-warning/30">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🦅</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Module 4: Advanced Strategies <span className="text-warning text-xs">⭐ PREMIUM</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Iron condors, butterflies, ratio spreads
                  </p>
                  <span className="text-xs text-gray-500">12 lessons</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">+ Modules 5-7: Greeks Mastery, Advanced Topics, Portfolio Management</p>
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
              Start free. Upgrade when you're ready.
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
                  <span className="text-gray-700">XP & streak tracking</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Cloud sync</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-gray-400 mt-0.5">✗</span>
                  <span className="text-gray-400">Advanced strategies</span>
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
                  <span className="text-gray-700">Advanced strategies</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">The Greeks mastery</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Portfolio management</span>
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
                BEST VALUE
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Yearly</h4>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                $79.99<span className="text-lg text-gray-500">/yr</span>
              </div>
              <p className="text-sm text-green-600 font-semibold mb-4">Save $40 (33% off)</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">All 76+ lessons</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Advanced strategies</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">The Greeks mastery</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">Portfolio management</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-gradient-to-r from-warning to-yellow-500 text-white font-bold rounded-xl hover:from-warning/90 hover:to-yellow-500/90 transition-all shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">
            Ready to Master Options Trading?
          </h3>
          <p className="text-xl text-primary-100 mb-8">
            Join traders who are learning smarter, not harder.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Learning Free →
          </button>
          <p className="text-sm text-primary-100 mt-4">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p className="mb-2">© 2025 OptionUp. All rights reserved.</p>
          <p className="text-xs text-gray-500">
            Educational content only. Not financial advice. Options trading involves risk.
          </p>
        </div>
      </footer>
    </div>
  );
}


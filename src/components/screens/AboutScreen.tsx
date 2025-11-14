/**
 * About/Story Page - Team's expertise and mission
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function AboutScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition"
            >
              OptionUp
            </button>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
          >
            Start Learning
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            We've Seen{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              Too Many People
            </span>
            <br />
            Lose Everything
          </h1>
          
          <p className="text-2xl text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto font-medium">
            And we decided to do something about it.
          </p>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Stories That Haunt Us</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  A 23-year-old college graduate, barely three months into their first job, loses $47,000 trading options they didn't understand. Their entire savings—gone in two weeks.
                </p>
                <p className="text-lg">
                  A young parent trying to "catch up" financially after student loans wipes out $32,000 meant for their child's education. They read about someone making 300% returns on WSB and thought it would be easy.
                </p>
                <p className="text-lg">
                  A nurse works double shifts for a year to save $15,000, then loses it all in 72 hours on 0DTE options they bought after watching a TikTok.
                </p>
              </div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              These aren't hypotheticals. These are real stories from real people we've encountered. And the worst part? <strong>These losses were completely preventable.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Who We Are
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">CFA Charterholders</h3>
                  <p className="text-gray-600">Professional Fund Managers</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  We're not YouTubers who got lucky with one trade. We're not social media influencers selling courses on strategies we don't actually use. We're <strong>CFA Charterholders</strong> who have spent our careers managing institutional money—the kind where a single mistake can cost millions and end your career.
                </p>
                <p className="text-lg">
                  We've worked in <strong>professional fund management</strong>, where risk management isn't optional—it's the foundation of everything. Where position sizing is calculated, not guessed. Where every trade has a documented thesis and clear exit criteria.
                </p>
                <p className="text-lg">
                  The CFA Charter isn't just three letters after our names. It represents over 900 hours of study covering portfolio management, risk analysis, derivatives pricing, and ethics. It means we're held to a fiduciary standard. It means we know the difference between investing and gambling.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-bold text-gray-900 mb-2">20+ Years</h4>
                <p className="text-sm text-gray-600">Combined experience managing institutional portfolios</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="text-4xl mb-3">💼</div>
                <h4 className="font-bold text-gray-900 mb-2">Multi-Billion</h4>
                <p className="text-sm text-gray-600">Dollar funds managed throughout our careers</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-bold text-gray-900 mb-2">Zero Tolerance</h4>
                <p className="text-sm text-gray-600">For reckless strategies that destroy lives</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Breaking Point Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              What Made Us Build This
            </h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                For years, we watched from the sidelines as the retail options trading boom exploded. At first, we thought it was great—more people participating in markets, democratization of finance, all that.
              </p>
              
              <p>
                But then the stories started piling up. Young people wiping out their savings. Parents losing money meant for their kids' college funds. Workers losing years of careful savings in days.
              </p>
              
              <p className="font-semibold text-xl text-gray-900">
                And the worst part? Nobody was teaching them the right way.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary-600 my-8">
                <p className="text-lg">
                  YouTube was full of people promising "10x returns in 10 days." TikTok had teenagers teaching strategies they didn't understand. Reddit threads were echo chambers where gambling was celebrated and risk management was mocked.
                </p>
              </div>
              
              <p>
                Meanwhile, the <em>real</em> way to use options—conservative strategies that institutional investors use to generate steady income and hedge risk—was being completely ignored.
              </p>
              
              <p>
                So we asked ourselves: <strong>What if we taught options the way we learned them in our careers? The way they're actually used by professionals?</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Mission
            </h2>
            
            <div className="bg-white rounded-2xl p-10 shadow-2xl border-2 border-green-300">
              <p className="text-2xl text-gray-900 font-semibold mb-6 leading-relaxed">
                To teach people—especially young people—how to trade options <span className="text-green-600">responsibly</span>, <span className="text-blue-600">safely</span>, and with <span className="text-purple-600">eyes wide open</span> to the risks.
              </p>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  We're not here to promise you'll get rich quick. We're here to teach you strategies that actually work—the kind professionals use to generate consistent returns while managing risk.
                </p>
                <p>
                  We start with <strong>position sizing</strong> in Lesson 12. Not after you've blown up your account. On Day 1.
                </p>
                <p>
                  We teach <strong>covered calls and cash-secured puts</strong>—boring strategies with defined risk that can generate 3-5% monthly returns—before we touch anything speculative.
                </p>
                <p>
                  We explain <strong>exactly what can go wrong</strong> with every strategy, with real examples of losing trades, not just winners.
                </p>
                <p>
                  We show you how to <strong>calculate position sizes</strong> so a single bad trade can't destroy your portfolio.
                </p>
                <p className="font-semibold text-gray-900 text-xl pt-4">
                  Because if we can prevent even one person from losing their life savings to a strategy they didn't understand, this entire project is worth it.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              How We're Different
            </h2>
            
            <div className="space-y-6">
              {/* Difference 1 */}
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ✅ Risk Management From Day One
                </h3>
                <p className="text-gray-700">
                  Most courses teach you how to make money, then mention risk as an afterthought. We teach risk management in the first module. You learn position sizing before you learn iron condors.
                </p>
              </div>

              {/* Difference 2 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ✅ Real Strategies, Not Lottery Tickets
                </h3>
                <p className="text-gray-700">
                  We focus on strategies with <em>defined risk</em>—covered calls, spreads, collars. The kind that institutional investors use. You won't find lessons on how to YOLO 0DTE options here.
                </p>
              </div>

              {/* Difference 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ✅ Honest About Losses
                </h3>
                <p className="text-gray-700">
                  We show you losing trades with actual P&L screenshots. We explain what went wrong and how to avoid it. You'll learn more from our mistakes than from a hundred perfect trades.
                </p>
              </div>

              {/* Difference 4 */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ✅ No Hype, No BS
                </h3>
                <p className="text-gray-700">
                  We're not selling a lifestyle. We're not promising Lamborghinis. We're teaching you a skill that can generate consistent income if you're disciplined and patient. That's it.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 overflow-hidden">
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
              Learn Options the Professional Way
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              No hype. No get-rich-quick schemes. Just proven strategies that protect your capital while you build real trading skills.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-10 py-5 bg-white text-primary-600 font-bold text-xl rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              Start Learning Free
            </button>
            <p className="text-white/80 text-sm mt-6 font-medium">
              First 5 lessons free • No credit card required
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
                Professional options education for responsible traders.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-3">Learn More</h5>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-white transition">Home</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition">Our Story</button></li>
                <li><button onClick={() => navigate('/')} className="hover:text-white transition">Start Learning</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/refund-policy" className="hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 OptionUp. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Educational content only. Options trading involves substantial risk and is not suitable for all investors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


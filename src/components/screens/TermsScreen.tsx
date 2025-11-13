/**
 * Terms of Service Screen
 */

import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

export function TermsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service for OptionUp</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> November 7, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to OptionUp. By accessing or using our platform at optionup.app ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              OptionUp is an educational platform that provides gamified lessons and content about options trading. Our Service includes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Interactive educational lessons about options trading concepts</li>
              <li>Progress tracking and gamification features (XP, streaks, achievements)</li>
              <li>Practice questions and simulations</li>
              <li>Access to curriculum modules on options trading strategies</li>
            </ul>
            <p className="text-gray-700 font-semibold mb-2">Important:</p>
            <p className="text-gray-700 leading-relaxed mb-4">OptionUp provides educational content only. We do not provide:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Personalized investment advice</li>
              <li>Trading recommendations for specific securities</li>
              <li>Portfolio management services</li>
              <li>Brokerage services</li>
              <li>Investment advisory services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">To use OptionUp, you must:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Be at least 18 years of age</li>
              <li>Be capable of forming a binding contract</li>
              <li>Not be prohibited from using the Service under U.S. law or the laws of your jurisdiction</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration and Security</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Account Creation:</p>
            <p className="text-gray-700 leading-relaxed mb-4">You must create an account to access premium features. You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information as needed</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Account Termination:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We reserve the right to suspend or terminate your account if you:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Violate these Terms</li>
              <li>Engage in fraudulent or illegal activity</li>
              <li>Abuse or misuse the Service</li>
              <li>Fail to pay subscription fees</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You may delete your account at any time by contacting hello@optionup.app.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription and Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Free Access</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>The first three (3) lessons are available for free</li>
              <li>No credit card required for free lessons</li>
              <li>Free access may be modified or discontinued at any time</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Paid Subscription</h3>
            <p className="text-gray-700 font-semibold mb-2">Pricing:</p>
            <p className="text-gray-700 leading-relaxed mb-4">$20 USD per month (pricing subject to change with notice)</p>
            
            <p className="text-gray-700 font-semibold mb-2">Payment Processing:</p>
            <p className="text-gray-700 leading-relaxed mb-4">All payments are processed securely through Stripe. You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Provide valid payment information</li>
              <li>Pay all fees and charges incurred</li>
              <li>Authorize automatic monthly billing for subscriptions</li>
              <li>Pay any applicable taxes</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Billing Cycle:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Subscriptions renew automatically on a monthly basis unless canceled. You will be charged on the same day each month that you initially subscribed.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Price Changes:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may change subscription prices with 30 days' advance notice via email or platform notification.
            </p>

            <p className="text-gray-700 font-semibold mb-2">One-Time Purchases:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Certain features or content may be available for one-time purchase. These purchases are non-refundable except as required by law or stated in our <Link to="/refund-policy" className="text-primary-600 hover:text-primary-700 underline">Refund Policy</Link>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Cancellation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You may cancel your subscription at any time by:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Accessing your account settings</li>
              <li>Contacting hello@optionup.app</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Cancellation Effect:</p>
            <p className="text-gray-700 leading-relaxed mb-4">Upon cancellation:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>You retain access until the end of your current billing period</li>
              <li>No refunds are provided for partial months</li>
              <li>Automatic renewal will cease</li>
              <li>You will lose access to premium content after the period ends</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              See our <Link to="/refund-policy" className="text-primary-600 hover:text-primary-700 underline">Refund Policy</Link> for information about refunds.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational Disclaimer and Financial Risk Warning</h2>
            
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl mb-4">
              <p className="text-gray-900 font-bold mb-2">CRITICAL NOTICE:</p>
              <p className="text-gray-700 leading-relaxed">
                Options trading involves substantial risk of loss and is not suitable for all investors.
              </p>
            </div>

            <p className="text-gray-700 font-semibold mb-2">Educational Purpose Only:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>OptionUp provides educational content about options trading concepts and strategies</li>
              <li>Content is for informational and educational purposes only</li>
              <li>We do NOT provide personalized investment advice or recommendations</li>
              <li>We do NOT recommend specific trades or securities</li>
              <li>We are NOT a registered investment advisor</li>
              <li>We are NOT a broker-dealer</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">No Financial Advice:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Nothing on OptionUp constitutes financial, investment, legal, or tax advice</li>
              <li>You should consult with qualified professionals before making investment decisions</li>
              <li>Past performance examples do not guarantee future results</li>
              <li>Educational scenarios are simplified and may not reflect real market conditions</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Risk Acknowledgment:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Options trading carries significant financial risk</li>
              <li>You can lose your entire investment</li>
              <li>Options are complex financial instruments</li>
              <li>You should only trade with money you can afford to lose</li>
              <li>Understanding concepts does not guarantee trading success</li>
              <li>We are not responsible for your trading decisions or losses</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">No Endorsement:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>We do not endorse any brokerage, platform, or financial product</li>
              <li>References to specific brokerages or platforms are for educational purposes only</li>
              <li>You are responsible for researching and selecting service providers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Our Content:</p>
            <p className="text-gray-700 leading-relaxed mb-4">All content on OptionUp, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Text, graphics, logos, images, and animations</li>
              <li>Lesson content, questions, and explanations</li>
              <li>Software code and functionality</li>
              <li>Trade names and trademarks</li>
              <li>Design elements and user interface</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              ...is owned by OptionUp or its licensors and protected by copyright, trademark, and other intellectual property laws.
            </p>

            <p className="text-gray-700 font-semibold mb-2">License to Use:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We grant you a limited, non-exclusive, non-transferable license to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Access and use the Service for personal, non-commercial purposes</li>
              <li>View and complete lessons</li>
              <li>Download content only as explicitly enabled (e.g., PWA offline access)</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Restrictions:</p>
            <p className="text-gray-700 leading-relaxed mb-4">You may NOT:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Copy, modify, distribute, or reproduce our content</li>
              <li>Create derivative works from our content</li>
              <li>Remove copyright or proprietary notices</li>
              <li>Use our content for commercial purposes</li>
              <li>Scrape or harvest data from our platform</li>
              <li>Reverse engineer our software or algorithms</li>
              <li>Share your account credentials with others</li>
              <li>Record, screenshot, or redistribute lesson content</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">User Content:</p>
            <p className="text-gray-700 leading-relaxed">
              If you provide feedback, suggestions, or other communications to us, you grant OptionUp a perpetual, worldwide, royalty-free license to use such content for any purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree NOT to:</p>
            
            <p className="text-gray-700 font-semibold mb-2">Content Violations:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Share, reproduce, or distribute lesson content without permission</li>
              <li>Use automated tools to access or scrape the Service</li>
              <li>Circumvent access controls or payment systems</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Account Abuse:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Create multiple accounts to abuse free trial or access</li>
              <li>Share login credentials with others</li>
              <li>Allow others to use your account</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Technical Abuse:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Introduce viruses, malware, or harmful code</li>
              <li>Overload or interfere with our servers</li>
              <li>Attempt to gain unauthorized access to systems</li>
              <li>Reverse engineer or decompile our software</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Misuse:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Impersonate others or misrepresent your identity</li>
              <li>Harass, threaten, or abuse other users or staff</li>
              <li>Use the Service for illegal purposes</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Commercial Misuse:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Resell or redistribute access to the Service</li>
              <li>Use content to create competing products</li>
              <li>Use the Service for unauthorized commercial purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Payment Processing:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Stripe for payment processing. By making payments, you agree to Stripe's Terms of Service and Privacy Policy.
            </p>

            <p className="text-gray-700 font-semibold mb-2">External Links:</p>
            <p className="text-gray-700 leading-relaxed mb-4">Our Service may contain links to third-party websites or services (e.g., brokerage platforms). We:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Do not control or endorse third-party services</li>
              <li>Are not responsible for their content or practices</li>
              <li>Encourage you to review their terms and policies</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Analytics:</p>
            <p className="text-gray-700 leading-relaxed">
              We use third-party analytics tools (e.g., Google Analytics) to improve our Service. These tools may collect information about your usage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Warranties</h2>
            
            <p className="text-gray-700 font-semibold mb-2">AS-IS SERVICE:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              OptionUp is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties of uninterrupted or error-free service</li>
              <li>Warranties regarding accuracy or completeness of content</li>
              <li>Warranties that the Service will meet your requirements</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">No Guarantees:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>We do not guarantee that the Service will always be available or functional</li>
              <li>We do not guarantee the accuracy of educational content</li>
              <li>We do not guarantee any particular learning outcomes</li>
              <li>We do not guarantee that trading knowledge will lead to profit</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Educational Content:</p>
            <p className="text-gray-700 leading-relaxed mb-4">While we strive for accuracy:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Educational content may contain errors or become outdated</li>
              <li>Market conditions and regulations change frequently</li>
              <li>Content is simplified for educational purposes</li>
              <li>Real-world trading is more complex than educational scenarios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            
            <p className="text-gray-700 font-semibold mb-2">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
            
            <p className="text-gray-700 font-semibold mb-2">No Liability for Damages:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              OptionUp and its officers, directors, employees, and affiliates shall NOT be liable for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or opportunities</li>
              <li>Trading losses or investment decisions</li>
              <li>Service interruptions or data loss</li>
              <li>Errors or omissions in content</li>
              <li>Unauthorized access to your account</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Maximum Liability:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our total liability to you for any claims arising from these Terms or your use of the Service shall not exceed the amount you paid to OptionUp in the 12 months preceding the claim, or $100 USD, whichever is greater.
            </p>

            <p className="text-gray-700 font-semibold mb-2">No Liability for Trading:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We are NOT liable for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your trading decisions or losses</li>
              <li>Misunderstanding of educational content</li>
              <li>Applying concepts incorrectly in real trading</li>
              <li>Market losses or volatility</li>
              <li>Brokerage errors or issues</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Basis of the Bargain:</p>
            <p className="text-gray-700 leading-relaxed">
              These limitations are fundamental elements of the agreement between you and OptionUp.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless OptionUp and its officers, directors, employees, contractors, and affiliates from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of others</li>
              <li>Your trading activities or financial decisions</li>
              <li>Content you submit or transmit through the Service</li>
              <li>Unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Governing Law:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms are governed by the laws of the United States and the state where OptionUp is primarily operated, without regard to conflict of law principles.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Informal Resolution:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before filing a claim, you agree to contact us at hello@optionup.app to attempt informal resolution. We will work in good faith to resolve disputes.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Arbitration:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If informal resolution fails, disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules, except:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>You may bring claims in small claims court if they qualify</li>
              <li>Either party may seek injunctive relief in court for intellectual property violations</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Class Action Waiver:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to resolve disputes individually. You waive any right to participate in class actions or class-wide arbitration.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Jury Trial Waiver:</p>
            <p className="text-gray-700 leading-relaxed">
              To the extent permitted by law, you waive your right to a jury trial.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Your Rights:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may stop using the Service and delete your account at any time.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Our Rights:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We may suspend or terminate your access to the Service:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Immediately for violation of these Terms</li>
              <li>With notice for convenience</li>
              <li>If required by law</li>
              <li>To protect our business or other users</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Effect of Termination:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your right to use the Service ends immediately</li>
              <li>We may delete your account data (subject to legal requirements)</li>
              <li>You remain liable for any fees owed</li>
              <li>Sections that should survive termination will remain in effect</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Surviving Provisions:</p>
            <p className="text-gray-700 leading-relaxed">
              The following sections survive termination: Intellectual Property Rights, Disclaimers, Limitation of Liability, Indemnification, and Dispute Resolution.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">General Provisions</h2>
            
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and OptionUp regarding the Service.</li>
              <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</li>
              <li><strong>Waiver:</strong> Our failure to enforce any right or provision does not constitute a waiver of that right.</li>
              <li><strong>Assignment:</strong> You may not assign these Terms. We may assign our rights to any affiliate or successor.</li>
              <li><strong>No Agency:</strong> These Terms do not create any partnership, employment, or agency relationship.</li>
              <li><strong>Electronic Communications:</strong> You consent to receive communications from us electronically, which satisfy any legal requirement for written communication.</li>
              <li><strong>Force Majeure:</strong> We are not liable for delays or failures caused by circumstances beyond our reasonable control.</li>
              <li><strong>U.S. Jurisdiction:</strong> The Service is controlled and operated from the United States. We make no representation that the Service is appropriate or available in other locations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Not a Financial Service Provider:</p>
            <p className="text-gray-700 leading-relaxed mb-4">OptionUp is an educational technology platform, not:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>A registered investment advisor (RIA)</li>
              <li>A broker-dealer</li>
              <li>A commodity trading advisor</li>
              <li>A financial institution</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Educational Exception:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We provide general educational content about financial concepts under educational exceptions to investment advisor registration requirements.
            </p>

            <p className="text-gray-700 font-semibold mb-2">No Customer Relationship:</p>
            <p className="text-gray-700 leading-relaxed">
              We do not have a fiduciary, advisory, or customer relationship with users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these Terms, contact us:
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>Email:</strong> hello@optionup.app
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Website:</strong> https://optionup.app
            </p>
            <p className="text-gray-700 leading-relaxed">
              We will respond to inquiries within 5 business days.
            </p>
          </section>

          <hr className="my-8 border-gray-200" />

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using OptionUp, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <Link to="/privacy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</Link> and <Link to="/refund-policy" className="text-primary-600 hover:text-primary-700 underline">Refund Policy</Link>.
            </p>
          </section>

          <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
            <p className="text-sm text-gray-700 leading-relaxed font-semibold">
              <strong>IMPORTANT REMINDER:</strong> Options trading involves substantial risk. OptionUp provides education only, not financial advice. Always consult qualified professionals before making investment decisions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


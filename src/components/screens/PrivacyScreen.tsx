/**
 * Privacy Policy Screen
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function PrivacyScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy for OptionUp</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> November 7, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to OptionUp ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information. This Privacy Policy explains our practices regarding data collection and use when you access our educational platform at optionup.app.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using OptionUp, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Information You Provide to Us</h3>
            
            <p className="text-gray-700 font-semibold mb-2">Account Information:</p>
            <p className="text-gray-700 leading-relaxed mb-4">When you create an account, we collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Display name (if provided)</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Profile and Progress Data:</p>
            <p className="text-gray-700 leading-relaxed mb-4">As you use our platform, we collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Lesson completion status</li>
              <li>Quiz answers and scores</li>
              <li>XP (experience points) and achievement data</li>
              <li>Daily streak information</li>
              <li>Learning preferences and settings</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Communications:</p>
            <p className="text-gray-700 leading-relaxed mb-4">If you contact us via email at hello@optionup.app, we collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your email address</li>
              <li>Message content</li>
              <li>Any attachments you send</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Information We Collect Automatically</h3>
            
            <p className="text-gray-700 font-semibold mb-2">Usage Data:</p>
            <p className="text-gray-700 leading-relaxed mb-4">When you use OptionUp, we automatically collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Pages visited and features used</li>
              <li>Time spent on lessons and screens</li>
              <li>Device type and operating system</li>
              <li>Browser type and version</li>
              <li>IP address</li>
              <li>Referral source</li>
              <li>Date and time of access</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Analytics Data:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We use analytics tools (such as Google Analytics) to understand how users interact with our platform:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Session duration</li>
              <li>Lesson completion rates</li>
              <li>User engagement metrics</li>
              <li>Navigation patterns</li>
              <li>Performance data</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Cookies and Similar Technologies:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We use cookies and local storage to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Save your progress (even when offline)</li>
              <li>Analyze site usage</li>
              <li>Improve user experience</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings, though disabling them may affect functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
            
            <p className="text-gray-700 font-semibold mb-2">Provide and Improve Our Service:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Deliver educational content and track your learning progress</li>
              <li>Maintain your account and authenticate your access</li>
              <li>Process subscription payments</li>
              <li>Enable offline access through Progressive Web App features</li>
              <li>Personalize your learning experience</li>
              <li>Develop new features and improve existing ones</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Communications:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Send important service updates and notifications</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send promotional content (only if you opt in)</li>
              <li>Notify you about changes to our service or policies</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Analytics and Research:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Understand how users engage with our platform</li>
              <li>Analyze learning patterns and curriculum effectiveness</li>
              <li>Identify technical issues and improve performance</li>
              <li>Conduct internal research to enhance educational outcomes</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Legal and Security:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Comply with legal obligations</li>
              <li>Enforce our Terms of Service</li>
              <li>Protect against fraud and abuse</li>
              <li>Secure our platform and user accounts</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Share Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            
            <p className="text-gray-700 font-semibold mb-2">Service Providers:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We share information with trusted third parties who help us operate our platform:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Stripe:</strong> Payment processing and subscription management</li>
              <li><strong>Hosting Providers:</strong> Infrastructure and deployment (e.g., Vercel, Netlify)</li>
              <li><strong>Analytics Services:</strong> Usage analytics (e.g., Google Analytics)</li>
              <li><strong>Email Services:</strong> Transactional and marketing emails (if applicable)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              These providers are contractually obligated to protect your data and use it only for specified purposes.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Legal Requirements:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We may disclose your information if required by law or in response to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Valid legal processes (subpoenas, court orders)</li>
              <li>Government requests</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Protection of our users or the public</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Business Transfers:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If OptionUp is involved in a merger, acquisition, or sale of assets, your information may be transferred. We will notify you of any such change and any choices you may have.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Aggregated Data:</p>
            <p className="text-gray-700 leading-relaxed">
              We may share anonymized, aggregated data that cannot identify you personally for research, marketing, or analytics purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Encrypted connections (HTTPS/SSL)</li>
              <li>Secure password hashing</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Encrypted data transmission to third parties</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Data Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications (service emails may still be sent)</li>
              <li><strong>Do Not Track:</strong> We currently do not respond to Do Not Track signals</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, contact us at hello@optionup.app. We will respond within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We retain your information for as long as your account is active or as needed to provide services. Specifically:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Account data:</strong> Retained while your account exists</li>
              <li><strong>Payment records:</strong> Retained as required by law (typically 7 years)</li>
              <li><strong>Analytics data:</strong> Aggregated data may be retained indefinitely</li>
              <li><strong>Communication records:</strong> Retained for customer service purposes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              After account deletion, we may retain certain information as required by law or for legitimate business purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              OptionUp is not intended for users under 18 years of age. We do not knowingly collect information from children under 18. If we discover we have collected information from a child under 18, we will delete it promptly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Options trading involves significant financial risk and is only appropriate for adults who meet brokerage account requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              OptionUp is operated from the United States. If you access our platform from outside the U.S., your information will be transferred to, stored in, and processed in the United States.
            </p>
            <p className="text-gray-700 leading-relaxed">
              U.S. data protection laws may differ from those in your country. By using OptionUp, you consent to the transfer of your information to the United States.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">California Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to opt-out of the sale of personal information (we do not sell data)</li>
              <li>Right to deletion</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, email hello@optionup.app with "California Privacy Request" in the subject line.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Material changes will be communicated via:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Prominent notice on our platform</li>
              <li>Email notification to registered users</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Continued use of OptionUp after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform may contain links to external websites (e.g., brokerage platforms, financial resources). We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, contact us:
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>Email:</strong> hello@optionup.app
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Website:</strong> https://optionup.app
            </p>
            <p className="text-gray-700 leading-relaxed">
              We will respond to your inquiry within 30 days.
            </p>
          </section>

          <hr className="my-8 border-gray-200" />

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary of Key Points</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We collect account information, progress data, and usage analytics</li>
              <li>We use data to provide educational services and improve our platform</li>
              <li>We do not sell your personal information</li>
              <li>We use Stripe for secure payment processing</li>
              <li>You can request access, correction, or deletion of your data</li>
              <li>We use cookies and analytics to improve user experience</li>
              <li>Our service is intended for adults only (18+)</li>
            </ul>
          </section>

          <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-warning rounded-r-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Educational Disclaimer:</strong> OptionUp provides educational content about options trading. We do not provide personalized financial advice or trading recommendations. All content is for educational purposes only.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


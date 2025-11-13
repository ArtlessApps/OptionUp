/**
 * Refund Policy Screen
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function RefundPolicyScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Refund Policy</h1>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Refund Policy for OptionUp</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> November 7, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At OptionUp, we are committed to providing high-quality educational content about options trading. This Refund Policy explains when refunds are available and how to request them.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By subscribing to OptionUp or making a purchase, you agree to this Refund Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">For refund requests or questions, contact us:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Email:</strong> hello@optionup.app</li>
              <li><strong>Response Time:</strong> We respond to refund requests within 2 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Refund Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Monthly Subscriptions</h3>
            
            <p className="text-gray-700 font-semibold mb-2">7-Day Money-Back Guarantee:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>First-time subscribers</strong> may request a full refund within 7 days of their initial subscription charge</li>
              <li>The refund applies only to your first month's payment</li>
              <li>You must have made a good-faith effort to use the platform (completed at least 2 lessons)</li>
              <li>After the 7-day period, no refunds are provided for the current or future billing cycles</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">No Refunds After 7 Days:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Subscription charges beyond the first 7 days are non-refundable</li>
              <li>You will retain access to the Service until the end of your current billing period after cancellation</li>
              <li>We do not provide prorated refunds for partial months</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Recurring Charges:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>If you forget to cancel and are charged for a renewal, refunds may be considered on a case-by-case basis within 48 hours of the charge</li>
              <li>We recommend setting a reminder to cancel before your renewal date if you do not wish to continue</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">How to Request a Refund:</p>
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
              <li>Email hello@optionup.app with subject line "Refund Request"</li>
              <li>Include your account email address</li>
              <li>Include your reason for the refund request</li>
              <li>Include the date you subscribed</li>
              <li>We will review and respond within 2 business days</li>
            </ol>

            <p className="text-gray-700 font-semibold mb-2">Processing Time:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Approved refunds are processed within 5-10 business days</li>
              <li>Refunds are issued to the original payment method via Stripe</li>
              <li>Please allow your financial institution's processing time for the refund to appear</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">One-Time Purchase Refund Policy</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Digital Content:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              One-time purchases of digital content, lessons, or features are generally non-refundable due to the instant access nature of digital goods.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Exceptions:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We may provide refunds for one-time purchases if:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Technical issues prevent access to purchased content</li>
              <li>Content was significantly misrepresented</li>
              <li>You did not access or use the purchased content</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Request Window:</p>
            <p className="text-gray-700 leading-relaxed">
              Refund requests for one-time purchases must be made within 48 hours of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Trial and Free Content</h2>
            
            <p className="text-gray-700 font-semibold mb-2">No Refunds Needed:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The first three (3) lessons on OptionUp are free to access. No payment is required, so refunds do not apply.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Trial Policy:</p>
            <p className="text-gray-700 leading-relaxed mb-4">If we offer promotional free trials in the future:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Cancel before the trial ends to avoid charges</li>
              <li>If you forget to cancel, you may be eligible for a refund within 48 hours of being charged</li>
              <li>We will send reminder emails before trial periods end</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Situations Where Refunds Are NOT Provided</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We do NOT provide refunds in the following situations:</p>
            
            <p className="text-gray-700 font-semibold mb-2">After the Refund Period:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Requests made more than 7 days after initial subscription charge (for first-time subscribers)</li>
              <li>Requests made more than 48 hours after renewal charges (for recurring subscriptions)</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Change of Mind:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>You simply changed your mind after using the Service beyond the refund period</li>
              <li>You found content too difficult or not at your expected skill level</li>
              <li>You don't have time to use the Service</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Account Issues:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>You forgot your password or cannot access your account (contact us for help instead)</li>
              <li>You created multiple accounts by mistake (we can help consolidate)</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Usage-Based:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>You completed all available content and want a refund</li>
              <li>You used the Service extensively during the refund period</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">External Factors:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your trading losses or investment decisions</li>
              <li>Market conditions or performance</li>
              <li>Your misunderstanding or misapplication of educational content</li>
              <li>Third-party service issues (brokerage, payment provider, etc.)</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Violations:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your account was terminated for violating our Terms of Service</li>
              <li>You engaged in fraudulent activity</li>
              <li>You abused the refund policy</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Promotional Pricing:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Refunds for promotional or discounted subscriptions may have different terms</li>
              <li>Check the specific promotion terms at the time of purchase</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exceptional Circumstances</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may consider refunds outside our standard policy in exceptional circumstances:
            </p>
            
            <p className="text-gray-700 font-semibold mb-2">Technical Issues:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Prolonged platform outages preventing access</li>
              <li>Critical bugs preventing use of core features</li>
              <li>We will work to resolve technical issues first before processing refunds</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Billing Errors:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Duplicate charges</li>
              <li>Incorrect amounts charged</li>
              <li>Unauthorized charges (report immediately)</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Medical or Personal Emergencies:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Serious illness or hospitalization</li>
              <li>Death of subscriber (family may request refund)</li>
              <li>Other extraordinary circumstances</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              To request consideration for exceptional circumstances, email hello@optionup.app with detailed explanation and any supporting documentation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Abuse Prevention</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Fair Use:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This refund policy is designed for good-faith users who are unsatisfied with the Service.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Abuse Indicators:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Repeatedly subscribing, using content, and requesting refunds</li>
              <li>Completing all or most content before requesting a refund</li>
              <li>Using multiple accounts or payment methods to abuse the policy</li>
              <li>False or fraudulent refund claims</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Our Rights:</p>
            <p className="text-gray-700 leading-relaxed mb-4">We reserve the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Deny refunds if we detect abuse</li>
              <li>Terminate accounts that abuse the refund policy</li>
              <li>Ban users from future subscriptions</li>
              <li>Report fraudulent activity to payment processors and authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chargebacks</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Contact Us First:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before initiating a chargeback with your bank or credit card company, please contact us at hello@optionup.app. Many issues can be resolved quickly without a chargeback.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Chargeback Consequences:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Chargebacks may result in immediate account termination</li>
              <li>We may provide evidence to your financial institution that the charge was legitimate</li>
              <li>Frivolous chargebacks may result in permanent ban from OptionUp</li>
              <li>You may be responsible for chargeback fees if the claim is invalid</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Legitimate Chargebacks:</p>
            <p className="text-gray-700 leading-relaxed">
              If you believe you were charged fraudulently or without authorization, you have the right to dispute charges with your financial institution.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Processing</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Stripe:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              All payments are processed through Stripe, a secure payment processor.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Payment Disputes:</p>
            <p className="text-gray-700 leading-relaxed mb-4">For payment-related issues:</p>
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
              <li>Contact us first at hello@optionup.app</li>
              <li>If unresolved, you may contact Stripe support</li>
              <li>Review Stripe's terms and dispute resolution process</li>
            </ol>

            <p className="text-gray-700 font-semibold mb-2">Currency:</p>
            <p className="text-gray-700 leading-relaxed">
              All prices are in USD. Currency conversion rates are determined by your financial institution.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
            
            <p className="text-gray-700 font-semibold mb-2">How to Cancel:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Log into your account and go to Settings &gt; Subscription</li>
              <li>Click "Cancel Subscription"</li>
              <li>Or email hello@optionup.app with "Cancel Subscription" in the subject line</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">When Cancellation Takes Effect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>You retain access until the end of your current billing period</li>
              <li>You will not be charged for subsequent months</li>
              <li>No refund is provided for the current billing period (unless within the 7-day window)</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Reactivation:</p>
            <p className="text-gray-700 leading-relaxed">
              You may reactivate your subscription at any time by resubscribing through your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Content or Pricing</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Content Changes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>We may add, remove, or modify educational content</li>
              <li>Content changes do not entitle you to a refund</li>
              <li>We strive to continuously improve our curriculum</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Price Changes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>We may change subscription prices with 30 days' notice</li>
              <li>Current subscribers are grandfathered at their existing rate for at least 90 days</li>
              <li>Price increases do not entitle existing subscribers to refunds</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Taxes</h2>
            
            <p className="text-gray-700 font-semibold mb-2">Tax Responsibility:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are responsible for any taxes (sales tax, VAT, etc.) applicable to your jurisdiction.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Refund Taxes:</p>
            <p className="text-gray-700 leading-relaxed">
              If a refund is issued and taxes were paid, we will refund the full amount including taxes where applicable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data and Account Deletion</h2>
            
            <p className="text-gray-700 font-semibold mb-2">After Refund:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>You may choose to keep your account and access free content</li>
              <li>Or request full account deletion by emailing hello@optionup.app</li>
              <li>Account deletion is permanent and cannot be undone</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Data Retention:</p>
            <p className="text-gray-700 leading-relaxed">
              We retain payment records as required by law (typically 7 years) even if your account is deleted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">State-Specific Rights</h2>
            
            <p className="text-gray-700 font-semibold mb-2">California Residents:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under California law, you may be entitled to additional refund rights. Contact us for details.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Other States:</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Some states provide additional consumer protection rights. This policy does not limit your statutory rights.
            </p>

            <p className="text-gray-700 font-semibold mb-2">International Users:</p>
            <p className="text-gray-700 leading-relaxed">
              If you are located outside the United States, you may have additional rights under local consumer protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Changes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Refund Policy from time to time. Changes will be posted with an updated "Last Updated" date.
            </p>

            <p className="text-gray-700 font-semibold mb-2">Notice:</p>
            <p className="text-gray-700 leading-relaxed mb-4">Material changes will be communicated via:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Email notification to active subscribers</li>
              <li>Prominent notice on the platform</li>
              <li>Updated date at the top of this policy</li>
            </ul>

            <p className="text-gray-700 font-semibold mb-2">Existing Subscriptions:</p>
            <p className="text-gray-700 leading-relaxed">
              Changes do not affect refund rights for subscriptions purchased before the policy change.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Q: Can I get a partial refund if I only used the service for a few days?
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A: No, we do not provide prorated refunds. However, if you request a refund within 7 days of your initial subscription, you may be eligible for a full refund.
                </p>
              </div>

              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Q: What if I forgot to cancel before my renewal?
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A: Contact us within 48 hours of the charge. We review these requests on a case-by-case basis.
                </p>
              </div>

              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Q: Can I get a refund if I didn't like the content?
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A: Yes, if you request a refund within 7 days of your initial subscription. After that period, refunds are not provided for content preferences.
                </p>
              </div>

              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Q: How long do refunds take?
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A: Once approved, refunds are processed within 5-10 business days. Your financial institution may take additional time to credit your account.
                </p>
              </div>

              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Q: Do you offer exchanges instead of refunds?
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A: We only offer subscription-based service, so exchanges are not applicable. However, we can help you with technical issues or content questions.
                </p>
              </div>

              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Q: What if there's a technical problem preventing me from using the service?
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A: Contact us immediately at hello@optionup.app. We'll work to resolve technical issues first. If unresolvable, we may provide a refund or account credit.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational Nature Reminder</h2>
            <p className="text-gray-700 leading-relaxed mb-4">OptionUp provides educational content only. We do not guarantee:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Trading success or profitability</li>
              <li>Specific learning outcomes</li>
              <li>That content will meet your individual needs</li>
              <li>That concepts will be easy to understand</li>
            </ul>
            <div className="p-4 bg-yellow-50 border-l-4 border-warning rounded-r-xl">
              <p className="text-sm text-gray-700 leading-relaxed font-semibold">
                <strong>Important:</strong> Options trading involves substantial risk. Educational content does not constitute financial advice. We are not responsible for your trading decisions or losses.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact for Refund Requests</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Email:</strong> hello@optionup.app
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Subject Line:</strong> "Refund Request"
            </p>
            <p className="text-gray-700 font-semibold mb-2">Required Information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your account email address</li>
              <li>Subscription/purchase date</li>
              <li>Reason for refund request</li>
              <li>Last 4 digits of payment method (for verification)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>Response Time:</strong> We respond to all refund requests within 2 business days.
            </p>
          </section>

          <hr className="my-8 border-gray-200" />

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>7-day money-back guarantee</strong> on your first subscription charge</li>
              <li><strong>48-hour window</strong> for renewal charge refunds (case-by-case)</li>
              <li><strong>One-time purchases</strong> are generally non-refundable</li>
              <li><strong>Contact us</strong> at hello@optionup.app for refund requests</li>
              <li><strong>Refunds processed</strong> within 5-10 business days via Stripe</li>
              <li><strong>Free content</strong> available with no refund needed</li>
              <li><strong>No refunds</strong> after the applicable refund period</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Stripe Compliance:</strong> This refund policy complies with Stripe's requirements for clear customer communication about refunds and cancellations.
            </p>
          </section>

          <div className="mt-8 p-4 bg-primary-50 border-l-4 border-primary-500 rounded-r-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              Thank you for choosing OptionUp for your options trading education. We're here to help if you have any questions!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


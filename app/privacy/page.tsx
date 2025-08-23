import React from "react";
import { Shield, Mail, Calendar, ExternalLink } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last updated: January 1, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="prose prose-gray dark:prose-invert prose-sm sm:prose-base max-w-none">
          
          {/* Introduction */}
          <section className="mb-8 sm:mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Mentisy LLC (&ldquo;Mentisy&ldquo;, &ldquo;we&ldquo;, &ldquo;our&ldquo;, &ldquo;us&ldquo;) operates the website mentisy.com (the &ldquo;Service&ldquo;). 
              This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-[#FF75A0]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                <strong>Please read this Privacy Policy carefully.</strong> By using our Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              1. Information We Collect
            </h2>
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Personal Information
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We may collect personal information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Email address</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Communications with us</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Content Information
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              When you use our Service, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Images, videos, and other media files you upload</li>
              <li>Text content, challenges, and dares you create</li>
              <li>Interaction data (views, completions, responses)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Technical Information
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We automatically collect certain technical information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>IP address and location data</li>
              <li>Device type, browser, and operating system</li>
              <li>Usage patterns and Service interactions</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              2. How We Use Your Information
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Service Operation:</strong> To provide, maintain, and improve our Service functionality</li>
              <li><strong>User Support:</strong> To respond to inquiries, provide customer support, and resolve issues</li>
              <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security vulnerabilities</li>
              <li><strong>Analytics:</strong> To analyze usage patterns and improve user experience</li>
              <li><strong>Communications:</strong> To send service-related notifications and updates</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              3. Information Sharing and Disclosure
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our Service (hosting, authentication, email services)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or legal process</li>
              <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of Mentisy, our users, or others</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Consent:</strong> When you have given explicit consent to share your information</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              4. Data Security
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-0">
                <strong>Important Security Notice:</strong> While we implement security measures, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Please be aware that:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>End-to-end encryption is not currently implemented</li>
              <li>Users can potentially screenshot, record, or download visible content</li>
              <li>Auto-expiry and watermarking features provide limited protection</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              5. Your Rights and Choices
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              6. Data Retention
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We retain your personal information for as long as necessary to provide our Service and fulfill the purposes described in this Privacy Policy. Content uploaded to our Service may be automatically deleted according to the expiration settings you choose. Account information is retained until you request deletion or close your account.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              7. Children&apos;s Privacy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our Service is not intended for children under the age of 13 (or the minimum age for digital consent in your jurisdiction). We do not knowingly collect personal information from children under this age. If we become aware that we have collected personal information from a child under the applicable age, we will take steps to delete such information.
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              8. International Data Transfers
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable law.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              9. Changes to This Privacy Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&ldquo; date. Your continued use of our Service after such modifications constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8 sm:mb-12">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    10. Contact Us
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Email:</strong> <a href="mailto:hello@mentisy.com" className="text-[#FF75A0] hover:text-[#FFAA70] transition-colors">hello@mentisy.com</a></p>
                    <p><strong>Website:</strong> <a href="https://mentisy.com" className="text-[#FF75A0] hover:text-[#FFAA70] transition-colors inline-flex items-center gap-1">mentisy.com <ExternalLink className="w-3 h-3" /></a></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              This Privacy Policy is governed by the laws of [Your Jurisdiction]. 
              Any disputes arising from this policy shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
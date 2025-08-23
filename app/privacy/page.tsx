import React from "react";
import { Shield, Mail, Calendar, ExternalLink } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 mt-20">
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
              <span>Last updated: {new Date().toLocaleDateString()}</span>
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
              This Privacy Policy explains how Mentisy (&ldquo;we&ldquo;, &ldquo;our&ldquo;, &ldquo;us&ldquo;) collects, uses, and protects your information when you use our Service. Mentisy is operated by an individual creator (the &ldquo;Operator&ldquo;) and is not a registered company or legal entity.
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

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Personal Information</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We may collect personal information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Email address</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Communications with us</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Content Information</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">When you use our Service, we may collect:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Images, videos, and other media files you upload</li>
              <li>Text or other content you share</li>
              <li>Interaction data (views, completions, responses)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Technical Information</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We automatically collect technical data, including:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>IP address and approximate location</li>
              <li>Device type, browser, and operating system</li>
              <li>Usage patterns and interactions</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Service Operation:</strong> To provide, maintain, and improve our Service</li>
              <li><strong>User Support:</strong> To respond to inquiries and resolve issues</li>
              <li><strong>Security:</strong> To detect and prevent fraud or misuse</li>
              <li><strong>Analytics:</strong> To analyze usage patterns for improvements</li>
              <li><strong>Communications:</strong> To send important updates and notifications</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              3. Information Sharing and Disclosure
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We do not sell or trade your personal information. We may share information only:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>With trusted service providers (e.g., hosting, authentication)</li>
              <li>When required by law or to protect rights and safety</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              4. Data Security
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We use reasonable measures to protect your data, but no method is 100% secure.</p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-0">
                <strong>Important:</strong> No system is fully secure. Avoid sharing highly sensitive content. Screenshots or recordings by others cannot be prevented.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              5. Your Rights
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Depending on your location, you may have rights to access, correct, delete, or export your data, and to object or restrict processing. To exercise these rights, contact us below.</p>
          </section>

          {/* Data Retention */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              6. Data Retention
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We keep your information as long as needed to provide the Service or as required by law. Content may expire automatically based on settings you choose.</p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              7. Children&apos;s Privacy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">The Service is not for children under 18 or the minimum age of digital consent in your jurisdiction. We do not knowingly collect data from minors.</p>
          </section>

          {/* Changes */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              8. Changes to This Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We may update this Privacy Policy. When we do, we will revise the &ldquo;Last updated&ldquo; date above.</p>
          </section>

          {/* Contact */}
          <section className="mb-8 sm:mb-12">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact Us</h2>
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
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">This Privacy Policy is governed by the laws of [Your Region/Country]. By using Mentisy, you agree to this policy.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

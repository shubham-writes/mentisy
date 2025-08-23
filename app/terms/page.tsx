import React from "react";
import { FileText, Mail, Calendar, ExternalLink, Shield, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Terms of Service
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
              These Terms of Service (&ldquo;Terms&ldquo;) govern your use of the Mentisy website and service (collectively, the &ldquo;Service&ldquo;), owned and operated by the individual creator identified below (the &ldquo;Operator&ldquo;). Mentisy is not a registered company or separate legal entity.
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-[#FF75A0]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                <strong>By accessing or using our Service, you agree to be bound by these Terms.</strong> If you disagree with any part, do not access or use the Service.
              </p>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              1. Eligibility & Acceptance
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              By creating an account or using the Service, you represent that you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>are at least 18 years old <em>or</em> the minimum age of digital consent in your jurisdiction, and have capacity to contract;</li>
              <li>will comply with applicable laws and these Terms; and</li>
              <li>provide accurate and complete information.</li>
            </ul>
          </section>

          {/* Description of Service */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              2. Description of Service
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Mentisy enables users to upload and share content (e.g., images and videos) with optional time limits, watermarks, and access controls.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Content upload, viewing, and sharing</li>
              <li>Optional expiry, watermarking, and basic protection features</li>
              <li>User accounts and basic analytics</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              3. Accounts
            </h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Keep your credentials confidential and notify the Operator of unauthorized use.</li>
              <li>You are responsible for activity under your account.</li>
              <li>We may suspend or terminate accounts that violate these Terms.</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              4. Acceptable Use
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Use the Service only for lawful purposes. You agree not to:</p>
            <div className="grid gap-4 mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Prohibited Content</h3>
                <ul className="list-disc pl-5 text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>Illegal, harmful, threatening, or harassing content</li>
                  <li>Infringing content or violations of others&apos; rights</li>
                  <li>Sexually explicit content involving minors</li>
                  <li>Spam, malware, or malicious code</li>
                  <li>Content promoting violence or illegal activity</li>
                </ul>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Prohibited Activities</h3>
                <ul className="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>Attempting to gain unauthorized access to the Service or other accounts</li>
                  <li>Interfering with or disrupting the Service</li>
                  <li>Using automated tools without permission</li>
                  <li>Impersonation or providing false information</li>
                  <li>Collecting personal data without consent</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Content and IP */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              5. Content & Intellectual Property
            </h2>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Your Content</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You retain ownership of content you upload &ldquo;User Content&ldquo;). You grant the Operator a worldwide, non-exclusive, royalty-free license to store, process, display, and back up User Content as necessary to provide the Service and comply with law.
            </p>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Our IP</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Service&apos;s design, code, and features are owned by the Operator. You may not copy, modify, distribute, or reverse engineer any part of the Service.
            </p>
          </section>

          {/* Privacy & Security */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              6. Privacy & Security
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              See our Privacy Policy to learn how we collect and use data.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Important Security Notice</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    While we implement measures like watermarking, access controls, and content expiry, we cannot guarantee protection against screenshots, screen recordings, or unauthorized downloads. Avoid uploading highly sensitive information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Availability */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              7. Availability & Changes
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              We aim for reliable availability but do not guarantee uninterrupted or error-free operation. We may modify, suspend, or discontinue features with reasonable notice where feasible.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              8. Termination
            </h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>By you:</strong> You may delete your account at any time.</li>
              <li><strong>By the Operator:</strong> Accounts may be suspended or terminated for violations or risk to other users.</li>
              <li><strong>Effect:</strong> Access ends on termination and content may be deleted.
              </li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              9. Disclaimers
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&ldquo; AND &ldquo;AS AVAILABLE&ldquo; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, THE OPERATOR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              10. Limitation of Liability
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE OPERATOR WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA. THE TOTAL LIABILITY FOR ALL CLAIMS IN ANY 12-MONTH PERIOD WILL NOT EXCEED THE GREATER OF (A) AMOUNTS YOU PAID FOR THE SERVICE DURING THAT PERIOD OR (B) US$100.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              11. Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              You agree to indemnify and hold the Operator harmless from claims, damages, or expenses (including reasonable legal fees) arising from your use of the Service, your User Content, or your violation of these Terms or others&apos; rights.
            </p>
          </section>

          {/* Disputes & Governing Law */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              12. Governing Law & Disputes
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              These Terms are governed by the laws of <strong>[Your State/Region, Country]</strong>, without regard to conflict of laws principles.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Before filing any legal claim, the parties will try to resolve the dispute informally within 30 days of notice. If not resolved, disputes will be subject to the exclusive jurisdiction of the courts located in <strong>[City, State/Region]</strong>. You and the Operator consent to personal jurisdiction there.
            </p>
          </section>

          {/* Changes */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              13. Changes to These Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update these Terms. When we make material changes, we will post the updated Terms and update the &ldquo;Last updated&ldquo; date above.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8 sm:mb-12">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    14. Contact
                  </h2>
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
              By using Mentisy, you acknowledge that you have read, understood, and agree to be bound by these Terms. This page is provided for general informational purposes and is not legal advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

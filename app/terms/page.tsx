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
              <span>Last updated: August 23, 2025</span>
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
              These Terms of Service (&ldquo;Terms&ldquo;) govern your use of the Mentisy website and service (collectively, the &ldquo;Service&ldquo;) operated by Mentisy LLC (&ldquo;Mentisy&ldquo;, &ldquo;we&ldquo;, &ldquo;our&ldquo;, &ldquo;us&ldquo;).
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-[#FF75A0]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                <strong>By accessing or using our Service, you agree to be bound by these Terms.</strong> If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              By creating an account, accessing, or using the Service, you represent that:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>You are at least 13 years old (or the minimum age for digital consent in your jurisdiction)</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You will comply with all applicable laws and regulations</li>
              <li>All information you provide is accurate and complete</li>
            </ul>
          </section>

          {/* Description of Service */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              2. Description of Service
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Mentisy is a platform that allows users to create and share interactive content including images, videos, challenges, and dares that can expire after a specified time. The Service includes features such as:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Content upload and sharing functionality</li>
              <li>Interactive challenges and games</li>
              <li>Time-limited content visibility</li>
              <li>Watermarking and protection features</li>
              <li>User account management</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              3. User Accounts
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              To access certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You may not create multiple accounts or share your account with others. We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          {/* Acceptable Use */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              4. Acceptable Use Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <div className="grid gap-4 mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Prohibited Content</h3>
                <ul className="list-disc pl-5 text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>Illegal, harmful, threatening, abusive, or harassing content</li>
                  <li>Content that violates intellectual property rights</li>
                  <li>Sexually explicit or inappropriate content involving minors</li>
                  <li>Spam, malware, or malicious code</li>
                  <li>Content that promotes violence, discrimination, or illegal activities</li>
                </ul>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Prohibited Activities</h3>
                <ul className="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>Attempting to gain unauthorized access to the Service or other users&apos; accounts</li>
                  <li>Interfering with or disrupting the Service or servers</li>
                  <li>Using automated tools to access the Service without permission</li>
                  <li>Impersonating others or providing false information</li>
                  <li>Collecting user information without consent</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Content and Intellectual Property */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              5. Content and Intellectual Property
            </h2>
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Your Content
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You retain ownership of all content you upload to the Service (&ldquo;User Content&ldquo;). By uploading User Content, you grant Mentisy a worldwide, non-exclusive, royalty-free license to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Store, process, and display your content as necessary to provide the Service</li>
              <li>Apply watermarks and protection measures as configured</li>
              <li>Create backups and ensure service functionality</li>
              <li>Comply with legal obligations and enforce these Terms</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Our Intellectual Property
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Service, including its design, functionality, and underlying technology, is owned by Mentisy and protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the Service.
            </p>
          </section>

          {/* Privacy and Security */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              6. Privacy and Security
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use the Service.
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Important Security Notice</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    While we implement security measures including watermarking, access controls, and auto-expiry features, 
                    we cannot guarantee complete protection against screenshots, recordings, or unauthorized downloads. 
                    Users should avoid uploading highly sensitive or confidential information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Service Availability */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              7. Service Availability
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We strive to maintain Service availability but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Scheduled maintenance or updates</li>
              <li>Technical difficulties or system failures</li>
              <li>Circumstances beyond our reasonable control</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              8. Termination
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Either party may terminate your access to the Service:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>By You:</strong> You may delete your account and stop using the Service at any time</li>
              <li><strong>By Us:</strong> We may suspend or terminate your account for violations of these Terms, illegal activity, or other reasonable cause</li>
              <li><strong>Effect of Termination:</strong> Upon termination, your right to use the Service ceases, and we may delete your account and associated content</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Provisions regarding intellectual property, disclaimers, limitation of liability, and dispute resolution survive termination.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              9. Disclaimers and Warranties
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&ldquo; AND &ldquo;AS AVAILABLE&ldquo; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, MENTISY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>WARRANTIES OF NON-INFRINGEMENT OR TITLE</li>
                <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE</li>
                <li>WARRANTIES REGARDING SECURITY OR DATA PROTECTION</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Some jurisdictions do not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you.
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
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MENTISY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Service interruptions or security breaches</li>
                <li>Unauthorized access to or use of User Content</li>
                <li>Third-party actions or content</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our total liability to you for all claims shall not exceed the amount you paid us in the twelve months preceding the claim, or $100, whichever is greater.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              11. Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              You agree to indemnify, defend, and hold harmless Mentisy and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Your use of the Service or violation of these Terms</li>
              <li>Your User Content or any third-party claims related to it</li>
              <li>Your violation of any third-party rights</li>
              <li>Any illegal or unauthorized activities</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              12. Dispute Resolution
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Any disputes arising from these Terms or your use of the Service shall be resolved through:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Informal Resolution:</strong> Good faith negotiations between the parties</li>
              <li><strong>Binding Arbitration:</strong> If informal resolution fails, disputes shall be resolved through binding arbitration in [Your Jurisdiction]</li>
              <li><strong>Class Action Waiver:</strong> You agree to resolve disputes individually and waive rights to class action proceedings</li>
            </ol>
          </section>

          {/* General Terms */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              13. General Terms
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Governing Law</h3>
                <p>These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Severability</h3>
                <p>If any provision of these Terms is found unenforceable, the remaining provisions remain in full force and effect.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Assignment</h3>
                <p>You may not assign these Terms without our written consent. We may assign these Terms without restriction.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Entire Agreement</h3>
                <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Mentisy.</p>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              14. Changes to These Terms
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We reserve the right to modify these Terms at any time. We will notify users of material changes by:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Posting the updated Terms on this page</li>
              <li>Updating the &ldquo;Last updated&ldquo; date</li>
              <li>Sending email notification for significant changes</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Your continued use of the Service after changes become effective constitutes acceptance of the updated Terms.
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
                    15. Contact Information
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Email:</strong> <a href="mailto:hello@mentisy.com" className="text-[#FF75A0] hover:text-[#FFAA70] transition-colors">hello@mentisy.com</a></p>
                    <p><strong>Website:</strong> <a href="https://mentisy.com" className="text-[#FF75A0] hover:text-[#FFAA70] transition-colors inline-flex items-center gap-1">mentisy.com <ExternalLink className="w-3 h-3" /></a></p>
                    <p><strong>Address:</strong> [Your Business Address]</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              These Terms of Service are effective as of the date listed above and remain in effect until terminated. 
              By using Mentisy, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
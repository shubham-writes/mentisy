import React from "react";
import { FileText, User, Shield, AlertTriangle, Ban, RefreshCw, Mail } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6 shadow-lg">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Simple rules for using Mentisy. Let&apos;s keep it fair and fun for everyone.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Effective Date: [Insert Date]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Introduction Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Welcome to Mentisy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Welcome to <strong>Mentisy.com</strong> (&ldquo;Mentisy&ldquo;, &ldquo;we&ldquo;, &ldquo;our&ldquo;, &ldquo;us&ldquo;).
                By using our platform, you agree to these Terms of Service. Please read them carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Using Mentisy */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Using Mentisy</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You may use Mentisy only for lawful purposes. Do not misuse the service, attempt unauthorized access, 
                or upload illegal or harmful content.
              </p>
            </div>
          </div>
        </div>

        {/* Content Ownership */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Ownership</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You own the content you upload. By uploading, you grant us a limited license to store, process, 
                and display it as needed to provide the service. We do not claim ownership.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Limitations */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security & Limitations</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use techniques like expiring links, watermarking, and limited access, but we cannot guarantee 
                complete protection against downloads, screenshots, or misuse. 
                <strong> Please avoid uploading extremely sensitive data.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Ban className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Termination</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may suspend or terminate accounts that violate these Terms. You may delete your account anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Liability */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Liability</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Mentisy is provided &ldquo;as is&ldquo;. We are not liable for damages, data loss, or misuse caused by third parties or user actions.
              </p>
            </div>
          </div>
        </div>

        {/* Changes */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update these Terms of Service. Continued use of Mentisy means you accept the latest version.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-8 shadow-xl text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Questions? We&apos;re Here to Help</h2>
              <p className="text-indigo-100 leading-relaxed mb-4">
                If you have questions, email us at{" "}
                <a
                  href="mailto:support@mentisy.com"
                  className="text-white hover:text-indigo-200 transition-colors underline decoration-2 underline-offset-4"
                >
                  hello@mentisy.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Thanks for being part of the Mentisy community</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
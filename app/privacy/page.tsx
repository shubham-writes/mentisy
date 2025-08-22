import React from "react";
import { Shield, Eye, Users, Lock, Heart, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              We believe in transparency. Here&apos;s how we protect and use your data.
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
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Welcome to Mentisy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Welcome to <strong>Mentisy.com</strong> (&ldquo;Mentisy&ldquo;, &ldquo;we&ldquo;, &ldquo;our&ldquo;, &ldquo;us&ldquo;).
                We respect your privacy and are committed to protecting your personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Information Collection */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may collect account info (email, name), uploaded content (images, videos, notes), 
              and usage data (logs, IP address, device/browser type). We do <strong>not sell your data</strong> to third parties.
            </p>
          </div>
        </div>

        {/* How We Use Data */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Data</h2>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              "Provide core features (uploading, sharing, expiring links).",
              "Improve the service (debugging, analytics).",
              "Keep Mentisy secure (fraud/spam detection).",
              "Send important service emails (e.g. login, updates)."
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sharing */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sharing of Data</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We do not share your personal data except with trusted providers (hosting, authentication, email services), 
              or if required by law.
            </p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may access, update, or delete your data, request account deletion, or opt out of certain 
              communications depending on your location.
            </p>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security</h2>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            We use secure hosting and limited access controls. However:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { text: "No end-to-end encryption is currently offered.", important: true },
              { text: "It is technically impossible to fully prevent downloads, screenshots, or recordings once content is visible.", important: false },
              { text: "We use measures like auto-expiry, watermarking, and view limits, but these are not foolproof.", important: false }
            ].map((item, index) => (
              <div key={index} className={`flex items-start gap-3 p-4 rounded-xl ${
                item.important 
                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                  : 'bg-gray-50 dark:bg-gray-700/50'
              }`}>
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.important ? 'bg-red-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-gray-700 dark:text-gray-300">
                  {item.important ? <strong>{item.text}</strong> : item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>⚠️ Please avoid sharing highly sensitive or confidential information.</strong>
            </p>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Children&apos;s Privacy</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Mentisy is not intended for children under 13 (or the age of digital consent in your country).
            </p>
          </div>
        </div>

        {/* Changes */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes</h2>
            </div>
          </div>
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200 dark:border-violet-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy. The latest version will always be available here.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 shadow-xl text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
              <p className="text-blue-100 leading-relaxed mb-4">
                If you have questions, email us at{" "}
                <a
                  href="mailto:support@mentisy.com"
                  className="text-white hover:text-blue-200 transition-colors underline decoration-2 underline-offset-4"
                >
                  hello@mentisy.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Your privacy matters to us</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </div>
    </main>
  );
}
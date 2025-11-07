// components/layout/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { FeedbackModal } from "@/components/feedback/FeedbackModal";

export default function Footer() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleHelpCenterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFeedbackModalOpen(true);
  };

  return (
    <>
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Mentisy</h4>
              <p className="text-gray-400 mb-4">Share laughs. Spark joy. Play together.</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-orange-500">🇮🇳</span>
                <span className="text-gray-400">Built in India</span>
              </div>
            </div>

            <div className="flex gap-16 md:gap-20">
              <div>
                <h5 className="font-semibold mb-4">Support</h5>
                <ul className="space-y-5 text-gray-400">
                  <li>
                    <button
                      onClick={handleHelpCenterClick}
                      className="hover:text-white transition-colors text-left"
                    >
                      Help Center
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=mentisyhelp@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>

                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-4">Connect</h5>
                <div className="space-y-3">
                  <a
                    href="https://chat.whatsapp.com/JhYIG0999ukHzEdnSQ0d07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-400 transition-colors text-sm text-white shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Talk to us
                  </a>
                  <div>
                    <a
                      href="https://www.instagram.com/shubhambuildsmentisy?utm_source=qr&igsh=MW1zbGJiMDNwbDE0cQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Follow us on Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Mentisy. All Rights Reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* FeedbackModal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        defaultTab="general"
      />
    </>
  );
}
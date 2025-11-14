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
      <footer className="px-6 py-8 md:py-12 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          {/* Mobile View - Minimal */}
          <div className="md:hidden">
            <div className="text-center mb-6">
              <h4 className="font-bold text-lg mb-2">Mentisy</h4>
              <p className="text-gray-400 text-sm mb-3">Share laughs. Spark joy. Play together.</p>
            </div>

            {/* Single column links */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <button
                onClick={handleHelpCenterClick}
                className="text-gray-400 hover:text-white transition-colors text-sm underline decoration-gray-600 underline-offset-2 hover:decoration-white"
              >
                Help Center
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-6">
                {/* Email */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mentisyhelp@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/shubhambuildsmentisy?utm_source=qr&igsh=MW1zbGJiMDNwbDE0cQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://chat.whatsapp.com/JhYIG0999ukHzEdnSQ0d07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom links */}
            <div className="border-t border-gray-800 pt-6">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 text-xs">
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </div>
                <p className="text-gray-400 text-xs">
                  © 2025 Mentisy. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop View - Original Design */}
          <div className="hidden md:block">
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










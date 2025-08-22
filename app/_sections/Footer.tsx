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
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Mentisy</h4>
              <p className="text-gray-400 mb-4">Share laughs. Spark joy. Play together.</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-orange-500">🇮🇳</span>
                <span className="text-gray-400">Built in India</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Product <span className="text-gray-400 text-xs border-2 border-gray-700 px-1 rounded-full">coming soon</span></h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Friends</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Fun</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trending</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={handleHelpCenterClick}
                    className="hover:text-white transition-colors text-left"
                  >
                    Help Center
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li>
                  <a 
                    href="https://chat.whatsapp.com/JhYIG0999ukHzEdnSQ0d07" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-400 transition-colors text-sm text-white shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Talk to us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Mentisy. Made for fun, built for friends.
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
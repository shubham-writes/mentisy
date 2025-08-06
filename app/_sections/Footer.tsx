// components/layout/Footer.tsx
"use client";

import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">OnlyForYou</h4>
            <p className="text-gray-400 mb-4">Share authentically. Disappear completely.</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-orange-500">🇮🇳</span>
              <span className="text-gray-400">Built in India</span>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Product</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li>
                <button className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" />
                  👋 Talk to us
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 OnlyForYou. Your privacy. Your control.
          </p>
        </div>
      </div>
    </footer>
  );
}
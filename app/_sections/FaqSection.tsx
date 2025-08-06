// components/sections/FaqSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "What happens after the file is viewed?",
      answer: "The file is automatically deleted from our servers within seconds of being viewed. No trace remains."
    },
    {
      question: "Can the recipient screen record?",
      answer: "While we can't prevent screen recording, our watermark system deters it by showing the recipient's name and IP address."
    },
    {
      question: "What's in the watermark?",
      answer: "The watermark includes the recipient's name, IP address, and timestamp - making any screenshots easily traceable."
    },
    {
      question: "Do I need an app?",
      answer: "No! OnlyForYou works directly in your browser. Just share the link through any messaging app."
    },
    {
      question: "Can I delete the file before they view it?",
      answer: "Yes, you can delete any unviewed secret from your dashboard at any time."
    }
  ];

  return (
    <div className="px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to know</p>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
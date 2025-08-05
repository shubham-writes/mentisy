"use client";

import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";
import { Heart, Eye, Clock, Zap, Shield, Sparkles, ArrowRight, Upload, Users, Lock, Play, Check, X, ChevronDown, MessageCircle, Star, Timer, Camera, Link as LinkIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
 const [isVisible, setIsVisible] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [userCount, setUserCount] = useState(12300);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior || 'smooth';
    }, 100);

    

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);


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

  const testimonials = [
    {
      text: "I sent a breakup confession to my ex — no leaks, no drama.",
      author: "Sarah, 24"
    },
    {
      text: "I shared my transformation video with a friend. Just once.",
      author: "Mike, 19"
    },
    {
      text: "I don't trust WhatsApp for personal stuff — this gave me peace of mind.",
      author: "Priya, 22"
    }
  ];

  // Demo animation cycle
  useEffect(() => {
    const demoInterval = setInterval(() => {
      setDemoStep(prev => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(demoInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Unauthenticated>
        {/* Hero Section */}
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative pt-16 pb-12">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/5 via-transparent to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:via-transparent dark:to-[#FFAA70]/10" />
          
          <div className="relative px-6 mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-center lg:text-left space-y-6">
                {/* Dynamic Counter Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                    Join {userCount.toLocaleString()} others sending secrets today!
                  </span>
                </div>
                
                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Send your most
                    <span className="block bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                      personal moments
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    <strong>Just once.</strong> With no fear of leaks, screenshots, or downloads. Share your truth authentically.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Unauthenticated>
                    <SignUpButton mode="modal">
                      <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105 text-lg">
                        🎁 Try Free (5 Uploads)
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </SignUpButton>
                  </Unauthenticated>
                  <Authenticated>
                    <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105 text-lg">
                      🚀 Create Secret
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Authenticated>
                  <button className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-200 text-lg">
                    👀 Preview a Real Example
                  </button>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                  <div className="flex items-center px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-emerald-500/20">
                    <Eye className="w-4 h-4 text-emerald-500 mr-2" />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">One-time view</span>
                  </div>
                  <div className="flex items-center px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-500/20">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-blue-600 dark:text-blue-400">Watermark protection</span>
                  </div>
                  <div className="flex items-center px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-[#FFAA70]/20">
                    <Zap className="w-4 h-4 text-[#FFAA70] mr-2" />
                    <span className="text-sm text-orange-600 dark:text-orange-400">No app required</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Live Demo */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-80 h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-4 shadow-2xl">
                    <div className="bg-white dark:bg-gray-950 rounded-2xl h-full p-6 flex flex-col items-center justify-center">
                      {demoStep === 0 && (
                        <div className="text-center space-y-4 animate-fadeIn">
                          <Upload className="w-16 h-16 text-[#FF75A0] mx-auto" />
                          <h3 className="font-semibold text-lg">1. Upload</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Select your photo or video</p>
                        </div>
                      )}
                      {demoStep === 1 && (
                        <div className="text-center space-y-4 animate-fadeIn">
                          <Users className="w-16 h-16 text-blue-500 mx-auto" />
                          <h3 className="font-semibold text-lg">2. Watermark</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Add recipient&apos;s name</p>
                        </div>
                      )}
                      {demoStep === 2 && (
                        <div className="text-center space-y-4 animate-fadeIn">
                          <LinkIcon className="w-16 h-16 text-emerald-500 mx-auto" />
                          <h3 className="font-semibold text-lg">3. Share</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Copy link & send anywhere</p>
                        </div>
                      )}
                      {demoStep === 3 && (
                        <div className="text-center space-y-4 animate-fadeIn">
                          <Timer className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
                          <h3 className="font-semibold text-lg">4. Auto Delete</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Gone after one view</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-center">
                    <span className="bg-[#FF75A0] text-white px-3 py-1 rounded-full">
                      ⚡Takes less than 30 seconds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


        {/* Streamlined Form Section */}
        <div className="px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            {/* Form container with better spacing */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Try it now — no signup required
                </p>
                <div className="mt-2 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
              </div>
              
              <SecretForm isLandingPage={true} />
            </div>
          </div>
        </div>

         {/* Free vs Pro Pricing */}
        <div className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What You Get — Free vs Pro</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Level up your challenge</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">₹0</p>
                  <p className="text-gray-500">Perfect to get started</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>5 uploads per month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Basic watermark (Name/IP)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Timer & auto delete</span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <X className="w-5 h-5 text-gray-400" />
                    <span>Album creation</span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <X className="w-5 h-5 text-gray-400" />
                    <span>Add notes</span>
                  </li>
                  <li className="flex items-center gap-3 opacity-50">
                    <X className="w-5 h-5 text-gray-400" />
                    <span>HD quality</span>
                  </li>
                </ul>
                
                <SignUpButton mode="modal">
                  <button className="w-full py-3 px-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Get Started Free
                  </button>
                </SignUpButton>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 border-2 border-[#FF75A0] rounded-2xl p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">₹99</p>
                  <p className="text-gray-500">per month</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span><strong>Unlimited</strong> uploads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Full watermark + toggle</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Timer & auto delete</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Create multi-part story raids</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Add personal notes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>HD quality uploads</span>
                  </li>
                </ul>
                
                <button className="w-full py-3 px-6 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105">
                  🚀 Free 7-day Pro Trial
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Features Comparison */}
        <div className="px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Why OnlyForYou hits different</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400">Finally, a platform that gets it</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <thead className="bg-gradient-to-r from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20">
                  <tr>
                    <th className="px-6 py-5 text-left font-semibold text-gray-900 dark:text-white text-base">Feature</th>
                    <th className="px-6 py-5 text-center font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent text-base">OnlyForYou</th>
                    <th className="px-6 py-5 text-center font-medium text-gray-600 dark:text-gray-400">WhatsApp</th>
                    <th className="px-6 py-5 text-center font-medium text-gray-600 dark:text-gray-400">Snapchat</th>
                    <th className="px-6 py-5 text-center font-medium text-gray-600 dark:text-gray-400">Others</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">One-Time View</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-400 font-bold">✕</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Private Text Messages</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg mb-1">
                          <span className="text-white font-bold text-sm">✓</span>
                        </span>
                        <span className="text-xs font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">100%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-400 font-bold">✕</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-400 font-bold">✕</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-400 font-bold">✕</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">No App Required</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-400 font-bold">✕</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-400 font-bold">✕</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors rounded-b-xl">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">View Notifications</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg mb-1">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">⚠</span>
                        </span>
                        <span className="text-xs text-amber-600 dark:text-amber-400">Limited</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-400 font-bold">✕</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>


{/* Testimonials */}
        <div className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Thousands Are Using OnlyForYou</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Real stories from real users</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white italic mb-3">{testimonial.text}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">— {testimonial.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-sm">🔐 One-Time View</h4>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-sm">🧊 Watermark Protection</h4>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Timer className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-semibold text-sm">📉 Auto Delete</h4>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="font-semibold text-sm">🌍 Works Anywhere</h4>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
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
        

       
      </Unauthenticated>

      <Authenticated>
        <div className="min-h-screen">
          {/* Clean authenticated header */}
          <div className="px-6 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Your secrets</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Share what matters</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-500">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online
                </div>
              </div>
              
              {/* Compact form for authenticated users */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6 shadow-sm">
                <SecretForm isLandingPage={false} />
              </div>
              
              {/* Secrets list */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">Sent secrets</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Track your ephemeral moments</p>
                </div>
                <MySecretsList />
              </div>
            </div>
          </div>
        </div>
      </Authenticated>

       {/* Live Preview Demo */}
        <div className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">See It in Your Feed</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Experience the one-time view magic</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-sm mx-auto">
              <div className="bg-white rounded-xl p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center mx-auto">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Secret from Sarah</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">⚠️ This link can only be viewed once</p>
                  <div className="w-full h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 font-medium">Preview Content</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center space-x-2">
                    <Timer className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 font-mono text-sm">30s remaining</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white py-3 rounded-lg font-medium">
                  View Secret
                </button>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Want to send your own?</p>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105">
                  Start Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>


{/* Final CTA */}
        <div className="px-6 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold">Ready to share authentically?</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Some moments are too real for permanence. Share them here.
              </p>
              
              <div className="pt-4">
                <SignUpButton mode="modal">
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105 text-lg">
                    🎉 Start Your #JustOneView Challenge
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </SignUpButton>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                Join {userCount.toLocaleString()} others sharing their truth
              </p>
            </div>
          </div>
        </div>

      {/* Footer */}
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
    </div>
  );
}
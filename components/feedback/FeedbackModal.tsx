"use client";

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { 
  Star, 
  Gamepad2, 
  Bug, 
  MessageCircle, 
  Lightbulb,
  Send,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  Heart
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'game' | 'bug' | 'general' | 'feature';
}

type FeedbackType = 'game_suggestion' | 'bug_report' | 'general_feedback' | 'feature_request';

export function FeedbackModal({ isOpen, onClose, defaultTab = 'game' }: FeedbackModalProps) {
  const [selectedType, setSelectedType] = useState<FeedbackType>(
    defaultTab === 'game' ? 'game_suggestion' :
    defaultTab === 'bug' ? 'bug_report' :
    defaultTab === 'feature' ? 'feature_request' : 'general_feedback'
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gameIdea, setGameIdea] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = useMutation(api.feedback.submitFeedback);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setGameIdea('');
    setRating(0);
    setUserEmail('');
    setError(null);
    setSubmitSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Please provide a title');
      return;
    }

    if (!description.trim() && selectedType !== 'game_suggestion') {
      setError('Please provide a description');
      return;
    }

    if (selectedType === 'game_suggestion' && !gameIdea.trim()) {
      setError('Please describe your game idea');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitFeedback({
        type: selectedType,
        title: title.trim(),
        description: description.trim(),
        gameIdea: gameIdea.trim() || undefined,
        rating: rating > 0 ? rating : undefined,
        userEmail: userEmail.trim() || undefined,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => (
          <div className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 rounded-xl border-2 border-solid border-[#FF75A0]/20 dark:border-[#FFAA70]/30">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`p-1 transition-all duration-300 hover:scale-125 active:scale-110 ${
              star <= rating 
                ? 'text-[#FFAA70] drop-shadow-lg animate-pulse' 
                : 'text-gray-300 hover:text-[#FFAA70]/60'
            }`}
            type="button"
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <div className="flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-4 h-4 text-[#FF75A0]" />
          <span className="text-sm font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
            {rating}/5 stars
          </span>
          <Sparkles className="w-4 h-4 text-[#FFAA70]" />
        </div>
      )}
    </div>
  );

  const feedbackTypes = [
    { 
      id: 'game_suggestion', 
      icon: Gamepad2, 
      title: 'Suggest Game', 
      description: 'Share your creative game ideas',
      emoji: '🎮',
      gradient: 'from-[#FF75A0] to-[#e65a85]',
      hoverGradient: 'hover:from-[#FF75A0]/10 hover:to-[#e65a85]/10',
      borderColor: 'border-[#FF75A0]',
      textColor: 'text-[#FF75A0]'
    },
    { 
      id: 'bug_report', 
      icon: Bug, 
      title: 'Report Bug', 
      description: 'Help us fix what\'s broken',
      emoji: '🐛',
      gradient: 'from-[#FFAA70] to-[#e6955a]',
      hoverGradient: 'hover:from-[#FFAA70]/10 hover:to-[#e6955a]/10',
      borderColor: 'border-[#FFAA70]',
      textColor: 'text-[#FFAA70]'
    },
    { 
      id: 'feature_request', 
      icon: Lightbulb, 
      title: 'Request Feature', 
      description: 'Dream up new possibilities',
      emoji: '💡',
      gradient: 'from-[#FF75A0] to-[#FFAA70]',
      hoverGradient: 'hover:from-[#FF75A0]/10 hover:to-[#FFAA70]/10',
      borderColor: 'border-[#FF75A0]',
      textColor: 'text-[#FF75A0]'
    },
    { 
      id: 'general_feedback', 
      icon: MessageCircle, 
      title: 'General Feedback', 
      description: 'Share your honest thoughts',
      emoji: '💭',
      gradient: 'from-[#FFAA70] to-[#FF75A0]',
      hoverGradient: 'hover:from-[#FFAA70]/10 hover:to-[#FF75A0]/10',
      borderColor: 'border-[#FFAA70]',
      textColor: 'text-[#FFAA70]'
    },
  ] as const;

  if (!isOpen) return null;

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
        <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-0 overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="relative bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20 p-6 text-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FF75A0]/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#FFAA70]/10 rounded-full animate-pulse delay-300"></div>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                Thank You! 🎉
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                Your feedback means the world to us! We&apos;ll review it with care and excitement.
              </p>
              <div className="flex justify-center">
                <Heart className="w-5 h-5 text-[#FF75A0] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 pb-96 flex items-end justify-center bg-white/40 dark:bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[100vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-0 my-4 animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header - Compact version */}
        <div className="relative bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20 p-4 border-b border-[#FF75A0]/20 dark:border-[#FFAA70]/30">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden rounded-t-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFAA70]/5 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#FF75A0]/5 rounded-full translate-y-10 -translate-x-10"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-0">
                  Share Your Voice
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Help us build something amazing together
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-solid border-red-200 dark:border-red-700 rounded-xl animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</span>
            </div>
          )}

          {/* Feedback Type Selection - Compact version */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 text-center">
              What&apos;s on your mind?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {feedbackTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as FeedbackType)}
                    className={`relative p-4 border-2 border-solid rounded-xl cursor-pointer transition-all duration-300 min-h-[100px] flex flex-col items-center justify-center text-center active:scale-98 group ${
                      isSelected
                        ? `${type.borderColor} bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20 shadow-lg border-opacity-60`
                        : `border-gray-200 dark:border-gray-600 ${type.hoverGradient} hover:border-[#FF75A0]/40 dark:hover:border-[#FFAA70]/40`
                    }`}
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                      isSelected 
                        ? 'opacity-100' 
                        : 'opacity-0 group-hover:opacity-100'
                    } bg-gradient-to-br from-[#FF75A0]/5 to-[#FFAA70]/5`}></div>
                    
                    <div className="relative z-10 space-y-2">
                      <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-br ${type.gradient} shadow-lg scale-110`
                          : 'bg-gray-100 dark:bg-gray-700 group-hover:scale-105'
                      }`}>
                        <span className="text-lg">{type.emoji}</span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm mb-1 transition-colors duration-300 ${
                          isSelected ? type.textColor : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {type.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating for General Feedback */}
          {selectedType === 'general_feedback' && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 text-center">
                Rate Your Experience
              </h4>
              <StarRating />
            </div>
          )}

          {/* Form Fields - Compact version */}
          <div className="space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                {selectedType === 'game_suggestion' ? '🎮 Game Name *' : 
                 selectedType === 'bug_report' ? '🐛 What went wrong? *' :
                 selectedType === 'feature_request' ? '💡 Feature Name *' : '💭 Subject *'}
              </label>
              <input
                type="text"
                placeholder={
                  selectedType === 'game_suggestion' ? 'e.g., Memory Challenge, Quick Math...' :
                  selectedType === 'bug_report' ? 'e.g., Game freezes, Can\'t upload...' :
                  selectedType === 'feature_request' ? 'e.g., Dark mode, Voice messages...' :
                  'e.g., Loving the app!, Room for improvement...'
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 px-4 text-sm border-2 border-solid border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FFAA70] focus:outline-none rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:shadow-lg focus:shadow-[#FF75A0]/10"
              />
            </div>

            {/* Game Idea Field */}
            {selectedType === 'game_suggestion' && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                  🎯 How does it work? *
                </label>
                <textarea
                  placeholder="Describe the gameplay, rules, and what makes it fun!"
                  value={gameIdea}
                  onChange={(e) => setGameIdea(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 text-sm border-2 border-solid border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FFAA70] focus:outline-none rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:shadow-lg focus:shadow-[#FF75A0]/10 resize-none"
                />
              </div>
            )}

            {/* Description Field */}
            {selectedType !== 'game_suggestion' && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                  {selectedType === 'bug_report' ? '🔍 Tell us more *' :
                   selectedType === 'feature_request' ? '✨ Describe your vision *' : '💬 Share your thoughts *'}
                </label>
                <textarea
                  placeholder={
                    selectedType === 'bug_report' ? 'What were you trying to do? What happened?' :
                    selectedType === 'feature_request' ? 'How would this feature work?' :
                    'What do you love? What could be better?'
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 text-sm border-2 border-solid border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FFAA70] focus:outline-none rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:shadow-lg focus:shadow-[#FF75A0]/10 resize-none"
                />
              </div>
            )}

            {/* Additional details for game suggestions */}
            {selectedType === 'game_suggestion' && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                  🌟 Extra details (optional)
                </label>
                <textarea
                  placeholder="Any special features or unique twists?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 text-sm border-2 border-solid border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FFAA70] focus:outline-none rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:shadow-lg focus:shadow-[#FF75A0]/10 resize-none"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                📧 Your email (optional)
              </label>
              <input
                type="email"
                placeholder="your@email.com - for follow-ups only"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full h-10 px-4 text-sm border-2 border-solid border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FFAA70] focus:outline-none rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:shadow-lg focus:shadow-[#FF75A0]/10"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 px-1">
                We respect your privacy - this is only for important follow-ups!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Compact version */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 pt-0 bg-gradient-to-t from-gray-50/50 to-transparent dark:from-gray-800/50 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handleClose} 
            disabled={isSubmitting}
            className="w-full sm:w-auto h-10 px-6 text-sm font-medium border-2 border-solid border-gray-300 dark:border-gray-600 hover:border-[#FF75A0]/50 dark:hover:border-[#FFAA70]/50 hover:bg-gradient-to-br hover:from-[#FF75A0]/5 hover:to-[#FFAA70]/5 rounded-xl transition-all duration-300 active:scale-98 disabled:opacity-50"
          >
            Maybe Later
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !title.trim() || (!description.trim() && selectedType !== 'game_suggestion') || (selectedType === 'game_suggestion' && !gameIdea.trim())}
            className="w-full sm:w-auto h-10 px-6 text-sm font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] text-white border-0 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-98 flex items-center justify-center gap-2 min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Feedback</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
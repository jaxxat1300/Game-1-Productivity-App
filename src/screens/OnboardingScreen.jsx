import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const questions = [
  {
    id: 0,
    question: "What usually makes you reach for your phone?",
    subtitle: "Pick the one that feels most true",
    options: ['Boredom', 'Stress', 'Anxiety', 'Procrastinating', 'Out of habit', 'Feeling lonely'],
    multi: false,
  },
  {
    id: 1,
    question: "How do you feel right before you start scrolling?",
    subtitle: "Be honest — this helps us personalize your experience",
    options: ['Restless', 'Numb', 'Overwhelmed', 'Bored', 'Anxious', 'Fine, honestly'],
    multi: false,
  },
  {
    id: 2,
    question: "How long do you usually scroll in one sitting?",
    subtitle: "Roughly speaking",
    options: ['A few minutes', '15-30 minutes', '30-60 minutes', 'Over an hour'],
    multi: false,
  },
  {
    id: 3,
    question: "How do you feel after a long scroll session?",
    subtitle: "No judgment here",
    options: ['Worse than before', 'About the same', 'Sometimes better', 'It really depends'],
    multi: false,
  },
  {
    id: 4,
    question: "What kind of games or activities do you enjoy?",
    subtitle: "Pick all that apply",
    options: ['Word games', 'Logic & puzzles', 'Visual challenges', 'Quick mini-games', 'Creative activities'],
    multi: true,
  },
  {
    id: 5,
    question: "When do you scroll the most?",
    subtitle: "Pick your peak scroll time",
    options: ['Morning', 'Afternoon', 'Evening', 'Late night', 'Throughout the day'],
    multi: false,
  },
  {
    id: 6,
    question: "What do you wish you could do instead of scrolling?",
    subtitle: "What feels like a better use of that time?",
    options: ['Be more productive', 'Actually relax', 'Be more creative', 'Connect with people', 'Waste less time'],
    multi: false,
  },
  {
    id: 7,
    question: "What matters most when you need a break?",
    subtitle: "Pick what resonates",
    options: ['Something calming', 'Something stimulating', 'Something quick', 'Something fun', 'Something productive'],
    multi: false,
  },
  {
    id: 8,
    question: "What would motivate you to reach for this app instead of scrolling?",
    subtitle: "Be real with yourself",
    options: ['Tracking my progress', 'Earning achievements', 'Just having fun', 'Feeling less anxious', 'Being mentally challenged'],
    multi: false,
  },
  {
    id: 9,
    question: "How many minutes per day should we limit your game time?",
    subtitle: "You can always change this later in settings",
    options: ['10 minutes', '15 minutes', '20 minutes', '30 minutes', 'No limit for now'],
    multi: false,
    isTimeLimit: true,
  },
];

const parseTimeLimit = (answer) => {
  if (!answer || answer === 'No limit for now') return 999;
  return parseInt(answer);
};

const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQ = questions[step];
  const isMulti = currentQ.multi;
  const currentAnswer = answers[step];
  const hasAnswer = isMulti
    ? currentAnswer && currentAnswer.length > 0
    : currentAnswer !== undefined;

  const handleSelect = (option) => {
    if (isMulti) {
      const current = answers[step] || [];
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option];
      setAnswers({ ...answers, [step]: updated });
    } else {
      setAnswers({ ...answers, [step]: option });
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({
        answers,
        timeLimit: parseTimeLimit(answers[9]),
        gamePreferences: answers[4] || [],
        scrollTrigger: answers[0],
      });
    }
  };

  const isSelected = (option) => {
    if (isMulti) return (answers[step] || []).includes(option);
    return answers[step] === option;
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-peace-50 to-lavender-50 flex flex-col">
      <div className="w-full h-1.5 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-sage-400 to-peace-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between p-6 max-w-lg mx-auto w-full">
        <div className="flex-1 flex flex-col justify-center py-8">
          <div className="text-sm font-body text-gray-400 mb-3">
            {step + 1} of {questions.length}
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-2 leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-gray-500 font-body text-sm mb-8">
            {currentQ.subtitle}
          </p>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-body transition-all active:scale-95 flex items-center justify-between ${
                  isSelected(option)
                    ? 'bg-gradient-to-r from-sage-100 to-peace-100 border-sage-400 text-gray-800 font-medium'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{option}</span>
                {isSelected(option) && (
                  <Check className="w-5 h-5 text-sage-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="p-4 rounded-2xl bg-white border-2 border-gray-200 active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`flex-1 py-4 rounded-2xl font-display font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
              hasAnswer
                ? 'bg-gradient-to-r from-sage-400 to-peace-400 text-white shadow-soft'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step === questions.length - 1 ? "Let's Go!" : 'Next'}
            {step < questions.length - 1 && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;

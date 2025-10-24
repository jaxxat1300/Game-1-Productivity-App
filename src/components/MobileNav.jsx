import React from 'react';
import { Home, User, Trophy, Heart, Zap } from 'lucide-react';

const MobileNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'games', label: 'Games', icon: Zap },
    { id: 'mood', label: 'Mood', icon: Heart },
    { id: 'achievements', label: 'Wins', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-sage-100 to-peace-100 scale-105'
                  : 'hover:bg-gray-50 active:scale-95'
              }`}
            >
              <Icon
                className={`w-6 h-6 mb-1 transition-colors ${
                  isActive ? 'text-sage-600' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs font-body font-medium ${
                  isActive ? 'text-sage-700' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;


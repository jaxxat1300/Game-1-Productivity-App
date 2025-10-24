import React from 'react';

const PhoneMockup = ({ children }) => {
  return (
    <>
      {/* Desktop: Show phone mockup */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-8">
        {/* Phone Frame */}
        <div className="relative">
          {/* Phone Body */}
          <div 
            className="relative bg-black rounded-[60px] p-4 shadow-2xl"
            style={{
              width: '400px',
              height: '820px',
            }}
          >
            {/* Screen */}
            <div className="relative bg-white rounded-[48px] h-full overflow-hidden">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/5 to-transparent z-50 flex items-start justify-between px-8 pt-3">
                <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                  <span>9:41</span>
                </div>
                <div className="flex items-center gap-1">
                  {/* Cellular */}
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                    <rect width="2" height="6" y="6" rx="1" fill="currentColor" className="text-gray-800"/>
                    <rect width="2" height="8" x="4" y="4" rx="1" fill="currentColor" className="text-gray-800"/>
                    <rect width="2" height="10" x="8" y="2" rx="1" fill="currentColor" className="text-gray-800"/>
                    <rect width="2" height="12" x="12" rx="1" fill="currentColor" className="text-gray-800"/>
                  </svg>
                  {/* WiFi */}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path d="M8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z" fill="currentColor" className="text-gray-800"/>
                    <path d="M5.5 8C6.5 9 7 9.5 8 9.5C9 9.5 9.5 9 10.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-800"/>
                    <path d="M3 5C5 7 6 7.5 8 7.5C10 7.5 11 7 13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-800"/>
                  </svg>
                  {/* Battery */}
                  <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                    <rect x="1" y="2" width="22" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" className="text-gray-800"/>
                    <rect x="3" y="4" width="16" height="6" rx="1" fill="currentColor" className="text-gray-800"/>
                    <path d="M24 5.5V8.5C25 8.5 25.5 8 25.5 7C25.5 6 25 5.5 24 5.5Z" fill="currentColor" className="text-gray-800"/>
                  </svg>
                </div>
              </div>

              {/* App Content */}
              <div className="h-full overflow-y-auto overflow-x-hidden">
                <div className="min-h-full">
                  {children}
                </div>
              </div>

              {/* Home Indicator (iPhone style) */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50 pointer-events-none">
                <div className="w-32 h-1 bg-gray-900 rounded-full opacity-80"></div>
              </div>
            </div>

            {/* Dynamic Island / Notch */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full z-50"></div>
          </div>

          {/* Power Button */}
          <div className="absolute right-0 top-44 w-1 h-16 bg-gray-800 rounded-l-lg"></div>
          
          {/* Volume Buttons */}
          <div className="absolute left-0 top-32 w-1 h-12 bg-gray-800 rounded-r-lg"></div>
          <div className="absolute left-0 top-48 w-1 h-12 bg-gray-800 rounded-r-lg"></div>

          {/* Shadow underneath phone */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-black/20 blur-2xl rounded-full"></div>
        </div>

        {/* Info Text */}
        <div className="absolute bottom-8 text-center">
          <p className="text-gray-500 text-sm font-body mb-2">
            For best experience, open on your mobile device
          </p>
          <p className="text-gray-400 text-xs font-body">
            or resize your browser to mobile size
          </p>
        </div>
      </div>

      {/* Mobile: Show full screen */}
      <div className="md:hidden">
        {children}
      </div>
    </>
  );
};

export default PhoneMockup;


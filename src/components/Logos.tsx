import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const LifecycleOrganicsLogo: React.FC<LogoProps> = ({ className = 'h-10', showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Water drop containing wheat/leaf stalks */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Outer drop container */}
        <path
          d="M50 5C50 5 10 50 10 75C10 97.1 27.9 115 50 115C72.1 115 90 97.1 90 75C90 50 50 5 50 5Z"
          fill="#2d4a22"
          fillOpacity="0.08"
          stroke="#588157"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Inner stylized soil/wave */}
        <path
          d="M15 80C30 75 45 85 60 80C75 75 85 80 85 80C85 80 80 98 50 98C20 98 15 80 15 80Z"
          fill="#2d4a22"
        />
        {/* Central wheat/sprout stalks */}
        <path
          d="M50 90V45M50 45L40 37M50 45L60 37M50 55L40 47M50 55L60 47M50 65L42 57M50 65L58 57M50 75L44 67M50 75L56 67"
          stroke="#a3b18a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Delicate single leaf inside */}
        <path
          d="M50 35C45 25 50 15 50 15C50 15 55 25 50 35Z"
          fill="#588157"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-none text-left">
          <span className="text-xl font-bold tracking-tight text-primary font-serif">
            Lifecycle
          </span>
          <span className="text-xs font-semibold tracking-widest text-leaf uppercase font-mono">
            Organics
          </span>
        </div>
      )}
    </div>
  );
};

export const GreenOrganicsLogo: React.FC<LogoProps> = ({ className = 'h-8', showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-black italic tracking-tight text-leaf font-serif">
        Green
      </span>
      {showText && (
        <span className="text-lg font-bold tracking-wider text-secondary uppercase font-sans">
          &amp; organics
          <sup className="text-[9px] font-medium align-super ml-0.5">®</sup>
        </span>
      )}
      {/* Two fresh leaves badge */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-sage animate-pulse"
      >
        <path
          d="M16 4C16 4 10 10 10 16C10 22 16 28 16 28C16 28 22 22 22 16C22 10 16 4 16 4Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M16 4C24 10 24 20 16 28C8 20 8 10 16 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 4V28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 12C20 13 21 16 21 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 18C12 19 11 22 11 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

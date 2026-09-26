import React from 'react';
import realLogoImg from '../assets/images/lifecycle_logo.webp';
import realLogoTransparentImg from '../assets/images/lifecycle_logo_transparent.webp';
import realEmblemImg from '../assets/images/lifecycle_emblem_transparent.webp';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'transparent' | 'light' | 'dark';
  alt?: string;
}

export const LifecycleOrganicsLogo: React.FC<LogoProps> = ({ 
  className = 'h-10', 
  showText = true,
  variant = 'transparent',
  alt = 'Lifecycle Organics'
}) => {
  if (!showText) {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={realEmblemImg}
          alt={alt}
          className="h-full w-auto object-contain select-none pointer-events-none"
          loading="eager"
        />
      </div>
    );
  }

  // If explicitly requested with light pill background (e.g. inside dark footer or sidebar)
  if (variant === 'light' || variant === 'dark') {
    return (
      <div className={`inline-flex items-center justify-center bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs border border-white/30 shrink-0 ${className}`}>
        <img
          src={realLogoImg}
          alt={alt}
          className="h-full w-auto object-contain select-none pointer-events-none"
          loading="eager"
        />
      </div>
    );
  }

  // Default transparent brand logo with emblem and text
  return (
    <div className={`inline-flex items-center shrink-0 ${className}`}>
      <img
        src={realLogoTransparentImg}
        alt={alt}
        className="h-full w-auto object-contain select-none pointer-events-none"
        loading="eager"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== realLogoImg) {
            target.src = realLogoImg;
          }
        }}
      />
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

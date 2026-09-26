import React, { useState } from 'react';
import { X } from 'lucide-react';
import { loginAdmin, getAdminPassword } from '../services/store';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('josaphat@lifecycleorganics.co.zm');
  const [password, setPassword] = useState(() => getAdminPassword());
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      setIsLoading(false);
      if (res.success) {
        onLoginSuccess();
        onClose();
      } else {
        setError(res.error || "That email and password don't match. Try again.");
      }
    }, 250);
  };

  const handleAutofill = () => {
    setEmail('josaphat@lifecycleorganics.co.zm');
    setPassword(getAdminPassword());
    setError(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[840px] bg-[#fdfbf7] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#e0dcd0]"
        onClick={(e) => e.stopPropagation()}
        style={{ minHeight: '520px' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#2d3a22] flex items-center justify-center shadow-xs border border-[#e0dcd0] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT BRAND PANEL (from Lifecycle Organics — Admin Login.html) */}
        <div 
          className="hidden md:flex md:w-[46%] p-10 flex-col justify-between relative overflow-hidden text-white"
          style={{
            background: 'linear-gradient(160deg, #2d3a22 0%, #3a5a40 60%, #588157 130%)'
          }}
        >
          {/* Radial soft circle */}
          <div 
            className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212,163,115,0.28), transparent 70%)'
            }}
          />

          {/* Brand header */}
          <div className="flex items-center gap-2.5 relative z-10">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold font-serif text-[15px] text-[#2d3a22] shadow-xs"
              style={{
                background: 'linear-gradient(135deg, #a3b18a, #d4a373)'
              }}
            >
              LO
            </div>
            <div className="font-serif text-[15px] text-white leading-tight">
              Lifecycle Organics
              <span className="block text-[10.5px] text-[#a3b18a] font-mono tracking-wider font-semibold">
                ADMIN
              </span>
            </div>
          </div>

          {/* Brand copy */}
          <div className="relative z-10 max-w-[320px] my-6">
            <p className="font-mono text-[11px] text-[#d4a373] tracking-widest uppercase mb-3 font-semibold">
              CONTENT MANAGEMENT
            </p>
            <h1 className="font-serif text-3xl font-normal leading-snug text-white">
              Manage what growers see, in one place.
            </h1>
            <p className="text-[13.5px] text-[#d8e0cb] mt-3.5 leading-relaxed font-sans">
              Post testimonials, product updates and announcements — and know exactly where each one lands on the site before you publish it.
            </p>
          </div>

          {/* Brand footer */}
          <div className="text-[11.5px] text-[#9fae90] font-mono relative z-10 flex items-center justify-between">
            <span>lifecycleorganics.co.zm/admin</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#a3b18a]"></span>
          </div>
        </div>

        {/* RIGHT FORM PANEL (from Lifecycle Organics — Admin Login.html) */}
        <div className="w-full md:w-[54%] bg-[#fdfbf7] p-8 sm:p-10 flex flex-col justify-center">
          <div className="w-full max-w-[340px] mx-auto text-left">
            
            {/* Mobile Brand indicator */}
            <div className="md:hidden flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold font-serif text-sm text-[#2d3a22]"
                style={{ background: 'linear-gradient(135deg, #a3b18a, #d4a373)' }}
              >
                LO
              </div>
              <span className="font-serif font-bold text-sm text-[#2d3a22]">
                Lifecycle Organics <span className="font-mono text-[10px] text-[#588157]">ADMIN</span>
              </span>
            </div>

            <h2 className="font-serif text-[22px] font-semibold text-[#2d3a22] mb-1.5">
              Welcome back
            </h2>
            <p className="text-[13px] text-[#7c8570] mb-6">
              Sign in to manage site content
            </p>

            {/* Error Note */}
            {error && (
              <div className="mb-4 bg-[#fbe9e7] text-[#b4382c] border border-[#f3c9c2] rounded-lg px-3.5 py-2.5 text-xs leading-relaxed animate-in fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="admin-email" 
                  className="block text-xs font-semibold text-[#2d3a22]"
                >
                  Email
                </label>
                <div className="relative">
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9280] pointer-events-none" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" stroke="none" />
                    <path d="M3 5.5 12 13l9-7.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                  </svg>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@lifecycleorganics.co.zm"
                    className="w-full bg-white border border-[#e0dcd0] rounded-lg py-2.5 pl-9 pr-3 text-[13.5px] text-[#22301c] focus:outline-none focus:border-[#588157] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="admin-password" 
                  className="block text-xs font-semibold text-[#2d3a22]"
                >
                  Password
                </label>
                <div className="relative">
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9280] pointer-events-none" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-[#e0dcd0] rounded-lg py-2.5 pl-9 pr-10 text-[13.5px] text-[#22301c] focus:outline-none focus:border-[#588157] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9280] hover:text-[#2d3a22] p-1 cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember me & forgot */}
              <div className="flex items-center justify-between pt-1 pb-2 text-[12.5px]">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#2d3a22]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#e0dcd0] text-[#588157] focus:ring-0 cursor-pointer accent-[#588157]"
                  />
                  <span className="text-[#6b7460]">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="text-[#3a5a40] hover:underline font-semibold text-xs cursor-pointer"
                  title="Autofill staff demo access"
                >
                  Quick Fill
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-[#588157] hover:bg-[#3a5a40] text-white font-semibold text-[13.5px] transition-colors cursor-pointer shadow-xs disabled:opacity-70"
              >
                {isLoading ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            {/* Foot note */}
            <p className="mt-6 text-[11.5px] text-[#9aa38c] text-center leading-relaxed">
              Access is limited to Lifecycle Organics staff. Contact your admin if you need an account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

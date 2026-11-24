import React, { useState } from 'react';
import {
  Heart,
  GitCompareArrows,
  Menu,
  X,
  Zap,
  Calculator,
  CalendarCheck,
  Sparkles,
  Box,
} from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  wishlistCount: number;
  compareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  wishlistCount,
  compareCount,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: PageView; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: '3d-studio', label: '3D Studio', icon: <Box className="w-3.5 h-3.5 text-[#F3D37A]" /> },
    { id: 'categories', label: 'Categories' },
    { id: 'electric', label: 'Electric', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'compare', label: 'Compare' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#06070A]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F3D37A] via-[#D4AF37] to-[#8C6812] p-[1px] shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[7px] bg-[#090B10] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F3D37A]" />
              </div>
            </div>
            <div className="text-left">
              <div className="font-display text-xl tracking-[0.22em] font-bold text-gold-gradient leading-none">
                AUTOVERSE
              </div>
              <div className="text-[10px] tracking-[0.28em] text-zinc-400 uppercase mt-1">
                Smart Luxury Showroom
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#F3D37A] bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.id === 'compare' && compareCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#D4AF37] text-black">
                      {compareCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={() => handleNav('emi')}
              title="EMI & Loan Calculator"
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                activePage === 'emi'
                  ? 'border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#F3D37A]'
                  : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-white/25'
              }`}
            >
              <Calculator className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNav('wishlist')}
              title="Saved Wishlist"
              className={`relative p-2.5 rounded-lg border transition-all cursor-pointer ${
                activePage === 'wishlist'
                  ? 'border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#F3D37A]'
                  : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-white/25'
              }`}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] font-bold rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav('test-drive')}
              className="ml-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3D37A] to-[#C59B27] text-black font-semibold text-sm flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Test Drive
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav('wishlist')}
              className="relative p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-200"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNav('compare')}
              className="relative p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-200"
              aria-label="Compare"
            >
              <GitCompareArrows className="w-4 h-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A0C12] border-t border-white/10 px-4 py-4 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between ${
                activePage === item.id
                  ? 'bg-[#D4AF37]/15 text-[#F3D37A] border border-[#D4AF37]/30'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              {item.id === 'compare' && compareCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#D4AF37] text-black">
                  {compareCount}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => handleNav('emi')}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-zinc-300 hover:bg-white/5 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-[#D4AF37]" />
            EMI & Loan Estimator
          </button>
          <button
            onClick={() => handleNav('test-drive')}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F3D37A] text-black font-semibold text-sm flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            Book a VIP Test Drive
          </button>
        </div>
      )}
    </header>
  );
};

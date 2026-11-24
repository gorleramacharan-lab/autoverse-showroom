import React, { useState } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
  Trophy,
  Clock,
  Tag,
} from 'lucide-react';
import { Car, CarCategory, PageView } from '../types';
import { CATEGORIES, POPULAR_BRANDS, UPCOMING_CARS, FAQS } from '../data/extraData';
import { CarCard } from './CarCard';

interface HomeViewProps {
  cars: Car[];
  recentlyViewedCars: Car[];
  wishlistIds: string[];
  compareIds: string[];
  onNavigate: (page: PageView) => void;
  onExploreCategory: (cat: CarCategory) => void;
  onExploreBrand: (brand: string) => void;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectCar: (car: Car) => void;
  onBookTestDrive: (car?: Car) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  cars,
  recentlyViewedCars,
  wishlistIds,
  compareIds,
  onNavigate,
  onExploreCategory,
  onExploreBrand,
  onToggleWishlist,
  onToggleCompare,
  onSelectCar,
  onBookTestDrive,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredOfWeek = cars.find((c) => c.isFeaturedOfWeek) || cars[0];
  const trendingCars = cars.filter((c) => c.isTrending).slice(0, 6);
  const newArrivals = cars.filter((c) => c.isNewArrival).slice(0, 6);
  const offerCars = cars.filter((c) => c.specialOffer);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. FULL-SCREEN LUXURY HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-supercar.jpg"
            alt="AUTOVERSE Luxury Hypercar"
            className="w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070A] via-[#06070A]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070A] via-transparent to-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#F3D37A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#F3D37A] font-semibold">
                International Smart Car Showroom
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              DRIVE YOUR DREAM.{' '}
              <span className="text-gold-gradient block mt-1">EXPERIENCE THE FUTURE.</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed font-light">
              Discover the perfect combination of performance, luxury, innovation, and style. From
              smart city hatchbacks to bespoke V12 royalty.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('explore')}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D37A] to-[#C59B27] text-black font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/25 cursor-pointer"
              >
                Explore Cars
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onBookTestDrive()}
                className="px-7 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 backdrop-blur-md text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#F3D37A]" />
                Book a Test Drive
              </button>
            </div>

            {/* Luxury Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-2xl">
              {[
                { val: `${cars.length}+`, label: 'Curated Vehicles' },
                { val: '17+', label: 'Global Marques' },
                { val: '₹3.99L – ₹10.5Cr', label: 'Every Budget' },
                { val: '8 Cities', label: 'VIP Lounges' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-3.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10"
                >
                  <div className="font-mono-num text-lg sm:text-xl font-bold text-[#F3D37A]">
                    {s.val}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR BRANDS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              World-Class Marques
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Explore by Popular Brand
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs text-[#F3D37A] hover:underline cursor-pointer"
          >
            View All Brands →
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {POPULAR_BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => onExploreBrand(brand)}
              className="px-4 py-2.5 rounded-xl bg-[#0D1017] hover:bg-[#D4AF37]/15 border border-white/10 hover:border-[#D4AF37]/50 text-xs sm:text-sm font-medium text-zinc-200 hover:text-[#F3D37A] transition-all cursor-pointer"
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED CAR OF THE WEEK */}
      {featuredOfWeek && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl glass-panel-gold overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] overflow-hidden">
              <img
                src={featuredOfWeek.images[0]}
                onError={(e) => {
                  e.currentTarget.src = featuredOfWeek.fallbackImage;
                }}
                alt={featuredOfWeek.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 text-[#F3D37A] text-xs font-bold flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /> Featured Car of the Week
              </div>
            </div>
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-center space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
                  {featuredOfWeek.brand} • {featuredOfWeek.category}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
                  {featuredOfWeek.brand} {featuredOfWeek.name}
                </h2>
                <p className="font-mono-num text-2xl font-bold text-gold-gradient mt-2">
                  {featuredOfWeek.priceDisplay}
                  <span className="text-xs text-zinc-400 font-normal ml-2">Est. Ex-Showroom</span>
                </p>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{featuredOfWeek.description}</p>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-zinc-400 block">Power</span>
                  <span className="font-mono-num font-bold text-white">
                    {featuredOfWeek.horsepower} bhp
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-zinc-400 block">0–100</span>
                  <span className="font-mono-num font-bold text-white">3.9 sec</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-zinc-400 block">Top Speed</span>
                  <span className="font-mono-num font-bold text-white">
                    {featuredOfWeek.topSpeed}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => onSelectCar(featuredOfWeek)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3D37A] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Inspect Vehicle
                </button>
                <button
                  onClick={() => onBookTestDrive(featuredOfWeek)}
                  className="px-5 py-3 rounded-xl bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white font-semibold text-xs cursor-pointer"
                >
                  Test Drive
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. CAR CATEGORIES — ECONOMY TO ULTRA-LUXURY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              Curated Segments
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              From Economy to Ultra-Luxury
            </h2>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-sm text-[#F3D37A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Explore All Categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onExploreCategory(cat.id)}
              className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider text-[#F3D37A] font-semibold">
                {cat.badge}
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono-num text-xs text-[#F3D37A] font-semibold">
                  {cat.priceRange}
                </p>
                <h3 className="font-display text-xl font-bold text-white mt-0.5 group-hover:text-[#F3D37A] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{cat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRENDING VEHICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              Most Desired Right Now
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              Trending Vehicles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-sm text-[#F3D37A] hover:underline cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted={wishlistIds.includes(car.id)}
              isCompared={compareIds.includes(car.id)}
              onToggleWishlist={onToggleWishlist}
              onToggleCompare={onToggleCompare}
              onSelectCar={onSelectCar}
              onBookTestDrive={onBookTestDrive}
            />
          ))}
        </div>
      </section>

      {/* 6. ELECTRIC PAVILION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-emerald-400/30 p-8 sm:p-12">
          <img
            src="/images/cat-ev.jpg"
            alt="Electric Vehicles"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070A] via-[#06070A]/85 to-emerald-950/50" />
          <div className="relative max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-emerald-300 font-bold">
              <Zap className="w-4 h-4" /> Dedicated Electric Zone
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Step Into Silent, Zero-Emission Performance
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Compare battery capacity, certified range, and 800V fast-charging speeds across the
              Tata Nexon.ev, Punch.ev, MG Windsor EV, Mahindra BE 6, Hyundai IONIQ 5, and BYD Seal.
            </p>
            <button
              onClick={() => onNavigate('electric')}
              className="mt-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              Enter Electric Showroom <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. NEW LAUNCHES & SPECIAL OFFERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              Fresh Arrivals
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              New Launches & Special Offers
            </h2>
          </div>
        </div>

        {offerCars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offerCars.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCar(c)}
                className="p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 flex items-center justify-between gap-4 cursor-pointer hover:border-[#F3D37A]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                    <Tag className="w-5 h-5 text-[#F3D37A]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#F3D37A] font-bold">
                      Limited Showroom Privilege
                    </span>
                    <h4 className="text-white font-bold">
                      {c.brand} {c.name}
                    </h4>
                    <p className="text-xs text-zinc-300">{c.specialOffer}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#F3D37A] shrink-0" />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivals.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted={wishlistIds.includes(car.id)}
              isCompared={compareIds.includes(car.id)}
              onToggleWishlist={onToggleWishlist}
              onToggleCompare={onToggleCompare}
              onSelectCar={onSelectCar}
              onBookTestDrive={onBookTestDrive}
            />
          ))}
        </div>
      </section>

      {/* 8. UPCOMING CARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Future Horizon
          </span>
          <h2 className="font-display text-3xl font-bold text-white mt-1">Upcoming Launches</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UPCOMING_CARS.map((u) => (
            <div
              key={u.id}
              className="rounded-2xl bg-[#0D1017] border border-white/10 overflow-hidden flex flex-col"
            >
              <div className="relative h-40">
                <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 text-[#F3D37A] text-[10px] font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {u.expectedLaunch}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                  {u.brand} • {u.fuelType}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{u.name}</h3>
                <p className="font-mono-num text-xs text-[#F3D37A] font-semibold mt-1">
                  {u.estimatedPrice}
                </p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{u.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. RECENTLY VIEWED CARS */}
      {recentlyViewedCars.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-2xl font-bold text-white">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentlyViewedCars.slice(0, 4).map((car) => (
              <div
                key={car.id}
                onClick={() => onSelectCar(car)}
                className="p-3.5 rounded-2xl bg-[#0D1017] border border-white/10 hover:border-[#D4AF37]/40 flex items-center gap-3.5 cursor-pointer transition-all"
              >
                <img
                  src={car.images[0] || car.fallbackImage}
                  onError={(e) => {
                    e.currentTarget.src = car.fallbackImage;
                  }}
                  alt={car.name}
                  className="w-20 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-[#D4AF37] font-semibold">{car.brand}</p>
                  <p className="text-sm font-bold text-white truncate">{car.name}</p>
                  <p className="font-mono-num text-xs text-zinc-400">{car.priceDisplay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Concierge Answers
          </span>
          <h2 className="font-display text-3xl font-bold text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1017] border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#F3D37A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.06] pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

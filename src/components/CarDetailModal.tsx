import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  GitCompareArrows,
  Download,
  CalendarCheck,
  ShieldCheck,
  Gauge,
  Fuel,
  Zap,
  Users,
  Settings2,
  CheckCircle2,
  Star,
  BatteryCharging,
  Sparkles,
} from 'lucide-react';
import { Car } from '../types';
import { EmiCalculator } from './EmiCalculator';

interface CarDetailModalProps {
  car: Car;
  isWishlisted: boolean;
  isCompared: boolean;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onBookTestDrive: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  isWishlisted,
  isCompared,
  onClose,
  onToggleWishlist,
  onToggleCompare,
  onBookTestDrive,
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'emi' | 'reviews'>('overview');
  const [imgErrorMap, setImgErrorMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleDownloadSpecs = () => {
    const lines = [
      `AUTOVERSE — OFFICIAL VEHICLE SPECIFICATION SHEET`,
      `==================================================`,
      `Vehicle: ${car.brand} ${car.name}`,
      `Category: ${car.category} | Body Type: ${car.bodyType}`,
      `Estimated Ex-Showroom Price: ${car.priceDisplay}`,
      `Estimated On-Road Price: ${car.onRoadDisplay}`,
      ``,
      `TECHNICAL SPECIFICATIONS`,
      `--------------------------------------------------`,
      `Engine / Battery: ${car.engineCapacity}`,
      `Horsepower: ${car.horsepowerDisplay}`,
      `Torque: ${car.torqueDisplay}`,
      `Fuel Type: ${car.fuelType}`,
      `Transmission: ${car.transmission}`,
      `Mileage / Range: ${car.efficiencyDisplay}`,
      `Top Speed: ${car.topSpeed}`,
      `Acceleration: ${car.acceleration}`,
      `Seating Capacity: ${car.seatingCapacity} Seater`,
      `Safety Rating: ${car.safetyRating}`,
      ...(car.evSpecs
        ? [
            ``,
            `ELECTRIC VEHICLE SPECIFICATIONS`,
            `--------------------------------------------------`,
            `Battery Capacity: ${car.evSpecs.batteryCapacity}`,
            `Certified / Est. Range: ${car.evSpecs.range}`,
            `DC Fast Charging: ${car.evSpecs.fastCharging}`,
            `AC Home Charging: ${car.evSpecs.homeCharging}`,
          ]
        : []),
      ``,
      `KEY HIGHLIGHTS`,
      `--------------------------------------------------`,
      ...car.highlights.map((h) => `• ${h}`),
      ``,
      `SAFETY FEATURES`,
      `--------------------------------------------------`,
      ...car.safetyFeatures.map((s) => `• ${s}`),
      ``,
      `Generated via AUTOVERSE Smart Luxury Showroom`,
      `*Prices are estimated Pan-India INR figures and subject to state-level variations.`,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AUTOVERSE-${car.brand}-${car.name.replace(/\s+/g, '-')}-Specs.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentImg = imgErrorMap[activeImgIdx]
    ? car.fallbackImage
    : car.images[activeImgIdx] || car.fallbackImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#0A0C12] border border-white/15 shadow-2xl shadow-black">
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 bg-[#0A0C12]/95 backdrop-blur-xl border-b border-white/10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              {car.brand} • {car.category}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              {car.brand} {car.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadSpecs}
              title="Download Specification Sheet"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-200 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              Spec Sheet
            </button>
            <button
              onClick={() => onToggleWishlist(car.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500/20 border-rose-400/50 text-rose-300'
                  : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:text-white'
              }`}
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onToggleCompare(car.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isCompared
                  ? 'bg-[#D4AF37] border-[#F3D37A] text-black'
                  : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:text-white'
              }`}
              title="Compare"
            >
              <GitCompareArrows className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/[0.08] hover:bg-white/15 text-white cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Top Grid: Gallery + Price & Key Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/10 bg-[#06070A] group">
                <img
                  src={currentImg}
                  alt={`${car.brand} ${car.name}`}
                  onError={() => setImgErrorMap((prev) => ({ ...prev, [activeImgIdx]: true }))}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-zinc-300 border border-white/10">
                  Hover to Zoom
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImgIdx === idx
                        ? 'border-[#D4AF37] opacity-100'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgErrorMap[idx] ? car.fallbackImage : img}
                      alt={`View ${idx + 1}`}
                      onError={() => setImgErrorMap((prev) => ({ ...prev, [idx]: true }))}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Pricing, Colors, CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-zinc-400">
                      Est. Ex-Showroom Price
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#F3D37A]">
                      <Star className="w-3.5 h-3.5 fill-[#F3D37A]" /> {car.rating.toFixed(1)} ({car.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="font-mono-num text-3xl sm:text-4xl font-bold text-gold-gradient mt-1.5">
                    {car.priceDisplay}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 pt-2.5 border-t border-white/10">
                    <span>Estimated On-Road Price</span>
                    <span className="font-mono-num text-sm font-semibold text-white">
                      {car.onRoadDisplay}
                    </span>
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="uppercase tracking-wider text-zinc-400">Available Finishes</span>
                    <span className="text-white font-medium">{selectedColor?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {car.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        title={c.name}
                        className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColor?.name === c.name
                            ? 'border-[#F3D37A] scale-110 ring-2 ring-[#D4AF37]/40'
                            : 'border-white/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Highlight Badges */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                    <span className="text-zinc-400 block text-[10px]">0–100 km/h</span>
                    <span className="font-mono-num font-semibold text-white mt-0.5 block">
                      {car.acceleration}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                    <span className="text-zinc-400 block text-[10px]">Top Speed</span>
                    <span className="font-mono-num font-semibold text-white mt-0.5 block">
                      {car.topSpeed}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] col-span-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-zinc-400 text-[10px] block">Safety Rating</span>
                      <span className="font-semibold text-white">{car.safetyRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="space-y-2.5">
                <button
                  onClick={() => onBookTestDrive(car)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D37A] to-[#C59B27] text-black font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/25 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book VIP Test Drive
                </button>
                <button
                  onClick={handleDownloadSpecs}
                  className="w-full sm:hidden py-3 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  Download Spec Sheet
                </button>
              </div>
            </div>
          </div>

          {/* Complete Technical Specification Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Settings2, label: 'Engine / Battery', value: car.engineCapacity },
              { icon: Gauge, label: 'Horsepower', value: car.horsepowerDisplay },
              { icon: Sparkles, label: 'Torque', value: car.torqueDisplay },
              {
                icon: car.fuelType === 'Electric' ? Zap : Fuel,
                label: car.fuelType === 'Electric' ? 'Est. Range' : 'Mileage',
                value: car.efficiencyDisplay,
              },
              { icon: Fuel, label: 'Fuel & Gearbox', value: `${car.fuelType} • ${car.transmission}` },
              { icon: Users, label: 'Seating', value: `${car.seatingCapacity} Seater` },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]"
              >
                <spec.icon className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                <div className="text-[10px] uppercase tracking-wider text-zinc-400">
                  {spec.label}
                </div>
                <div className="text-xs font-semibold text-white mt-1 leading-snug">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* EV Charging Banner (if Electric) */}
          {car.evSpecs && (
            <div className="p-5 rounded-2xl bg-emerald-500/[0.07] border border-emerald-400/25">
              <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                <BatteryCharging className="w-4 h-4" /> Electric Powertrain & Charging
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-zinc-400 block">Battery Capacity</span>
                  <span className="font-semibold text-white mt-0.5 block">{car.evSpecs.batteryCapacity}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Certified / Real Range</span>
                  <span className="font-semibold text-emerald-300 mt-0.5 block">{car.evSpecs.range}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">DC Fast Charging</span>
                  <span className="font-semibold text-white mt-0.5 block">{car.evSpecs.fastCharging}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">AC Home Wallbox</span>
                  <span className="font-semibold text-white mt-0.5 block">{car.evSpecs.homeCharging}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tabbed Details */}
          <div>
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3 mb-6">
              {[
                { id: 'overview', label: 'Overview & Highlights' },
                { id: 'features', label: 'Features & Safety' },
                { id: 'emi', label: 'EMI Calculator' },
                { id: 'reviews', label: `Customer Reviews (${car.reviews.length})` },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === t.id
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-white/[0.04] text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-lg font-bold text-white">What Makes It Special</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">{car.description}</p>
                </div>
                <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-sm font-bold text-[#F3D37A] uppercase tracking-wider mb-3">
                    Key Advantages & Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {car.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Interior Features', items: car.interiorFeatures },
                  { title: 'Exterior Features', items: car.exteriorFeatures },
                  { title: 'Infotainment & Tech', items: car.infotainmentFeatures },
                  { title: 'Safety & Driver Assist', items: car.safetyFeatures },
                ].map((group) => (
                  <div
                    key={group.title}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3D37A] mb-3">
                      {group.title}
                    </h4>
                    <ul className="space-y-2">
                      {group.items.map((feat, i) => (
                        <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'emi' && (
              <EmiCalculator
                initialPrice={car.priceOnRoad}
                initialCarName={`${car.brand} ${car.name}`}
                compact
              />
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {car.reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold text-white text-sm">{rev.author}</span>
                        <span className="text-xs text-zinc-400 ml-2">• {rev.location}</span>
                      </div>
                      <span className="text-xs text-zinc-500">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            idx < Math.round(rev.rating)
                              ? 'text-[#F3D37A] fill-[#F3D37A]'
                              : 'text-zinc-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

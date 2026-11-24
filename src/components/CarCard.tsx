import React, { useState } from 'react';
import {
  Heart,
  GitCompareArrows,
  Fuel,
  Gauge,
  Zap,
  Star,
  ArrowUpRight,
  Settings2,
} from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectCar: (car: Car) => void;
  onBookTestDrive: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onSelectCar,
  onBookTestDrive,
}) => {
  const [imgSrc, setImgSrc] = useState(car.images[0] || car.fallbackImage);

  return (
    <div className="group relative rounded-2xl bg-[#0D1017] border border-white/[0.08] hover:border-[#D4AF37]/45 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D4AF37]/10 flex flex-col">
      {/* Image Container */}
      <div
        onClick={() => onSelectCar(car)}
        className="relative h-52 sm:h-56 overflow-hidden cursor-pointer bg-[#090B10]"
      >
        <img
          src={imgSrc}
          alt={`${car.brand} ${car.name}`}
          onError={() => setImgSrc(car.fallbackImage)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-black/20 to-transparent" />

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {car.fuelType === 'Electric' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md flex items-center gap-1">
              <Zap className="w-3 h-3" /> EV
            </span>
          )}
          {car.isNewArrival && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#D4AF37]/20 text-[#F3D37A] border border-[#D4AF37]/40 backdrop-blur-md">
              New Launch
            </span>
          )}
          {car.specialOffer && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-200 border border-rose-400/30 backdrop-blur-md">
              Offer
            </span>
          )}
        </div>

        {/* Top Right Quick Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(car.id);
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500/90 border-rose-400 text-white'
                : 'bg-black/50 border-white/15 text-zinc-200 hover:bg-black/80 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(car.id);
            }}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
            className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
              isCompared
                ? 'bg-[#D4AF37] border-[#F3D37A] text-black'
                : 'bg-black/50 border-white/15 text-zinc-200 hover:bg-black/80 hover:text-white'
            }`}
          >
            <GitCompareArrows className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Rating Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-xs">
          <Star className="w-3.5 h-3.5 text-[#F3D37A] fill-[#F3D37A]" />
          <span className="font-semibold text-white">{car.rating.toFixed(1)}</span>
          <span className="text-zinc-400 text-[11px]">({car.reviewCount})</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              {car.brand}
            </p>
            <h3
              onClick={() => onSelectCar(car)}
              className="text-lg font-bold text-white group-hover:text-[#F3D37A] transition-colors cursor-pointer mt-0.5"
            >
              {car.name}
            </h3>
          </div>
          <span className="text-[10px] px-2 py-1 rounded bg-white/[0.05] text-zinc-400 border border-white/10 shrink-0">
            {car.bodyType}
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 pb-3 border-b border-white/[0.07]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-num text-xl font-bold text-white">
              {car.priceDisplay}
            </span>
            <span className="text-[11px] text-zinc-400">Est. Ex-Showroom</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Est. On-Road: <span className="text-zinc-300 font-mono-num">{car.onRoadDisplay}</span>
          </p>
        </div>

        {/* Key Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3.5 text-xs">
          <div className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.05]">
            <div className="flex items-center gap-1 text-zinc-400 text-[10px] mb-0.5">
              <Gauge className="w-3 h-3 text-[#D4AF37]" /> Power
            </div>
            <div className="font-semibold text-zinc-100 truncate font-mono-num">
              {car.horsepower} bhp
            </div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.05]">
            <div className="flex items-center gap-1 text-zinc-400 text-[10px] mb-0.5">
              {car.fuelType === 'Electric' ? (
                <Zap className="w-3 h-3 text-emerald-400" />
              ) : (
                <Fuel className="w-3 h-3 text-[#D4AF37]" />
              )}
              {car.fuelType === 'Electric' ? 'Range' : 'Mileage'}
            </div>
            <div className="font-semibold text-zinc-100 truncate font-mono-num">
              {car.efficiencyValue} {car.fuelType === 'Electric' ? 'km' : 'km/l'}
            </div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.05]">
            <div className="flex items-center gap-1 text-zinc-400 text-[10px] mb-0.5">
              <Settings2 className="w-3 h-3 text-[#D4AF37]" /> Gear
            </div>
            <div className="font-semibold text-zinc-100 truncate">
              {car.transmission === 'Manual / Automatic' ? 'MT / AT' : car.transmission}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectCar(car)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            View Details
            <ArrowUpRight className="w-3.5 h-3.5 text-[#F3D37A]" />
          </button>
          <button
            onClick={() => onBookTestDrive(car)}
            className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E9C766] text-black text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
          >
            Test Drive
          </button>
        </div>
      </div>
    </div>
  );
};

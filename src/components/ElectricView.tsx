import React from 'react';
import { Zap, BatteryCharging, Gauge, Timer, ShieldCheck } from 'lucide-react';
import { Car } from '../types';
import { CarCard } from './CarCard';

interface ElectricViewProps {
  evCars: Car[];
  wishlistIds: string[];
  compareIds: string[];
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectCar: (car: Car) => void;
  onBookTestDrive: (car: Car) => void;
}

export const ElectricView: React.FC<ElectricViewProps> = ({
  evCars,
  wishlistIds,
  compareIds,
  onToggleWishlist,
  onToggleCompare,
  onSelectCar,
  onBookTestDrive,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* EV Hero Banner */}
      <section className="relative overflow-hidden border-b border-emerald-500/20">
        <div className="absolute inset-0">
          <img
            src="/images/cat-ev.jpg"
            alt="AUTOVERSE Electric"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070A] via-[#06070A]/85 to-emerald-950/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs uppercase tracking-[0.22em] font-semibold">
              <Zap className="w-3.5 h-3.5" /> AUTOVERSE Electric Pavilion
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-white leading-tight">
              Zero Emissions. <span className="text-emerald-400">Pure Instant Torque.</span>
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Explore India’s finest electric vehicles—from smart urban crossovers like the Tata
              Punch.ev and MG Windsor EV to 800V hyper-charging marvels like the Hyundai IONIQ 5,
              BYD Seal, Mahindra BE 6, and Porsche Taycan.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-4xl">
            {[
              { icon: BatteryCharging, label: 'Up to 682 km', sub: 'Certified Range' },
              { icon: Timer, label: '18 Minutes', sub: '10–80% 800V DC Charge' },
              { icon: Gauge, label: '3.7 Seconds', sub: '0–100 km/h EV Sprint' },
              { icon: ShieldCheck, label: '5-Star Rated', sub: 'Bharat & Euro NCAP' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-emerald-400/20"
              >
                <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="font-mono-num text-lg font-bold text-white">{stat.label}</div>
                <div className="text-[11px] text-zinc-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EV Quick Spec Comparison Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0B0E14]">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-white">
              EV Battery, Range & Charging Matrix
            </h2>
            <span className="text-xs text-emerald-400 font-medium">{evCars.length} Electric Models</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/[0.03] text-zinc-400 text-xs uppercase">
                <tr>
                  <th className="p-4">Model</th>
                  <th className="p-4">Battery</th>
                  <th className="p-4">Est. Range</th>
                  <th className="p-4">DC Fast Charge</th>
                  <th className="p-4">0–100 km/h</th>
                  <th className="p-4">Est. Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {evCars.map((ev) => (
                  <tr
                    key={ev.id}
                    onClick={() => onSelectCar(ev)}
                    className="hover:bg-emerald-500/[0.05] cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-semibold text-white">
                      {ev.brand} {ev.name}
                    </td>
                    <td className="p-4 text-zinc-300">{ev.evSpecs?.batteryCapacity}</td>
                    <td className="p-4 text-emerald-300 font-mono-num font-semibold">
                      {ev.efficiencyValue} km
                    </td>
                    <td className="p-4 text-zinc-300">{ev.evSpecs?.fastCharging}</td>
                    <td className="p-4 text-zinc-300 font-mono-num">{ev.acceleration}</td>
                    <td className="p-4 text-[#F3D37A] font-mono-num font-bold">
                      {ev.priceDisplay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EV Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {evCars.map((car) => (
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
      </div>
    </div>
  );
};

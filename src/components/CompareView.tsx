import React from 'react';
import {
  GitCompareArrows,
  X,
  Plus,
  Trophy,
  Sparkles,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';
import { Car } from '../types';

interface CompareViewProps {
  allCars: Car[];
  compareIds: string[];
  onSetCompareIds: (ids: string[]) => void;
  onSelectCar: (car: Car) => void;
  onBookTestDrive: (car: Car) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  allCars,
  compareIds,
  onSetCompareIds,
  onSelectCar,
  onBookTestDrive,
}) => {
  const selectedCars: (Car | null)[] = [0, 1, 2].map(
    (idx) => allCars.find((c) => c.id === compareIds[idx]) || null
  );

  const activeCars = selectedCars.filter((c): c is Car => c !== null);

  const handleSelectSlot = (slotIdx: number, carId: string) => {
    const next = [...compareIds];
    if (!carId) {
      next.splice(slotIdx, 1);
    } else {
      next[slotIdx] = carId;
    }
    onSetCompareIds(Array.from(new Set(next.filter(Boolean))).slice(0, 3));
  };

  const handleRemoveSlot = (carId: string) => {
    onSetCompareIds(compareIds.filter((id) => id !== carId));
  };

  // Compute winners when 2+ cars selected
  const lowestPriceCar =
    activeCars.length >= 2
      ? activeCars.reduce((a, b) => (a.priceExShowroom < b.priceExShowroom ? a : b))
      : null;
  const highestPowerCar =
    activeCars.length >= 2
      ? activeCars.reduce((a, b) => (a.horsepower > b.horsepower ? a : b))
      : null;
  const highestEfficiencyCar =
    activeCars.length >= 2
      ? activeCars.reduce((a, b) => (a.efficiencyValue > b.efficiencyValue ? a : b))
      : null;

  const rows: {
    label: string;
    render: (car: Car) => React.ReactNode;
    isWinner?: (car: Car) => boolean;
  }[] = [
    {
      label: 'Est. Ex-Showroom Price',
      render: (c) => <span className="font-mono-num font-bold text-white">{c.priceDisplay}</span>,
      isWinner: (c) => lowestPriceCar?.id === c.id,
    },
    {
      label: 'Est. On-Road Price',
      render: (c) => <span className="font-mono-num text-zinc-300">{c.onRoadDisplay}</span>,
    },
    {
      label: 'Engine / Battery',
      render: (c) => c.engineCapacity,
    },
    {
      label: 'Horsepower',
      render: (c) => <span className="font-mono-num font-semibold text-white">{c.horsepowerDisplay}</span>,
      isWinner: (c) => highestPowerCar?.id === c.id,
    },
    {
      label: 'Torque',
      render: (c) => c.torqueDisplay,
    },
    {
      label: 'Mileage / Range',
      render: (c) => <span className="font-mono-num font-semibold text-emerald-300">{c.efficiencyDisplay}</span>,
      isWinner: (c) => highestEfficiencyCar?.id === c.id,
    },
    {
      label: 'Fuel Type',
      render: (c) => c.fuelType,
    },
    {
      label: 'Transmission',
      render: (c) => c.transmission,
    },
    {
      label: 'Seating Capacity',
      render: (c) => `${c.seatingCapacity} Seater`,
    },
    {
      label: '0–100 km/h',
      render: (c) => c.acceleration,
    },
    {
      label: 'Top Speed',
      render: (c) => c.topSpeed,
    },
    {
      label: 'Safety Rating',
      render: (c) => c.safetyRating,
    },
    {
      label: 'Key Technology',
      render: (c) => c.infotainmentFeatures.slice(0, 2).join(' • '),
    },
    {
      label: 'Safety Suite',
      render: (c) => c.safetyFeatures.slice(0, 2).join(' • '),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.22em] font-semibold">
            <GitCompareArrows className="w-4 h-4" /> Side-by-Side Intelligence
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            Compare Vehicles
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Select 2 or 3 cars from our 38+ vehicle showroom to compare specs, performance, and value.
          </p>
        </div>

        {/* Quick Preset Comparisons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSetCompareIds(['hyundai-creta', 'kia-seltos', 'tata-nexon'])}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-zinc-300 cursor-pointer"
          >
            SUVs: Creta vs Seltos vs Nexon
          </button>
          <button
            onClick={() => onSetCompareIds(['bmw-3-series', 'mercedes-c-class', 'audi-a6'])}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-zinc-300 cursor-pointer"
          >
            Luxury: 3 Series vs C-Class vs A6
          </button>
          <button
            onClick={() => onSetCompareIds(['mahindra-be-6', 'byd-seal', 'hyundai-ioniq-5'])}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-zinc-300 cursor-pointer"
          >
            EVs: BE 6 vs Seal vs IONIQ 5
          </button>
        </div>
      </div>

      {/* 3 Selection Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {selectedCars.map((car, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#0D1017] border border-white/10 p-4 flex flex-col justify-between"
          >
            {car ? (
              <div>
                <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-black">
                  <img
                    src={car.images[0] || car.fallbackImage}
                    onError={(e) => {
                      e.currentTarget.src = car.fallbackImage;
                    }}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveSlot(car.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-rose-500 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  {car.brand}
                </p>
                <h3
                  onClick={() => onSelectCar(car)}
                  className="text-lg font-bold text-white hover:text-[#F3D37A] cursor-pointer"
                >
                  {car.name}
                </h3>
                <p className="font-mono-num text-sm text-zinc-300 mt-0.5">{car.priceDisplay}</p>
                <button
                  onClick={() => onBookTestDrive(car)}
                  className="mt-3 w-full py-2 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#F3D37A] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarCheck className="w-3.5 h-3.5" /> Book Test Drive
                </button>
              </div>
            ) : (
              <div className="h-full min-h-[210px] flex flex-col items-center justify-center text-center p-4 border border-dashed border-white/15 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <p className="text-sm font-medium text-zinc-300 mb-3">
                  Select Vehicle #{idx + 1}
                </p>
                <select
                  value=""
                  onChange={(e) => handleSelectSlot(idx, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">Choose a car...</option>
                  {allCars
                    .filter((c) => !compareIds.includes(c.id))
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.name} ({c.priceDisplay})
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Smart Value Verdict Banner */}
      {activeCars.length >= 2 && (
        <div className="p-6 rounded-2xl glass-panel-gold">
          <div className="flex items-center gap-2 text-[#F3D37A] text-xs uppercase tracking-[0.2em] font-bold mb-3">
            <Sparkles className="w-4 h-4" /> AUTOVERSE Smart Verdict
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {lowestPriceCar && (
              <div className="flex items-start gap-2.5">
                <Trophy className="w-5 h-5 text-[#F3D37A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-400 text-xs block">Best Price Value</span>
                  <span className="font-bold text-white">
                    {lowestPriceCar.brand} {lowestPriceCar.name}
                  </span>
                  <span className="text-xs text-zinc-300 block">
                    Starts at {lowestPriceCar.priceDisplay}
                  </span>
                </div>
              </div>
            )}
            {highestPowerCar && (
              <div className="flex items-start gap-2.5">
                <Trophy className="w-5 h-5 text-[#F3D37A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-400 text-xs block">Most Powerful</span>
                  <span className="font-bold text-white">
                    {highestPowerCar.brand} {highestPowerCar.name}
                  </span>
                  <span className="text-xs text-zinc-300 block">
                    {highestPowerCar.horsepower} bhp output
                  </span>
                </div>
              </div>
            )}
            {highestEfficiencyCar && (
              <div className="flex items-start gap-2.5">
                <Trophy className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-400 text-xs block">Best Efficiency / Range</span>
                  <span className="font-bold text-white">
                    {highestEfficiencyCar.brand} {highestEfficiencyCar.name}
                  </span>
                  <span className="text-xs text-emerald-300 block">
                    {highestEfficiencyCar.efficiencyDisplay}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparison Matrix Table */}
      {activeCars.length >= 2 ? (
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0B0E14]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-4 text-xs uppercase tracking-wider text-zinc-400 w-48">
                    Specification
                  </th>
                  {activeCars.map((c) => (
                    <th key={c.id} className="p-4 text-sm font-bold text-[#F3D37A]">
                      {c.brand} {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {rows.map((row) => (
                  <tr key={row.label} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-medium text-zinc-400">{row.label}</td>
                    {activeCars.map((c) => {
                      const win = row.isWinner ? row.isWinner(c) : false;
                      return (
                        <td
                          key={c.id}
                          className={`p-4 text-zinc-200 ${win ? 'bg-[#D4AF37]/[0.07]' : ''}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {win && <CheckCircle2 className="w-4 h-4 text-[#F3D37A] shrink-0" />}
                            <span>{row.render(c)}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-14 rounded-2xl border border-white/10 bg-white/[0.02]">
          <GitCompareArrows className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-80" />
          <h3 className="text-lg font-semibold text-white">Select at least 2 cars to compare</h3>
          <p className="text-sm text-zinc-400 mt-1">
            Use the slots above or click a preset comparison to see side-by-side differences.
          </p>
        </div>
      )}
    </div>
  );
};

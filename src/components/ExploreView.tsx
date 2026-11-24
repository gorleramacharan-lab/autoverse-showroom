import React, { useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Car, CarCategory } from '../types';
import { CarCard } from './CarCard';

export interface ExploreFilters {
  search: string;
  category: string;
  brand: string;
  budget: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  seating: string;
  sortBy: string;
}

interface ExploreViewProps {
  cars: Car[];
  filters: ExploreFilters;
  onChangeFilters: (next: ExploreFilters) => void;
  wishlistIds: string[];
  compareIds: string[];
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectCar: (car: Car) => void;
  onBookTestDrive: (car: Car) => void;
}

export const DEFAULT_FILTERS: ExploreFilters = {
  search: '',
  category: 'All',
  brand: 'All',
  budget: 'All',
  fuel: 'All',
  transmission: 'All',
  bodyType: 'All',
  seating: 'All',
  sortBy: 'featured',
};

export const ExploreView: React.FC<ExploreViewProps> = ({
  cars,
  filters,
  onChangeFilters,
  wishlistIds,
  compareIds,
  onToggleWishlist,
  onToggleCompare,
  onSelectCar,
  onBookTestDrive,
}) => {
  const allBrands = useMemo(
    () => ['All', ...Array.from(new Set(cars.map((c) => c.brand))).sort()],
    [cars]
  );

  const categories: ('All' | CarCategory)[] = [
    'All',
    'Budget & Economy',
    'Hatchback & Sedan',
    'SUVs & Family',
    'Premium & Luxury',
    'Sports & Supercars',
    'Ultra-Luxury',
    'Electric Vehicles',
  ];

  const filteredCars = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    const list = cars.filter((car) => {
      if (q) {
        const hay = `${car.brand} ${car.name} ${car.category} ${car.bodyType} ${car.fuelType}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.category !== 'All' && car.category !== filters.category) return false;
      if (filters.brand !== 'All' && car.brand !== filters.brand) return false;
      if (filters.fuel !== 'All' && car.fuelType !== filters.fuel) return false;
      if (filters.bodyType !== 'All' && car.bodyType !== filters.bodyType) return false;
      if (filters.seating !== 'All' && car.seatingCapacity !== Number(filters.seating)) return false;

      if (filters.transmission !== 'All') {
        if (filters.transmission === 'Manual' && car.transmission === 'Automatic') return false;
        if (filters.transmission === 'Automatic' && car.transmission === 'Manual') return false;
      }

      if (filters.budget !== 'All') {
        const p = car.priceExShowroom;
        if (filters.budget === 'under-10l' && p >= 1000000) return false;
        if (filters.budget === '10l-25l' && (p < 1000000 || p > 2500000)) return false;
        if (filters.budget === '25l-1cr' && (p < 2500000 || p > 10000000)) return false;
        if (filters.budget === '1cr-5cr' && (p < 10000000 || p > 50000000)) return false;
        if (filters.budget === 'above-5cr' && p < 50000000) return false;
      }

      return true;
    });

    const sorted = [...list];
    switch (filters.sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.priceExShowroom - b.priceExShowroom);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceExShowroom - a.priceExShowroom);
        break;
      case 'popular':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'new':
        sorted.sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
        break;
      case 'efficiency':
        sorted.sort((a, b) => b.efficiencyValue - a.efficiencyValue);
        break;
      case 'power':
        sorted.sort((a, b) => b.horsepower - a.horsepower);
        break;
      default:
        break;
    }

    return sorted;
  }, [cars, filters]);

  const update = (key: keyof ExploreFilters, value: string) => {
    onChangeFilters({ ...filters, [key]: value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Complete Showroom Inventory
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Explore All Vehicles
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Showing <span className="text-white font-semibold">{filteredCars.length}</span> of{' '}
            {cars.length} curated vehicles from ₹3.99 Lakh to ₹10.50 Crore*.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            placeholder="Search car, brand, or body type..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D1017] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Category Quick Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => update('category', cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.category === cat
                ? 'bg-[#D4AF37] text-black'
                : 'bg-white/[0.04] text-zinc-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Advanced Filter Bar */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3D37A] font-semibold">
            <SlidersHorizontal className="w-4 h-4" /> Smart Filters & Sorting
          </div>
          <button
            onClick={() => onChangeFilters(DEFAULT_FILTERS)}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => update('sortBy', e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="new">New Arrivals</option>
            <option value="power">Highest Horsepower</option>
            <option value="efficiency">Highest Mileage / Range</option>
          </select>

          {/* Brand */}
          <select
            value={filters.brand}
            onChange={(e) => update('brand', e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            {allBrands.map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Brands' : b}
              </option>
            ))}
          </select>

          {/* Budget */}
          <select
            value={filters.budget}
            onChange={(e) => update('budget', e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">Any Budget</option>
            <option value="under-10l">Under ₹10 Lakh</option>
            <option value="10l-25l">₹10 Lakh – ₹25 Lakh</option>
            <option value="25l-1cr">₹25 Lakh – ₹1 Crore</option>
            <option value="1cr-5cr">₹1 Crore – ₹5 Crore</option>
            <option value="above-5cr">Above ₹5 Crore</option>
          </select>

          {/* Fuel */}
          <select
            value={filters.fuel}
            onChange={(e) => update('fuel', e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric (EV)</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {/* Transmission */}
          <select
            value={filters.transmission}
            onChange={(e) => update('transmission', e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          {/* Body Type */}
          <select
            value={filters.bodyType}
            onChange={(e) => update('bodyType', e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Body Types</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Sports Car">Sports Car</option>
          </select>

          {/* Seating */}
          <select
            value={filters.seating}
            onChange={(e) => update('seating', e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#080A0F] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">Seating</option>
            <option value="2">2 Seater</option>
            <option value="4">4 Seater</option>
            <option value="5">5 Seater</option>
            <option value="7">7 Seater</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
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
      ) : (
        <div className="text-center py-20 rounded-3xl border border-white/10 bg-white/[0.02]">
          <p className="text-lg font-semibold text-white">No vehicles match your current filters</p>
          <p className="text-sm text-zinc-400 mt-1">
            Try clearing one or more filters to explore our full 38-vehicle collection.
          </p>
          <button
            onClick={() => onChangeFilters(DEFAULT_FILTERS)}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

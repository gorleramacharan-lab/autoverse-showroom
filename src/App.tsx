import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Sparkles, ArrowRight, Globe, Share2, Mail, Phone } from 'lucide-react';
import { Car, CarCategory, PageView, TestDriveBooking } from './types';
import { CARS } from './data/cars';
import { CATEGORIES } from './data/extraData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ExploreView, ExploreFilters, DEFAULT_FILTERS } from './components/ExploreView';
import { ElectricView } from './components/ElectricView';
import { CompareView } from './components/CompareView';
import { TestDriveView } from './components/TestDriveView';
import { EmiCalculator } from './components/EmiCalculator';
import { AboutView, ContactView } from './components/AboutContactView';
import { CarDetailModal } from './components/CarDetailModal';
import { CarCard } from './components/CarCard';
import { Showroom3DView } from './components/Showroom3DView';

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('3d-studio');
  const [filters, setFilters] = useState<ExploreFilters>(DEFAULT_FILTERS);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [testDriveCarId, setTestDriveCarId] = useState<string | undefined>(undefined);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    loadStorage('autoverse_wishlist', [])
  );
  const [compareIds, setCompareIds] = useState<string[]>(() =>
    loadStorage('autoverse_compare', ['hyundai-creta', 'kia-seltos'])
  );
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() =>
    loadStorage('autoverse_recent', [])
  );
  const [bookings, setBookings] = useState<TestDriveBooking[]>(() =>
    loadStorage('autoverse_bookings', [])
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('autoverse_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('autoverse_compare', JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    localStorage.setItem('autoverse_recent', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem('autoverse_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      const car = CARS.find((c) => c.id === id);
      showToast(
        exists
          ? `Removed ${car?.brand} ${car?.name} from Wishlist`
          : `Saved ${car?.brand} ${car?.name} to Wishlist`
      );
      return exists ? prev.filter((x) => x !== id) : [id, ...prev];
    });
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed vehicle from comparison');
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) {
        showToast('Compare supports up to 3 cars. Replaced oldest selection.');
        return [...prev.slice(1), id];
      }
      const car = CARS.find((c) => c.id === id);
      showToast(`Added ${car?.brand} ${car?.name} to Compare (${prev.length + 1}/3)`);
      return [...prev, id];
    });
  };

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
    setRecentlyViewedIds((prev) => [car.id, ...prev.filter((id) => id !== car.id)].slice(0, 8));
  };

  const handleBookTestDrive = (car?: Car) => {
    setSelectedCar(null);
    setTestDriveCarId(car?.id);
    setActivePage('test-drive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCategory = (cat: CarCategory) => {
    setFilters({ ...DEFAULT_FILTERS, category: cat });
    setActivePage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreBrand = (brand: string) => {
    setFilters({ ...DEFAULT_FILTERS, brand });
    setActivePage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const evCars = useMemo(() => CARS.filter((c) => c.fuelType === 'Electric'), []);
  const wishlistCars = useMemo(() => CARS.filter((c) => wishlistIds.includes(c.id)), [wishlistIds]);
  const recentlyViewedCars = useMemo(
    () =>
      recentlyViewedIds
        .map((id) => CARS.find((c) => c.id === id))
        .filter((c): c is Car => Boolean(c)),
    [recentlyViewedIds]
  );

  return (
    <div className="min-h-screen bg-[#06070A] text-[#F9FAFB] flex flex-col">
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
      />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {activePage === 'home' && (
          <HomeView
            cars={CARS}
            recentlyViewedCars={recentlyViewedCars}
            wishlistIds={wishlistIds}
            compareIds={compareIds}
            onNavigate={setActivePage}
            onExploreCategory={handleExploreCategory}
            onExploreBrand={handleExploreBrand}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onSelectCar={handleSelectCar}
            onBookTestDrive={handleBookTestDrive}
          />
        )}

        {activePage === 'explore' && (
          <ExploreView
            cars={CARS}
            filters={filters}
            onChangeFilters={setFilters}
            wishlistIds={wishlistIds}
            compareIds={compareIds}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onSelectCar={handleSelectCar}
            onBookTestDrive={handleBookTestDrive}
          />
        )}

        {activePage === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
                Economy to Ultra-Luxury
              </span>
              <h1 className="font-display text-4xl font-bold text-white mt-1">
                Showroom Categories
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Select any automotive tier to explore its curated lineup.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => {
                const count = CARS.filter((c) => c.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleExploreCategory(cat.id)}
                    className="group relative h-72 rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer"
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/70 border border-[#D4AF37]/40 text-[10px] uppercase tracking-wider text-[#F3D37A] font-bold">
                        {cat.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] text-white font-semibold">
                        {count} Models
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="font-mono-num text-xs text-[#F3D37A] font-semibold">
                        {cat.priceRange}
                      </p>
                      <h2 className="font-display text-2xl font-bold text-white mt-0.5 group-hover:text-[#F3D37A] transition-colors">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-zinc-300 mt-1">{cat.subtitle}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F3D37A] mt-3">
                        Browse Category <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activePage === '3d-studio' && (
          <Showroom3DView
            cars={CARS}
            wishlistIds={wishlistIds}
            compareIds={compareIds}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onSelectCar={handleSelectCar}
            onBookTestDrive={handleBookTestDrive}
          />
        )}

        {activePage === 'electric' && (
          <ElectricView
            evCars={evCars}
            wishlistIds={wishlistIds}
            compareIds={compareIds}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onSelectCar={handleSelectCar}
            onBookTestDrive={handleBookTestDrive}
          />
        )}

        {activePage === 'compare' && (
          <CompareView
            allCars={CARS}
            compareIds={compareIds}
            onSetCompareIds={setCompareIds}
            onSelectCar={handleSelectCar}
            onBookTestDrive={handleBookTestDrive}
          />
        )}

        {activePage === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
                Your Personal Garage
              </span>
              <h1 className="font-display text-4xl font-bold text-white mt-1">
                Saved Wishlist ({wishlistCars.length})
              </h1>
            </div>
            {wishlistCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    isWishlisted
                    isCompared={compareIds.includes(car.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    onSelectCar={handleSelectCar}
                    onBookTestDrive={handleBookTestDrive}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 rounded-3xl border border-white/10 bg-white/[0.02]">
                <Heart className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-80" />
                <h3 className="text-lg font-semibold text-white">Your garage is empty</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Tap the heart icon on any vehicle to save your favorites here.
                </p>
                <button
                  onClick={() => setActivePage('explore')}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs cursor-pointer"
                >
                  Explore Vehicles
                </button>
              </div>
            )}
          </div>
        )}

        {activePage === 'test-drive' && (
          <TestDriveView
            cars={CARS}
            preselectedCarId={testDriveCarId}
            bookings={bookings}
            onAddBooking={(b) => setBookings((prev) => [b, ...prev])}
          />
        )}

        {activePage === 'emi' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <EmiCalculator cars={CARS} />
          </div>
        )}

        {activePage === 'about' && <AboutView />}
        {activePage === 'contact' && <ContactView />}
      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-white/10 bg-[#050608] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#F3D37A]" />
              <span className="font-display text-xl font-bold tracking-[0.2em] text-gold-gradient">
                AUTOVERSE
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              International smart car showroom curating vehicles from everyday economy commuters to
              bespoke ultra-luxury automobiles.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              {[Globe, Share2, Mail, Phone].map((Icon, i) => (
                <button
                  key={i}
                  onClick={() => showToast('Social media profile placeholder')}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#D4AF37]/20 hover:text-[#F3D37A] transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Showroom</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {[
                { label: 'Explore All Cars', page: 'explore' as PageView },
                { label: 'Car Categories', page: 'categories' as PageView },
                { label: 'Electric Vehicles (EV)', page: 'electric' as PageView },
                { label: 'Compare Vehicles', page: 'compare' as PageView },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => {
                      setActivePage(l.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F3D37A] transition-colors cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {[
                { label: 'Book VIP Test Drive', page: 'test-drive' as PageView },
                { label: 'EMI & Loan Estimator', page: 'emi' as PageView },
                { label: 'Saved Wishlist', page: 'wishlist' as PageView },
                { label: 'About AUTOVERSE', page: 'about' as PageView },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => {
                      setActivePage(l.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F3D37A] transition-colors cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4">
              Price & Spec Disclaimer
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              All prices displayed in Indian Rupees (₹) are estimated Pan-India ex-showroom /
              on-road figures for reference and may vary by city, variant, and state RTO policies.
            </p>
          </div>
        </div>
        <div className="border-t border-white/[0.06] py-5 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} AUTOVERSE Smart Luxury Showroom. All rights reserved.
        </div>
      </footer>

      {/* Car Detail Modal */}
      {selectedCar && (
        <CarDetailModal
          car={selectedCar}
          isWishlisted={wishlistIds.includes(selectedCar.id)}
          isCompared={compareIds.includes(selectedCar.id)}
          onClose={() => setSelectedCar(null)}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          onBookTestDrive={handleBookTestDrive}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#11141D] border border-[#D4AF37]/50 text-xs font-semibold text-[#F3D37A] shadow-2xl animate-fade-up">
          {toast}
        </div>
      )}
    </div>
  );
}

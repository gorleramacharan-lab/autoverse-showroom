import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Car as CarIcon,
  Sparkles,
} from 'lucide-react';
import { Car, TestDriveBooking } from '../types';
import { SHOWROOM_LOCATIONS } from '../data/extraData';

interface TestDriveViewProps {
  cars: Car[];
  preselectedCarId?: string;
  bookings: TestDriveBooking[];
  onAddBooking: (booking: TestDriveBooking) => void;
}

export const TestDriveView: React.FC<TestDriveViewProps> = ({
  cars,
  preselectedCarId,
  bookings,
  onAddBooking,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [carId, setCarId] = useState(preselectedCarId || cars[0]?.id || '');
  const [location, setLocation] = useState(SHOWROOM_LOCATIONS[0]);
  const [date, setDate] = useState('2026-11-28');
  const [time, setTime] = useState('11:00 AM');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<TestDriveBooking | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (customerName.trim().length < 2) errs.customerName = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(mobile.trim()))
      errs.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = 'Enter a valid email address.';
    if (!carId) errs.carId = 'Please select a vehicle.';
    if (!date) errs.date = 'Please choose a preferred date.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedCar = cars.find((c) => c.id === carId);
    const newBooking: TestDriveBooking = {
      id: `AV-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      carId,
      carName: selectedCar ? `${selectedCar.brand} ${selectedCar.name}` : carId,
      location,
      date,
      time,
      message: message.trim(),
      createdAt: new Date().toLocaleDateString('en-IN'),
    };

    onAddBooking(newBooking);
    setConfirmedBooking(newBooking);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3D37A] text-xs uppercase tracking-[0.2em] font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> VIP Showroom Concierge
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mt-3">
          Book Your Test Drive
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          Experience your dream machine firsthand at any AUTOVERSE Signature Lounge or request doorstep delivery.
        </p>
      </div>

      {confirmedBooking ? (
        <div className="max-w-2xl mx-auto rounded-3xl glass-panel-gold p-8 text-center space-y-6 animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#F3D37A] font-semibold">
              Appointment Confirmed
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              We Look Forward to Welcoming You, {confirmedBooking.customerName}!
            </h2>
            <p className="text-sm text-zinc-300 mt-2">
              Your VIP test drive concierge ticket has been issued. Reference:{' '}
              <span className="font-mono-num font-bold text-[#F3D37A]">{confirmedBooking.id}</span>
            </p>
          </div>

          <div className="rounded-2xl bg-black/40 border border-white/10 p-5 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-zinc-400 block">Selected Vehicle</span>
              <span className="text-white font-semibold text-sm">{confirmedBooking.carName}</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Showroom Location</span>
              <span className="text-white font-semibold">{confirmedBooking.location}</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Date & Time</span>
              <span className="text-[#F3D37A] font-semibold">
                {confirmedBooking.date} at {confirmedBooking.time}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block">Contact</span>
              <span className="text-white font-semibold">
                +91 {confirmedBooking.mobile} • {confirmedBooking.email}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setConfirmedBooking(null);
              setCustomerName('');
              setMobile('');
              setEmail('');
              setMessage('');
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3D37A] text-black font-bold text-sm cursor-pointer"
          >
            Book Another Test Drive
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl glass-panel p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Customer Name */}
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Full Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
            {errors.customerName && (
              <p className="text-xs text-rose-400 mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Mobile Number (India) *
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
            {errors.mobile && <p className="text-xs text-rose-400 mt-1">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
          </div>

          {/* Car Model */}
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
              <CarIcon className="w-3.5 h-3.5 text-[#D4AF37]" /> Select Car Model *
            </label>
            <select
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.brand} {c.name} — {c.priceDisplay}
                </option>
              ))}
            </select>
            {errors.carId && <p className="text-xs text-rose-400 mt-1">{errors.carId}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Showroom *
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {SHOWROOM_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                <CalendarCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Time Slot
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {['10:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '06:30 PM'].map(
                  (slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
              Additional Requests (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Prefer doorstep test drive, specific variant, or financing consultation..."
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D37A] to-[#C59B27] text-black font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/25 cursor-pointer"
            >
              Confirm VIP Test Drive Appointment
            </button>
          </div>
        </form>
      )}

      {/* Saved Bookings */}
      {bookings.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-display text-xl font-bold text-white">Your Recent Bookings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-[#0D1017] border border-white/10 flex items-center justify-between"
              >
                <div>
                  <span className="font-mono-num text-xs text-[#F3D37A] font-semibold">{b.id}</span>
                  <h4 className="text-white font-bold mt-0.5">{b.carName}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{b.location}</p>
                </div>
                <div className="text-right text-xs">
                  <span className="text-white font-semibold block">{b.date}</span>
                  <span className="text-zinc-400">{b.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

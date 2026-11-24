import React, { useState, useMemo } from 'react';
import { Calculator, IndianRupee, Percent, Calendar } from 'lucide-react';
import { Car } from '../types';

interface EmiCalculatorProps {
  cars?: Car[];
  initialPrice?: number;
  initialCarName?: string;
  compact?: boolean;
}

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({
  cars = [],
  initialPrice = 1500000,
  initialCarName,
  compact = false,
}) => {
  const [selectedCarId, setSelectedCarId] = useState<string>('');
  const [vehiclePrice, setVehiclePrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(9.2);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const handleCarChange = (id: string) => {
    setSelectedCarId(id);
    const found = cars.find((c) => c.id === id);
    if (found) {
      setVehiclePrice(found.priceOnRoad);
    }
  };

  const { downPayment, loanAmount, emi, totalInterest, totalPayable, principalRatio } =
    useMemo(() => {
      const dp = Math.round((vehiclePrice * downPaymentPercent) / 100);
      const principal = Math.max(0, vehiclePrice - dp);
      const monthlyRate = interestRate / 12 / 100;
      const months = tenureYears * 12;

      let monthlyEmi = 0;
      if (principal > 0 && monthlyRate > 0) {
        monthlyEmi =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
      } else if (principal > 0) {
        monthlyEmi = principal / months;
      }

      const totalPay = Math.round(monthlyEmi * months);
      const interest = Math.max(0, totalPay - principal);
      const ratio = totalPay > 0 ? Math.round((principal / totalPay) * 100) : 100;

      return {
        downPayment: dp,
        loanAmount: principal,
        emi: Math.round(monthlyEmi),
        totalInterest: interest,
        totalPayable: totalPay,
        principalRatio: ratio,
      };
    }, [vehiclePrice, downPaymentPercent, interestRate, tenureYears]);

  return (
    <div className={`rounded-2xl glass-panel ${compact ? 'p-5' : 'p-6 sm:p-8'}`}>
      {!compact && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold">
              <Calculator className="w-4 h-4" /> Financial Concierge
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              EMI & Car Loan Estimator
            </h2>
          </div>
          {cars.length > 0 && (
            <div className="w-full sm:w-72">
              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">
                Quick-Fill from Showroom
              </label>
              <select
                value={selectedCarId}
                onChange={(e) => handleCarChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0E14] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Custom Vehicle Price</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.brand} {c.name} ({c.onRoadDisplay})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {initialCarName && compact && (
        <p className="text-xs text-zinc-400 mb-4">
          Estimated loan plan for <span className="text-[#F3D37A] font-semibold">{initialCarName}</span> (On-Road Est.)
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-5">
          {/* Vehicle Price */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-[#D4AF37]" /> Vehicle Price (On-Road Est.)
              </span>
              <span className="font-mono-num font-bold text-white">{formatINR(vehiclePrice)}</span>
            </div>
            <input
              type="range"
              min={400000}
              max={125000000}
              step={50000}
              value={vehiclePrice}
              onChange={(e) => {
                setSelectedCarId('');
                setVehiclePrice(Number(e.target.value));
              }}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>₹4 Lakh</span>
              <span>₹12.5 Crore</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-[#D4AF37]" /> Down Payment ({downPaymentPercent}%)
              </span>
              <span className="font-mono-num font-bold text-[#F3D37A]">{formatINR(downPayment)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-300">Interest Rate (p.a.)</span>
              <span className="font-mono-num font-bold text-white">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={7.0}
              max={15.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Loan Tenure
              </span>
              <span className="font-mono-num font-bold text-white">{tenureYears} Years ({tenureYears * 12} Months)</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTenureYears(yr)}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    tenureYears === yr
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-white/[0.04] text-zinc-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {yr}Y
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Output Card */}
        <div className="lg:col-span-5 rounded-2xl bg-[#080A0F] border border-[#D4AF37]/30 p-6 space-y-5">
          <div className="text-center pb-4 border-b border-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Estimated Monthly EMI
            </p>
            <div className="font-mono-num text-3xl sm:text-4xl font-bold text-gold-gradient mt-2">
              {formatINR(emi)}
              <span className="text-xs text-zinc-400 font-normal"> /mo</span>
            </div>
          </div>

          {/* Visual Principal vs Interest Bar */}
          <div>
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
              <span>Principal ({principalRatio}%)</span>
              <span>Interest ({100 - principalRatio}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden flex">
              <div
                style={{ width: `${principalRatio}%` }}
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3D37A] transition-all duration-300"
              />
              <div
                style={{ width: `${100 - principalRatio}%` }}
                className="h-full bg-zinc-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Loan Amount</span>
              <span className="font-mono-num font-semibold text-white">{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Total Interest Payable</span>
              <span className="font-mono-num font-semibold text-zinc-200">{formatINR(totalInterest)}</span>
            </div>
            <div className="flex justify-between pt-2.5 border-t border-white/10">
              <span className="text-zinc-200 font-medium">Total Loan Repayment</span>
              <span className="font-mono-num font-bold text-[#F3D37A]">{formatINR(totalPayable)}</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 text-center">
            *Indicative calculation. Actual EMI depends on bank approval, credit score & state taxes.
          </p>
        </div>
      </div>
    </div>
  );
};

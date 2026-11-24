import { CarCategory, UpcomingCar } from '../types';

export interface CategoryMeta {
  id: CarCategory;
  title: string;
  subtitle: string;
  priceRange: string;
  image: string;
  badge: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'Budget & Economy',
    title: 'Budget & Economy',
    subtitle: 'Smart everyday commuters engineered for efficiency, reliability, and effortless urban agility.',
    priceRange: '₹3.99L – ₹9.50L*',
    image: '/images/cat-economy.jpg',
    badge: 'Smart Mobility',
  },
  {
    id: 'Hatchback & Sedan',
    title: 'Hatchback & Sedan',
    subtitle: 'Refined silhouettes blending dynamic handling, executive comfort, and everyday practicality.',
    priceRange: '₹7.04L – ₹19.40L*',
    image: '/images/cat-sedan.jpg',
    badge: 'Executive Class',
  },
  {
    id: 'SUVs & Family',
    title: 'SUVs & Family Cars',
    subtitle: 'Commanding road presence, 5-star safety engineering, and spacious versatility for every journey.',
    priceRange: '₹8.00L – ₹51.44L*',
    image: '/images/cat-suv.jpg',
    badge: 'All-Terrain',
  },
  {
    id: 'Premium & Luxury',
    title: 'Premium & Luxury',
    subtitle: 'German and British craftsmanship featuring whisper-quiet cabins and exhilarating precision.',
    priceRange: '₹61.85L – ₹1.84 Cr*',
    image: '/images/cat-premium.jpg',
    badge: 'Flagship Prestige',
  },
  {
    id: 'Sports & Supercars',
    title: 'Sports & Supercars',
    subtitle: 'Track-bred aerodynamics, blistering acceleration, and visceral supercar symphony.',
    priceRange: '₹1.99 Cr – ₹5.91 Cr*',
    image: '/images/hero-supercar.jpg',
    badge: 'Track Bred',
  },
  {
    id: 'Ultra-Luxury',
    title: 'Ultra-Luxury',
    subtitle: 'Hand-built automotive royalty representing the absolute pinnacle of bespoke opulence.',
    priceRange: '₹2.72 Cr – ₹10.48 Cr*',
    image: '/images/cat-ultraluxury.jpg',
    badge: 'Bespoke Royalty',
  },
  {
    id: 'Electric Vehicles',
    title: 'Electric Vehicles',
    subtitle: 'Zero-emission torque, ultra-fast DC charging, and next-generation intelligent cockpits.',
    priceRange: '₹9.99L – ₹1.89 Cr*',
    image: '/images/cat-ev.jpg',
    badge: 'Zero Emission',
  },
];

export const POPULAR_BRANDS = [
  'Maruti Suzuki',
  'Tata',
  'Hyundai',
  'Mahindra',
  'Toyota',
  'Honda',
  'Kia',
  'Volkswagen',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Porsche',
  'Lamborghini',
  'Ferrari',
  'Rolls-Royce',
  'Bentley',
  'BYD',
];

export const SHOWROOM_LOCATIONS = [
  'AUTOVERSE Flagship — Mumbai (Worli)',
  'AUTOVERSE Experience Center — New Delhi (Chanakyapuri)',
  'AUTOVERSE Signature Lounge — Bengaluru (UB City)',
  'AUTOVERSE Luxury Pavilion — Hyderabad (Jubilee Hills)',
  'AUTOVERSE Gallery — Chennai (Anna Salai)',
  'AUTOVERSE Studio — Vijayawada (MG Road)',
  'AUTOVERSE Atelier — Pune (Koregaon Park)',
  'AUTOVERSE Lounge — Kolkata (Park Street)',
];

export const UPCOMING_CARS: UpcomingCar[] = [
  {
    id: 'upcoming-sierra-ev',
    name: 'Tata Sierra EV',
    brand: 'Tata',
    expectedLaunch: 'Q2 2026',
    estimatedPrice: '₹22.00L – ₹28.00L (Est.)',
    fuelType: 'Electric',
    image: '/images/cat-ev.jpg',
    highlight: 'Iconic panoramic glasshouse returns with 550+ km estimated range and AWD dual-motor setup.',
  },
  {
    id: 'upcoming-xev-9e',
    name: 'Mahindra XEV 9e',
    brand: 'Mahindra',
    expectedLaunch: 'Q1 2026',
    estimatedPrice: '₹21.90L – ₹30.50L (Est.)',
    fuelType: 'Electric',
    image: '/images/cat-suv.jpg',
    highlight: 'INGLO born-electric SUV coupe with triple-screen cockpit and 175 kW ultra-fast charging.',
  },
  {
    id: 'upcoming-porsche-macan-ev',
    name: 'Porsche Macan Electric',
    brand: 'Porsche',
    expectedLaunch: 'Mid 2026',
    estimatedPrice: '₹1.22 Cr – ₹1.69 Cr (Est.)',
    fuelType: 'Electric',
    image: '/images/cat-premium.jpg',
    highlight: '800V PPE architecture delivering up to 639 PS and 0-100 km/h in 3.3 seconds.',
  },
  {
    id: 'upcoming-ferrari-12cilindri',
    name: 'Ferrari 12Cilindri',
    brand: 'Ferrari',
    expectedLaunch: 'Late 2026',
    estimatedPrice: '₹8.50 Cr (Est.)',
    fuelType: 'Petrol',
    image: '/images/hero-supercar.jpg',
    highlight: 'Naturally aspirated 6.5L V12 revving to 9,500 rpm with 830 CV of pure Maranello drama.',
  },
];

export const FAQS = [
  {
    q: 'Are the prices shown on AUTOVERSE ex-showroom or on-road?',
    a: 'Every vehicle displays both its Estimated Ex-Showroom Price (Pan-India average) and Estimated On-Road Price (inclusive of standard RTO, insurance, and TCS where applicable). Exact on-road figures vary slightly by state and city.',
  },
  {
    q: 'How do I book a VIP test drive at an AUTOVERSE showroom?',
    a: 'Simply click "Book a Test Drive" on any vehicle page or in the navigation bar, select your preferred model, showroom city, and date/time slot. Our concierge team confirms your appointment immediately with a booking reference.',
  },
  {
    q: 'Can I compare up to three vehicles side by side?',
    a: 'Yes! Click the Compare icon on any car card or visit the Compare Cars page to place 2 or 3 vehicles side by side across price, engine, power, mileage/range, safety, and technology—complete with automatic value highlights.',
  },
  {
    q: 'Do you offer financing and EMI estimation tools?',
    a: 'Our interactive EMI & Car Loan Estimator lets you customize down payment, interest rate, and tenure (1–7 years) for any car in our 42-vehicle catalog, showing exact monthly EMI and total interest breakdown.',
  },
  {
    q: 'Are electric vehicle charging times and ranges verified?',
    a: 'All EV range figures reflect manufacturer-certified (ARAI/WLTP) or realistic estimated ranges, and charging times indicate both DC fast charging (10–80%) and standard AC home wall-box charging.',
  },
];

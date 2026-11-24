export type CarCategory =
  | 'Budget & Economy'
  | 'Hatchback & Sedan'
  | 'SUVs & Family'
  | 'Premium & Luxury'
  | 'Sports & Supercars'
  | 'Ultra-Luxury'
  | 'Electric Vehicles';

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
export type TransmissionType = 'Manual' | 'Automatic' | 'Manual / Automatic';
export type BodyType = 'Hatchback' | 'Sedan' | 'SUV' | 'Coupe' | 'Sports Car';

export interface CarColor {
  name: string;
  hex: string;
}

export interface CarReview {
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  bodyType: BodyType;
  fuelType: FuelType;
  transmission: TransmissionType;
  seatingCapacity: number;
  /** Estimated Ex-Showroom price in INR (e.g. 599000 for ₹5.99 Lakh) */
  priceExShowroom: number;
  /** Estimated On-Road price in INR */
  priceOnRoad: number;
  priceDisplay: string;
  onRoadDisplay: string;
  /** Numeric mileage (km/l) or EV range (km) for sorting/filtering */
  efficiencyValue: number;
  efficiencyDisplay: string;
  horsepower: number;
  horsepowerDisplay: string;
  torqueDisplay: string;
  engineCapacity: string;
  topSpeed: string;
  acceleration: string;
  safetyRating: string;
  /** Optional EV specific specs */
  evSpecs?: {
    batteryCapacity: string;
    range: string;
    fastCharging: string;
    homeCharging: string;
  };
  images: string[];
  fallbackImage: string;
  colors: CarColor[];
  description: string;
  highlights: string[];
  interiorFeatures: string[];
  exteriorFeatures: string[];
  infotainmentFeatures: string[];
  safetyFeatures: string[];
  rating: number;
  reviewCount: number;
  reviews: CarReview[];
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFeaturedOfWeek?: boolean;
  specialOffer?: string;
}

export interface UpcomingCar {
  id: string;
  name: string;
  brand: string;
  expectedLaunch: string;
  estimatedPrice: string;
  fuelType: FuelType;
  image: string;
  highlight: string;
}

export interface TestDriveBooking {
  id: string;
  customerName: string;
  mobile: string;
  email: string;
  carId: string;
  carName: string;
  location: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
}

export type PageView =
  | 'home'
  | 'explore'
  | 'categories'
  | '3d-studio'
  | 'electric'
  | 'compare'
  | 'wishlist'
  | 'test-drive'
  | 'emi'
  | 'about'
  | 'contact';

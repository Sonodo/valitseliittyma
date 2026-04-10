// Operator types
export type OperatorType = 'MNO' | 'MVNO';

export interface Operator {
  id: string;
  name: string;
  slug: string;
  brand?: string; // e.g. Saunalahti for Elisa
  description: string;
  founded: number;
  website: string;
  type: OperatorType;
  network?: string; // For MVNOs — which MNO network they use
  marketShare?: number; // percentage
  logo?: string;
  color: string; // brand color for UI
  pros: string[];
  cons: string[];
}

// Plan types
export type PlanCategory = 'mobile' | 'broadband';
export type ContractType = 'no-commitment' | '24-month';
export type BroadbandTechnology = 'fiber' | '4G' | '5G';

export interface MobilePlan {
  id: string;
  operatorId: string;
  name: string;
  category: 'mobile';
  monthlyPrice: number; // EUR/kk
  dataAmount: number | 'unlimited'; // GB or unlimited
  maxSpeed: number; // Mbit/s
  has5G: boolean;
  contractType: ContractType;
  callsIncluded: string; // e.g. "Rajaton Suomeen"
  smsIncluded: string;
  euRoamingData: number; // GB
  specialFeatures: string[];
  url: string;
}

export interface BroadbandPlan {
  id: string;
  operatorId: string;
  name: string;
  category: 'broadband';
  monthlyPrice: number;
  technology: BroadbandTechnology;
  downloadSpeed: number; // Mbit/s
  uploadSpeed: number; // Mbit/s
  contractType: ContractType;
  specialFeatures: string[];
  url: string;
}

export type Plan = MobilePlan | BroadbandPlan;

// Navigation
export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

// Blog
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingTime: number; // minutes
  content: string; // HTML content
}

// Guide
export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string;
}

// City
export interface City {
  slug: string;
  name: string;
  population: number;
  has5G: boolean;
  fiberAvailable: boolean;
  operators5G: string[]; // operator IDs with 5G in this city
  broadbandProviders: string[]; // operator IDs offering broadband
  description: string;
}

// Comparison pair
export interface ComparisonPair {
  slugPair: string;
  operator1Id: string;
  operator2Id: string;
}

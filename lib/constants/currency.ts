export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
] as const;

export const PAYMENT_METHODS = ['credit', 'debit', 'apple_pay', 'google_pay'] as const;

export const DEFAULT_CURRENCY = 'USD';

export const STORAGE_KEYS = {
  DETECTED_CURRENCY: 'binx_detected_currency',
  SELECTED_CURRENCY: 'binx_selected_currency',
  CURRENCY_TIMESTAMP: 'binx_currency_timestamp',
} as const;

export const CURRENCY_CACHE_DURATION = 24 * 60 * 60 * 1000;

export interface PackagePricing {
  starter: number;
  basic: number;
  pro: number;
  power: number;
  unlimited: number;
}

export const PACKAGE_PRICING: Record<string, PackagePricing> = {
  USD: { starter: 0.80, basic: 2.49, pro: 6.99, power: 17.99, unlimited: 39.99 },
  EUR: { starter: 0.75, basic: 2.35, pro: 6.59, power: 16.99, unlimited: 37.99 },
  GBP: { starter: 0.65, basic: 2.05, pro: 5.75, power: 14.79, unlimited: 32.99 },
  CAD: { starter: 1.10, basic: 3.45, pro: 9.69, power: 24.95, unlimited: 55.49 },
  AUD: { starter: 1.25, basic: 3.89, pro: 10.95, power: 28.15, unlimited: 62.59 },
  INR: { starter: 67, basic: 209, pro: 585, power: 1505, unlimited: 3349 },
  NGN: { starter: 1280, basic: 3990, pro: 11195, power: 28815, unlimited: 64079 },
};

export const CREDIT_PRICING: Record<string, number> = {
  USD: 2.49,
  EUR: 2.35,
  GBP: 2.05,
  CAD: 3.45,
  AUD: 3.89,
  INR: 209,
  NGN: 3990,
};

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number]['code'];
export type PaymentMethod = typeof PAYMENT_METHODS[number];

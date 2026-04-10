// Format price in Finnish style
export function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',') + ' €/kk';
}

// Format data amount
export function formatData(amount: number | 'unlimited'): string {
  if (amount === 'unlimited') return 'Rajaton';
  if (amount === 0) return 'Ei dataa';
  return `${amount} Gt`;
}

// Format speed
export function formatSpeed(speed: number): string {
  if (speed === 0) return '—';
  if (speed >= 1000) return `${(speed / 1000).toFixed(0)} Gbit/s`;
  return `${speed} Mbit/s`;
}

// Slugify text for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get contract type label in Finnish
export function getContractLabel(type: string): string {
  switch (type) {
    case 'no-commitment':
      return 'Ei sitoutumista';
    case '24-month':
      return '24 kk sopimus';
    default:
      return type;
  }
}

// Generate comparison slug pair
export function makeComparisonSlug(op1Slug: string, op2Slug: string): string {
  return [op1Slug, op2Slug].sort().join('-vs-');
}

// cn utility for conditional classnames
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

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

/**
 * Finnish genitive form for an operator name.
 *
 * Finnish grammar rules for brand/abbreviation genitive:
 *   - All-caps acronyms (DNA, VR, SOK) → `DNA:n`
 *   - Normal words ending in a vowel → append `-n` (Elisa → Elisan, Telia → Telian)
 *   - Normal words ending in `s` → `-sen` (not currently needed here)
 *
 * We use a small explicit map for the known operators and fall back to the generic rules.
 */
export function operatorGenitive(name: string): string {
  const overrides: Record<string, string> = {
    DNA: 'DNA:n',
    Elisa: 'Elisan',
    Telia: 'Telian',
    'Moi Mobiili': 'Moi Mobiilin',
    'Giga Mobiili': 'Giga Mobiilin',
    'Oomi Mobiili': 'Oomi Mobiilin',
    Globetel: 'Globetelin',
  };
  if (name in overrides) return overrides[name];
  // Generic fallback: all-uppercase → colon-n; otherwise append n (keeps vowel stems correct)
  if (name === name.toUpperCase()) return `${name}:n`;
  if (/[aeiouyäö]$/i.test(name)) return `${name}n`;
  return `${name}:n`;
}

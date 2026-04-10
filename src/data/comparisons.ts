import { ComparisonPair } from '@/types';

// All operator comparison pairs to generate
export const comparisonPairs: ComparisonPair[] = [
  // Big 3 vs each other
  { slugPair: 'dna-vs-elisa', operator1Id: 'dna', operator2Id: 'elisa' },
  { slugPair: 'elisa-vs-telia', operator1Id: 'elisa', operator2Id: 'telia' },
  { slugPair: 'dna-vs-telia', operator1Id: 'dna', operator2Id: 'telia' },
  // Big 3 vs MVNOs
  { slugPair: 'elisa-vs-moi', operator1Id: 'elisa', operator2Id: 'moi' },
  { slugPair: 'dna-vs-moi', operator1Id: 'dna', operator2Id: 'moi' },
  { slugPair: 'dna-vs-giga', operator1Id: 'dna', operator2Id: 'giga' },
  { slugPair: 'elisa-vs-giga', operator1Id: 'elisa', operator2Id: 'giga' },
  { slugPair: 'telia-vs-moi', operator1Id: 'telia', operator2Id: 'moi' },
  { slugPair: 'giga-vs-telia', operator1Id: 'giga', operator2Id: 'telia' },
  { slugPair: 'elisa-vs-oomi', operator1Id: 'elisa', operator2Id: 'oomi' },
  // MVNO vs MVNO
  { slugPair: 'giga-vs-moi', operator1Id: 'giga', operator2Id: 'moi' },
  { slugPair: 'moi-vs-oomi', operator1Id: 'moi', operator2Id: 'oomi' },
];

export function getComparisonBySlug(slugPair: string): ComparisonPair | undefined {
  return comparisonPairs.find((c) => c.slugPair === slugPair);
}

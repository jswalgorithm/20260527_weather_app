export interface OutfitItem {
  id: string;
  label: string;
  emoji: string;
  category: 'base' | 'outer' | 'accessory' | 'tip';
  reason?: string;
}

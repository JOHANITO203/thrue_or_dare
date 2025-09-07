import { describe, it, expect } from 'vitest';
import { drawCard } from '../deck.js';

describe('drawCard', () => {
  it('removes the drawn card from the deck', () => {
    const deck = ['A', 'B', 'C'];
    const card = drawCard(deck);
    expect(['A', 'B', 'C']).toContain(card);
    expect(deck).not.toContain(card);
    expect(deck).toHaveLength(2);
  });
});


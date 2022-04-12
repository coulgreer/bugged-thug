import Card from './card';
import Deck from './deck';

export default interface Player {
  isEqual(obj: any): boolean;

  getHandPile(): Card[];

  getDrawPile(): Deck;

  getDiscardPile(): Deck;
}

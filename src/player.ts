import Card from './card';
import Deck from './deck';

export default interface Player {
  getHandPile(): Card[];

  getDrawPile(): Deck;

  getDiscardPile(): Deck;
}

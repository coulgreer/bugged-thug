import Card, {
  WIDTH as CARD_WIDTH,
  HEIGHT as CARD_HEIGHT,
  SCALE as CARD_SCALE,
} from './card';
import CardEntry from './card-entry';
import Deck from './deck';
import Player from './player';

export default class Opponent implements Player {
  private drawPile: Deck;

  private discardPile: Deck;

  constructor(master: CardEntry[]) {
    this.discardPile = new Deck([], 0, 0);
    this.drawPile = new Deck(
      master,
      (CARD_WIDTH * CARD_SCALE) / 2,
      (CARD_HEIGHT * CARD_SCALE) / 2
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getHandPile(): Card[] {
    return [];
  }

  getDrawPile(): Deck {
    return this.drawPile;
  }

  getDiscardPile(): Deck {
    return this.discardPile;
  }
}
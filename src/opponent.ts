import Card, {
  WIDTH as CARD_WIDTH,
  HEIGHT as CARD_HEIGHT,
  SCALE as CARD_SCALE,
} from './card';
import CardEntry from './card-entry';
import Deck from './deck';
import Orientation from './orientation';
import Player from './player';

export default class Opponent implements Player {
  private playedCards: Card[];

  private drawPile;

  private discardPile;

  constructor(master: CardEntry[]) {
    this.playedCards = [];
    this.discardPile = new Deck([], 0, 0);
    this.drawPile = new Deck(
      master,
      (CARD_WIDTH * CARD_SCALE) / 2,
      (CARD_HEIGHT * CARD_SCALE) / 2
    );
  }

  // eslint-disable-next-line class-methods-use-this
  isEqual(obj: any): boolean {
    if (obj instanceof Opponent) return true;

    return false;
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

  play() {
    if (this.drawPile.getCards().length === 0) {
      this.replenishDrawPile();
      setTimeout(() => this.playCard(), 1000);
    } else {
      this.playCard();
    }
  }

  private playCard() {
    this.drawPile.shuffle();
    const [drawnCard] = this.drawPile.draw();
    drawnCard.play();
    this.playedCards.push(drawnCard);
  }

  private replenishDrawPile() {
    const padding = 3;
    let xPos = (CARD_WIDTH * CARD_SCALE) / 2 + padding;

    this.drawPile.combine(this.playedCards, Orientation.TOP);
    this.drawPile.getCards().forEach((card) => {
      card.draw();
      card.setPosition(xPos, (CARD_WIDTH * CARD_SCALE) / 2);
      xPos += CARD_WIDTH * CARD_SCALE + padding;
    });
  }
}

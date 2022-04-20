import Card from './card';
import CardEntry from './card-entry';
import Orientation from './orientation';

export default class Deck {
  private xPos: number;

  private yPos: number;

  private pile: Card[];

  constructor(cardEntries: CardEntry[], xPos: number = 0, yPos: number = 0) {
    this.pile = [];
    this.xPos = xPos;
    this.yPos = yPos;

    cardEntries.forEach((entry) => {
      entry.getCards().forEach((card) => this.pile.push(card));
    });

    this.pile.forEach((card, i) => {
      card.setDepth(this.pile.length - i);
      card.setPosition(xPos, yPos);
    });
  }

  combine(
    c: Card | Card[] | Deck,
    position: Orientation.TOP | Orientation.BOTTOM
  ) {
    if (Array.isArray(c)) {
      while (c.length > 0) {
        this.combine(c.shift(), position);
      }
    } else if (c instanceof Deck) {
      this.combine(c.getCards(), position);
      c.clear();
    } else {
      this.addCardToPile(c, position);
      this.updateCardDepths();
      c.setPosition(this.xPos, this.yPos);
    }
  }

  draw(amount = 1) {
    const drawnCards: Card[] = [];

    if (this.pile.length < 1) return drawnCards;

    for (let x = 0; x < amount; x += 1) {
      const card = this.pile.shift();
      card.draw();
      drawnCards.push(card);
    }

    return drawnCards;
  }

  shuffle() {
    for (let x = this.pile.length - 1; x > 0; x -= 1) {
      const y = Math.floor(Math.random() * (x + 1));
      [this.pile[x], this.pile[y]] = [this.pile[y], this.pile[x]];
    }
    this.updateCardDepths();
  }

  getCards() {
    return Array.from(this.pile);
  }

  clear() {
    this.pile = [];
  }

  setScale(value: number) {
    this.pile.forEach((card) => card.setScale(value));
  }

  private addCardToPile(
    card: Card,
    position: Orientation.TOP | Orientation.BOTTOM
  ) {
    card.discard();

    switch (position) {
      case Orientation.TOP: {
        this.pile = [card, ...this.pile];
        break;
      }
      case Orientation.BOTTOM: {
        this.pile = [...this.pile, card];
        break;
      }
      default:
        break;
    }
  }

  private updateCardDepths() {
    this.pile.forEach((card, i) => card.setDepth(this.pile.length - i));
  }
}

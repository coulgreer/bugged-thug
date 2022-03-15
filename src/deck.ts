import Card from './card';
import CardEntry from './card-entry';
import Orientation from './orientation';

export default class Deck {
  private xPos: number;

  private yPos: number;

  private cardPile: Card[];

  constructor(cardEntries: CardEntry[], xPos: number, yPos: number) {
    this.cardPile = [];
    this.xPos = xPos;
    this.yPos = yPos;

    cardEntries.forEach((entry) => {
      entry.getCards().forEach((card) => this.cardPile.push(card));
    });

    this.cardPile.forEach((card, i) => {
      const container = card.getContainer();
      container.setDepth(this.cardPile.length - i);
      container.setPosition(xPos, yPos);
    });
  }

  private addCardToPile(
    card: Card,
    position: Orientation.TOP | Orientation.BOTTOM
  ) {
    card.discard();

    switch (position) {
      case Orientation.TOP: {
        this.cardPile = [card, ...this.cardPile];
        break;
      }
      case Orientation.BOTTOM: {
        this.cardPile = [...this.cardPile, card];
        break;
      }
      default:
        break;
    }
  }

  private normalizeDepth(
    card: Card,
    position: Orientation.TOP | Orientation.BOTTOM
  ) {
    switch (position) {
      case Orientation.TOP: {
        const sprite = card.getContainer();
        this.normalize();
        sprite.setDepth(this.cardPile.length + 1);
        sprite.setPosition(this.xPos, this.yPos);
        break;
      }
      case Orientation.BOTTOM: {
        const sprite = card.getContainer();
        this.normalize(this.cardPile.length + 1);
        sprite.setDepth(0);
        sprite.setPosition(this.xPos, this.yPos);
        break;
      }
      default:
        break;
    }
  }

  private normalize(startingIndex = this.cardPile.length) {
    this.cardPile.forEach((card, i) => {
      card.getContainer().setDepth(startingIndex - i);
    });
  }

  combine(c: Card | Card[] | Deck, position: Orientation.TOP | Orientation.BOTTOM) {
    if (Array.isArray(c)) {
      c.forEach((card) => this.combine(card, position));
    } else if(c instanceof Deck) {
      const cards = c.getCards();
      this.combine(cards, position);
    } else {
      const container = c.getContainer();
      container.setInteractive();
      this.addCardToPile(c, position);
      this.normalizeDepth(c, position);
    }
  }

  draw(amount = 1) {
    const drawnCards: Card[] = [];

    if (this.cardPile.length < 1) return drawnCards;

    for (let x = 0; x < amount; x += 1) {
      const card = this.cardPile.shift();
      card.draw();
      drawnCards.push(card);
    }

    return drawnCards;
  }

  shuffle() {
    for (let x = this.cardPile.length - 1; x > 0; x -= 1) {
      const y = Math.floor(Math.random() * (x + 1));
      [this.cardPile[x], this.cardPile[y]] = [
        this.cardPile[y],
        this.cardPile[x],
      ];
    }
    this.normalize();
  }

  getCards() {
    return this.cardPile;
  }

  setScale(value: number) {
    this.cardPile.forEach((card) => card.getContainer().setScale(value));
  }
}

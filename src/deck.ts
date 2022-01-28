import Card from './card';
import CardEntry from './card-entry';
import Orientation from './orientation';

export default class Deck {
  xPos: number;

  yPos: number;

  cardEntries: CardEntry[];

  cardPile: Card[];

  constructor(cardEntries: CardEntry[], xPos: number, yPos: number) {
    this.cardEntries = cardEntries;
    this.cardPile = [];
    this.xPos = xPos;
    this.yPos = yPos;

    cardEntries.forEach((entry) => {
      entry.getCards().forEach((card) => {
        this.cardPile.push(card);
      });
    });

    this.cardPile.forEach((card, i) => {
      const sprite = card.getSprite();
      sprite.setDepth(this.cardPile.length - i);
      sprite.setPosition(xPos, yPos);
    });
  }

  combine(c: Card | Card[], position: Orientation.TOP | Orientation.BOTTOM) {
    if (Array.isArray(c)) {
      c.forEach((card) => this.combine(card, position));
    } else {
      c.getSprite().setInteractive();
      this.addCardToPile(c, position);
      this.normalizeDepth(c, position);
    }
  }

  draw(amount = 1) {
    const drawnCards: Card[] = [];

    if (this.cardPile.length < 1) return drawnCards;

    for (let x = 0; x < amount; x += 1) {
      drawnCards.push(this.cardPile.shift());
    }

    drawnCards.forEach((card) => {
      const sprite = card.getSprite();
      sprite.input.enabled = false;
    });

    return drawnCards;
  }

  shuffle() {
    for (let x = this.cardPile.length - 1; x > 0; x -= 1) {
      const y = Math.floor(Math.random() * (x + 1));
      [this.cardPile[x], this.cardPile[y]] = [this.cardPile[y], this.cardPile[x]];
    }
    this.normalize();
  }

  setScale(value: number) {
    this.cardPile.forEach((card) => card.getSprite().setScale(value));
  }

  private addCardToPile(
    card: Card,
    position: Orientation.TOP | Orientation.BOTTOM
  ) {
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

  private addCardToDeck(card: Card) {
    let entry: CardEntry;
    if (this.hasEntry(card)) {
      const target = this.findEntry(card);
      target.increaseCount();
    } else {
      entry = new CardEntry(card, 1);
      this.cardEntries.push(entry);
    }
  }

  private normalizeDepth(
    card: Card,
    position: Orientation.TOP | Orientation.BOTTOM
  ) {
    switch (position) {
      case Orientation.TOP: {
        const sprite = card.getSprite();
        this.normalize();
        sprite.setDepth(this.cardPile.length + 1);
        sprite.setPosition(this.xPos, this.yPos);
        break;
      }
      case Orientation.BOTTOM: {
        const sprite = card.getSprite();
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
      card.getSprite().setDepth(startingIndex - i);
    });
  }

  private hasEntry(card: Card) {
    let hasEntry = false;

    this.cardEntries.every((entry) => {
      if (entry.getCards()[0].getId() === card.getId()) {
        hasEntry = true;
        return false;
      }

      return true;
    });

    return hasEntry;
  }

  private findEntry(card: Card) {
    let target: CardEntry;

    this.cardEntries.every((entry) => {
      if (entry.getCards()[0].getId() === card.getId()) {
        target = entry;
        return false;
      }

      return true;
    });

    return target;
  }
}

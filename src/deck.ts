import Card from './card';
import CardEntry from './card-entry';
import Orientation from './orientation';

export default class Deck {
  xPos: number;

  yPos: number;

  cardEntries: CardEntry[];

  cards: Card[];

  constructor(cardEntries: CardEntry[], xPos: number, yPos: number) {
    this.cardEntries = cardEntries;
    this.cards = [];
    this.xPos = xPos;
    this.yPos = yPos;

    cardEntries.forEach((entry) => {
      entry.getCards().forEach((card) => {
        this.cards.push(card);
      });
    });

    this.cards.forEach((card, i) => {
      const sprite = card.getSprite();
      sprite.setDepth(this.cards.length - i);
      sprite.setPosition(xPos, yPos);
    });
  }

  combine(c: Card | Card[], position: Orientation.TOP | Orientation.BOTTOM) {
    if (Array.isArray(c)) {
      c.forEach((card) => this.combine(card, position));
    } else {
      this.addCard(c, position);
      this.normalizeDepth(c, position);
    }
  }

  draw(amount = 1) {
    const drawnCards: Card[] = [];

    if (this.cards.length < 1) return drawnCards;

    for (let x = 0; x < amount; x += 1) {
      drawnCards.push(this.cards.shift());
    }

    drawnCards.forEach((card) => card.getSprite().setInteractive(false));

    return drawnCards;
  }

  shuffle() {
    for (let x = this.cards.length - 1; x > 0; x -= 1) {
      const y = Math.floor(Math.random() * (x + 1));
      [this.cards[x], this.cards[y]] = [this.cards[y], this.cards[x]];
    }
    this.normalize();
  }

  setScale(value: number) {
    this.cards.forEach((card) => card.getSprite().setScale(value));
  }

  private addCard(card: Card, position: Orientation.TOP | Orientation.BOTTOM) {
    let entry: CardEntry;
    if (this.hasEntry(card)) {
      const target = this.findEntry(card);
      target.increaseCount();
    } else {
      entry = new CardEntry(card, 1);
      switch (position) {
        case Orientation.TOP: {
          this.cardEntries = [entry, ...this.cardEntries];
          break;
        }
        case Orientation.BOTTOM: {
          this.cardEntries = [...this.cardEntries, entry];
          break;
        }
        default:
          break;
      }
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
        sprite.setDepth(this.cards.length + 1);
        sprite.setPosition(this.xPos, this.yPos);
        break;
      }
      case Orientation.BOTTOM: {
        const sprite = card.getSprite();
        this.normalize(this.cards.length + 1);
        sprite.setDepth(0);
        sprite.setPosition(this.xPos, this.yPos);
        break;
      }
      default:
        break;
    }
  }

  private normalize(startingIndex = this.cards.length) {
    this.cards.forEach((card, i) => {
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

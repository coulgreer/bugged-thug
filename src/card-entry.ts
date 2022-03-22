import Card from './card';

export default class CardEntry {
  private card: Card;

  private cards: Card[];

  constructor(card: Card, count: number) {
    if (card === undefined || card === null)
      throw new Error('The Card object cannot be nullish');

    if (count < 1)
      throw new Error('A card entry should have at least 1 card count');

    this.card = card;
    this.cards = [];

    this.cards.push(this.card);
    for (let x = 0; x < count - 1; x += 1) {
      this.cards.push(this.card.clone());
    }
  }

  increaseCount(amount = 1) {
    for (let x = 0; x < amount; x += 1) {
      this.cards.push(this.card.clone());
    }
  }

  decreaseCount(amount = 1) {
    for (let x = 0; x < amount; x += 1) {
      this.cards.pop();
    }
  }

  getCards() {
    return Array.from(this.cards);
  }
}

import Card from './card';

export default class CardEntry {
  card: Card;

  count: number;

  cards: Card[];

  constructor(card: Card, count: number) {
    if (count < 1)
      throw new Error('A card entry should have at least 1 card count');

    this.card = card;
    this.count = count;
    this.cards = [];

    for (let x = 0; x < count; x += 1) {
      this.cards.push({ ...this.card });
    }
  }

  increaseCount(amount = 1) {
    for (let x = 0; x < amount; x += 1) {
      this.cards.push({ ...this.card });
    }
  }

  decreaseCount(amount = 1) {
    for (let x = 0; x < amount; x += 1) {
      this.cards.pop();
    }
  }
}

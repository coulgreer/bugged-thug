import Card, {
  WIDTH as CARD_WIDTH,
  HEIGHT as CARD_HEIGHT,
  SCALE as CARD_SCALE,
} from './card';
import CardEntry from './card-entry';
import Deck from './deck';
import Observer from './observer';
import Orientation from './orientation';

const STARTING_SUSPICION_SCORE = 0;
const STARTING_INTELLIGENCE_SCORE = 0;

export default class Investigator implements Observer {
  private suspicion;

  private intelligence;

  private handPile: Card[];

  private drawPile;

  private discardPile;

  constructor(
    canvasDimensions: { width: number; height: number },
    master: CardEntry[]
  ) {
    this.intelligence = STARTING_INTELLIGENCE_SCORE;
    this.suspicion = STARTING_SUSPICION_SCORE;

    master.forEach((entry) =>
      entry.getCards().forEach((card) => card.addSubscriber(this))
    );
    this.handPile = [];
    this.drawPile = new Deck(
      master,
      (CARD_WIDTH * CARD_SCALE) / 2,
      canvasDimensions.height - (CARD_HEIGHT * CARD_SCALE) / 2
    );
    this.discardPile = new Deck(
      [],
      canvasDimensions.width - (CARD_WIDTH * CARD_SCALE) / 2,
      canvasDimensions.height - (CARD_HEIGHT * CARD_SCALE) / 2
    );
  }

  addToHand(c: Card) {
    this.handPile.push(c);
  }

  reset() {
    this.intelligence = STARTING_INTELLIGENCE_SCORE;
    this.suspicion = STARTING_SUSPICION_SCORE;
    this.drawPile.combine(this.discardPile, Orientation.TOP);
    this.drawPile.combine(this.handPile, Orientation.TOP);
  }

  increaseIntelligence(intel: number) {
    this.intelligence += intel;
  }

  increaseSuspicion(suspicion: number) {
    this.suspicion += suspicion;
  }

  getIntelligence() {
    return this.intelligence;
  }

  getSuspicion() {
    return this.suspicion;
  }

  update(card: Card) {
    this.increaseIntelligence(card.getIntelligenceModifier());
    this.increaseSuspicion(card.getSuspicionModifier());

    if (this.handPile.includes(card)) {
      this.handPile.some((c, index) => {
        const found = c === card;

        if (found) {
          const [removedCard] = this.handPile.splice(index, 1);
          this.discardPile.combine(removedCard, Orientation.TOP);
          removedCard.setVisible(false);
        }

        return found;
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isEqual(obj: any): boolean {
    if (obj instanceof Investigator) return true;

    return false;
  }

  getHandPile() {
    return Array.from(this.handPile);
  }

  getDrawPile() {
    return this.drawPile;
  }

  getDiscardPile() {
    return this.discardPile;
  }
}

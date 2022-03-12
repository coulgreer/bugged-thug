import Observer from './observer';

const STARTING_SUSPICION_SCORE = 0;
const STARTING_INTELLIGENCE_SCORE = 0;

export default class Player implements Observer {
  private suspicion;

  private intelligence;

  constructor() {
    this.intelligence = STARTING_INTELLIGENCE_SCORE;
    this.suspicion = STARTING_SUSPICION_SCORE;
  }

  reset() {
    this.intelligence = STARTING_INTELLIGENCE_SCORE;
    this.suspicion = STARTING_SUSPICION_SCORE;
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

  update(intel: number, suspicion: number) {
    this.intelligence += intel;
    this.suspicion += suspicion;
  }

  // eslint-disable-next-line class-methods-use-this
  isEqual(obj: any): boolean {
    if (obj instanceof Player) return true;

    return false;
  }
}

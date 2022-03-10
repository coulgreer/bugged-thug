const STARTING_SUSPICION_SCORE = 0;
const STARTING_INTELLIGENCE_SCORE = 0;

export default class Player {
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
}

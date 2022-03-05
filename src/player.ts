export default class Player {
  private suspicion;

  private intelligence;

  constructor() {
    this.suspicion = 0;
    this.intelligence = 0;
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
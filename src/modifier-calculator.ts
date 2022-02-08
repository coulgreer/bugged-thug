import Modifier from './modifier';

export default class ModifierCalculator implements Modifier {
  intelModifier: number | [number, number];

  suspicionModifier: number | [number, number];

  constructor(
    intelModifier: number | [number, number],
    suspicionModifier: number | [number, number]
  ) {
    this.intelModifier = intelModifier;
    this.suspicionModifier = suspicionModifier;
  }

  modifyIntel(intel: number) {
    if (Array.isArray(this.intelModifier)) {
      const min = Math.min(this.intelModifier[0], this.intelModifier[1]);
      const max = Math.max(this.intelModifier[0], this.intelModifier[1]);
      const value = Math.floor(Math.random() * (max - min + 1) + min);

      return intel + value;
    }

    return intel + this.intelModifier;
  }

  modifySuspicion(suspicion: number) {
    if (Array.isArray(this.suspicionModifier)) {
      const min = Math.min(
        this.suspicionModifier[0],
        this.suspicionModifier[1]
      );
      const max = Math.max(
        this.suspicionModifier[0],
        this.suspicionModifier[1]
      );
      const value = Math.floor(Math.random() * (max - min + 1) + min);

      return suspicion + value;
    }

    return suspicion + this.suspicionModifier;
  }
}

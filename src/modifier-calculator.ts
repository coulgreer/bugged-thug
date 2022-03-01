import Keyword from './keyword';
import Modifier from './modifier';
import { MODIFIER_INDEX, QUANTIFIER_INDEX, SUBJECT_INDEX } from './parser';

export default class ModifierCalculator implements Modifier {
  intelModifier: number | [number, number];

  suspicionModifier: number | [number, number];

  constructor(instruction: [Keyword, string, Keyword]) {
    let magnitude;
    switch (instruction[MODIFIER_INDEX]) {
      case Keyword.GAIN:
        magnitude = 1;
        break;
      case Keyword.LOSE:
        magnitude = -1;
        break;
      default:
        throw new Error();
    }

    const matches = instruction[QUANTIFIER_INDEX].match(/\d+-\d+/);
    const hasRange = matches.length > 0;
    const modifier: number | [number, number] = hasRange
      ? [
          magnitude * Number.parseInt(matches[0], 10),
          magnitude * Number.parseInt(matches[1], 10),
        ]
      : magnitude * Number.parseInt(instruction[QUANTIFIER_INDEX], 10);

    const subject = instruction[SUBJECT_INDEX];

    this.intelModifier = subject === Keyword.GAIN ? modifier : 0;
    this.suspicionModifier = subject === Keyword.SUSPICION ? modifier : 0;
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

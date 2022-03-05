import Keyword from './keyword';
import Modifier from './modifier';
import { MODIFIER_INDEX, QUANTIFIER_INDEX, SUBJECT_INDEX } from './parser';

export default class ModifierCalculator implements Modifier {
  intelModifier: number | [number, number];

  suspicionModifier: number | [number, number];

  constructor(instructions: [Keyword, string, Keyword][]) {
    const instruction: [Keyword, string, Keyword] =
      instructions.length > 0
        ? instructions[0]
        : [Keyword.GAIN, '0', Keyword.INTELLIGENCE];

    const magnitude = ModifierCalculator.getMagnitude(
      instruction[MODIFIER_INDEX]
    );
    const modifier = ModifierCalculator.getModifier(
      magnitude,
      instruction[QUANTIFIER_INDEX]
    );

    const subject = instruction[SUBJECT_INDEX];

    this.intelModifier = subject === Keyword.GAIN ? modifier : 0;
    this.suspicionModifier = subject === Keyword.SUSPICION ? modifier : 0;
  }

  private static getMagnitude(keyword: Keyword) {
    switch (keyword) {
      case Keyword.GAIN:
        return 1;
      case Keyword.LOSE:
        return -1;
      default:
        throw new Error();
    }
  }

  private static getModifier(
    magnitude: number,
    str: string
  ): number | [number, number] {
    const matches = str.match(/\d+-\d+/);
    const hasRange = matches && matches.length > 0;

    if (hasRange) {
      return [
        magnitude * Number.parseInt(matches[0], 10),
        magnitude * Number.parseInt(matches[1], 10),
      ];
    }

    return magnitude * Number.parseInt(str, 10);
  }

  getIntelligenceModifier() {
    if (Array.isArray(this.intelModifier)) {
      const min = Math.min(this.intelModifier[0], this.intelModifier[1]);
      const max = Math.max(this.intelModifier[0], this.intelModifier[1]);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return this.intelModifier;
  }

  getSuspicionModifier() {
    if (Array.isArray(this.suspicionModifier)) {
      const min = Math.min(
        this.suspicionModifier[0],
        this.suspicionModifier[1]
      );
      const max = Math.max(
        this.suspicionModifier[0],
        this.suspicionModifier[1]
      );
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return this.suspicionModifier;
  }
}

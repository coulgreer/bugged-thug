import Keyword from './keyword';

export const MODIFIER_INDEX = 0;
export const QUANTIFIER_INDEX = 1;
export const SUBJECT_INDEX = 2;

export default class Parser {
  rawText;

  sanitizedText;

  instructions;

  private static sanitizeText(text: string) {
    let sanitizedText = text.replace(/(?<!\\)[<>]/g, '');
    sanitizedText = sanitizedText.replace(/\\</, '<');
    sanitizedText = sanitizedText.replace(/\\>/, '>');
    return sanitizedText;
  }

  private static parseContext(context: RegExpMatchArray) {
    const instructions: [Keyword, string, Keyword][] = [];

    if (!context) return instructions;

    context.forEach((match) => {
      instructions.push([
        Parser.findModifier(match),
        Parser.findQuantifier(match)[0],
        Parser.findSubject(match),
      ]);
    });

    return instructions;
  }

  private static findModifier(text: string) {
    const hasPositiveModifier =
      text.match(new RegExp(Keyword.GAIN, 'i'))?.length > 0;
    const hasNegativeModifier =
      text.match(new RegExp(Keyword.LOSE, 'i'))?.length > 0;

    if (hasPositiveModifier) return Keyword.GAIN;

    if (hasNegativeModifier) return Keyword.LOSE;

    throw Error('A modifier keyword was not found.');
  }

  private static findQuantifier(text: string) {
    return text.match(/\d+(-\d+)?/);
  }

  private static findSubject(text: string) {
    const isIntelligence =
      text.match(new RegExp(Keyword.INTELLIGENCE, 'i'))?.length > 0;
    const isSuspicion =
      text.match(new RegExp(Keyword.SUSPICION, 'i'))?.length > 0;

    if (isIntelligence) return Keyword.INTELLIGENCE;

    if (isSuspicion) return Keyword.SUSPICION;

    throw Error('A subject keyword was not found.');
  }

  constructor(text: string) {
    this.rawText = text;
    this.sanitizedText = Parser.sanitizeText(text);

    const regex = new RegExp(
      `(?<=<.*)(${Keyword.GAIN}|${Keyword.LOSE}) \\d+(-\\d+)? (${Keyword.INTELLIGENCE}|${Keyword.SUSPICION})(?=.*>)`,
      'gi'
    );
    const context = text.match(regex);

    this.instructions = Parser.parseContext(context);
  }
}

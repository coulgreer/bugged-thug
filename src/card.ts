import Displayable from './displayable';
import Modifier from './modifier';
import Orientation from './orientation';

export default interface Card extends Modifier, Displayable {
  getId(): string;
  flip(): void;
  setOrientation(o: Orientation): void;
  clone(): Card;
}

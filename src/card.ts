import Displayable from './displayable';
import Modifier from './modifier';
import Orientation from './orientation';

export default interface Card extends Modifier, Displayable {
  flip(): void;
  setOrientation(o: Orientation): void;
}

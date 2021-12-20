import Orientation from './orientation';

export default interface Displayable {
  getTitle(): string;
  flip(): void;
  setOrientation(o: Orientation): void;
}

import Displayable from './displayable';
import Modifier from './modifier';
import Orientation from './orientation';

export const WIDTH = 210;
export const HEIGHT = 280;
export const SCALE = 0.6;

export default interface Card extends Modifier, Displayable {
  getId(): string;
  getContainer(): Phaser.GameObjects.Container;
  isDrawn(): boolean;
  flip(): void;
  play(): void;
  draw(): void;
  discard(): void;
  setOrientation(o: Orientation): void;
  clone(): Card;
}

import Modifier from './modifier';
import type Observer from './observer';
import Orientation from './orientation';

export const WIDTH = 210;
export const HEIGHT = 280;
export const SCALE = 0.6;

export default interface Card extends Modifier {
  getId(): string;
  setVisible(isVisible: boolean): void;
  setPosition(
    x?: number,
    y?: number,
    z?: number,
    w?: number
  ): Phaser.GameObjects.Container;
  setDepth(depth: number): Phaser.GameObjects.Container;
  setScale(value: number): Phaser.GameObjects.Container;
  setInteractive(
    hitArea?: Phaser.Types.Input.InputConfiguration | any,
    callback?: Phaser.Types.Input.HitAreaCallback,
    dropZone?: boolean
  ): Phaser.GameObjects.Container;
  isDrawn(): boolean;
  flip(): void;
  play(): void;
  draw(): void;
  discard(): void;
  setOrientation(o: Orientation): void;
  addSubscriber(observer: Observer): void;
  removeSubscriber(observer: Observer): void;
  notify(): void;
  clone(): Card;
}

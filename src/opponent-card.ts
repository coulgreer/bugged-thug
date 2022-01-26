import { nanoid } from 'nanoid';

import Card from './card';
import Orientation from './orientation';

export default class OpponentCard
  extends Phaser.GameObjects.Sprite
  implements Card
{
  private id;

  private title;

  private frontImage;

  private backImage;

  private intelModifier;

  private suspicionModifier;

  private isFlipped;

  constructor(
    scene: Phaser.Scene,
    title: string,
    frontImage: string,
    intelModifier: number,
    suspicionModifier: number,
    backImage = 'card-back',
    x = 0,
    y = 0,
    isFlipped = false
  ) {
    super(scene, x, y, backImage);

    scene.add.existing(this);
    this.setOrigin(0, 0);
    this.setInteractive();

    this.id = nanoid();
    this.title = title;
    this.frontImage = frontImage;
    this.backImage = backImage;
    this.intelModifier = intelModifier;
    this.suspicionModifier = suspicionModifier;
    this.isFlipped = isFlipped;
  }

  flip() {
    this.isFlipped = !this.isFlipped;

    if (this.isFlipped) {
      this.setTexture(this.frontImage);
    } else {
      this.setTexture(this.backImage);
    }
  }

  setOrientation(o: Orientation) {
    switch (o) {
      case Orientation.FRONT:
        this.isFlipped = true;
        this.setTexture(this.frontImage);
        break;
      case Orientation.BACK:
        this.isFlipped = false;
        this.setTexture(this.backImage);
        break;
      default:
        break;
    }
  }

  modifyIntel(intel: number) {
    return intel + this.intelModifier;
  }

  modifySuspicion(suspicion: number) {
    return suspicion + this.suspicionModifier;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return `${this.title}: This is a placeholder for the cards description.`;
  }

  getId() {
    return `CO${this.id}`;
  }

  // eslint-disable-next-line class-methods-use-this
  clone() {
    return new OpponentCard(
      this.scene,
      this.title,
      this.frontImage,
      this.intelModifier,
      this.suspicionModifier,
      this.backImage,
      this.x,
      this.y,
      this.isFlipped
    );
  }
}

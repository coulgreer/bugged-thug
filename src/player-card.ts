import { nanoid } from 'nanoid';

import Card, { WIDTH as CARD_WIDTH, HEIGHT as CARD_HEIGHT } from './card';
import Orientation from './orientation';

export default class PlayerCard
  extends Phaser.GameObjects.Container
  implements Card
{
  private id;

  private backStyle;

  private title;

  private effect;

  private image;

  private intelModifier;

  private suspicionModifier;

  private front: Phaser.GameObjects.Container;

  private back: Phaser.GameObjects.Sprite;

  private isFlipped;

  constructor(
    scene: Phaser.Scene,
    title: string,
    effect: string,
    image: string,
    intelModifier: number,
    suspicionModifier: number,
    backStyle = 'card-back',
    x = 0,
    y = 0,
    isFlipped = false
  ) {
    super(scene, x, y);

    this.id = nanoid();
    this.title = title;
    this.effect = effect;
    this.image = image;
    this.backStyle = backStyle;
    this.intelModifier = intelModifier;
    this.suspicionModifier = suspicionModifier;
    this.isFlipped = isFlipped;

    this.setSize(CARD_WIDTH, CARD_WIDTH);
    this.setInteractive();
    this.on('pointerdown', () => this.flip());
    scene.add.existing(this);

    this.renderBack(scene, x, y, backStyle);
    this.renderFront(scene, x, y, title, effect, image);

    this.add([this.back, this.front]);
    this.bringToTop(this.back);
  }

  private renderBack(
    scene: Phaser.Scene,
    x: number,
    y: number,
    backStyle: string
  ) {
    this.back = scene.add.sprite(x, y, backStyle);
  }

  private renderFront(
    scene: Phaser.Scene,
    xContainer: number,
    yContainer: number,
    title: string,
    effect: string,
    image: string
  ) {
    const xChild = CARD_WIDTH / 2;
    const yChild = CARD_HEIGHT / 4;
    const padding = 10;
    const frame = scene.add.sprite(0, 0, 'player-frame');

    const name = scene.add.text(-xChild + padding, 0, title);
    name.setColor('black');
    name.setWordWrapWidth(CARD_WIDTH - padding * 2);
    name.setPadding(padding);
    const nameHeight =
      name.lineSpacing === 0 ? name.height - padding : name.lineSpacing;

    const text = scene.add.text(-xChild + padding, nameHeight, effect);
    text.setColor('black');
    text.setWordWrapWidth(CARD_WIDTH - padding * 2);
    text.setPadding(padding);

    const imageSprite = scene.add.sprite(0, -yChild + padding, image);

    this.front = scene.add.container(xContainer, yContainer, [
      frame,
      imageSprite,
      name,
      text,
    ]);
  }

  flip() {
    this.isFlipped = !this.isFlipped;

    if (this.isFlipped) {
      this.bringToTop(this.front);
    } else {
      this.bringToTop(this.back);
    }
  }

  setOrientation(o: Orientation) {
    switch (o) {
      case Orientation.FRONT:
        this.isFlipped = true;
        this.bringToTop(this.front);
        break;
      case Orientation.BACK:
        this.isFlipped = false;
        this.bringToTop(this.back);
        break;
      default:
        break;
    }
  }

  getContainer() {
    return this;
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
    return `CP${this.id}`;
  }

  // eslint-disable-next-line class-methods-use-this
  clone() {
    return new PlayerCard(
      this.scene,
      this.title,
      this.effect,
      this.image,
      this.intelModifier,
      this.suspicionModifier,
      this.backStyle,
      this.x,
      this.y,
      this.isFlipped
    );
  }
}

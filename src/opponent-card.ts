import { nanoid } from 'nanoid';

import Card, { WIDTH as CARD_WIDTH, HEIGHT as CARD_HEIGHT } from './card';
import CardDisplayManager from './card-display-manager';
import ModifierCalculator from './modifier-calculator';
import Orientation from './orientation';
import Parser from './parser';

export default class OpponentCard
  extends Phaser.GameObjects.Container
  implements Card
{
  private id;

  private backStyle;

  private title;

  private effect;

  private image;

  private front: Phaser.GameObjects.Container;

  private back: Phaser.GameObjects.Sprite;

  private displayManager;

  private calculator;

  private parser;

  constructor(
    scene: Phaser.Scene,
    title: string,
    effect: string,
    image: string,
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

    this.parser = new Parser(effect);
    this.calculator = new ModifierCalculator(this.parser.instructions);

    scene.add.existing(this);

    this.renderBack(scene, x, y, backStyle);
    this.renderFront(scene, x, y, title, this.parser.sanitizedText, image);
    this.add([this.back, this.front]);
    this.displayManager = new CardDisplayManager(
      this,
      this.front,
      this.back,
      isFlipped
    );
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
    const frame = scene.add.sprite(0, 0, 'opponent-frame');

    const name = scene.add.text(-xChild, 0, title);
    name.setWordWrapWidth(CARD_WIDTH - padding * 2);
    name.setPadding(padding);
    const nameHeight =
      name.lineSpacing === 0 ? name.height - padding : name.lineSpacing;

    const text = scene.add.text(-xChild, nameHeight, effect);
    text.setWordWrapWidth(CARD_WIDTH - padding * 2);
    text.setPadding(padding);

    const imageSprite = scene.add.sprite(0, -yChild, image);

    this.front = scene.add.container(xContainer, yContainer, [
      frame,
      imageSprite,
      name,
      text,
    ]);
  }

  getIntelligenceModifier() {
    return this.calculator.getIntelligenceModifier();
  }

  getSuspicionModifier() {
    return this.calculator.getSuspicionModifier();
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

  getContainer() {
    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  isDrawn() {
    return true;
  }

  flip() {
    this.displayManager.flip();
  }

  play() {
    this.displayManager.setShown(false);
  }
  
  draw() {
    this.displayManager.setShown(true);
  }
  
  discard() {
    this.displayManager.setShown(false);
  }

  setOrientation(o: Orientation) {
    this.displayManager.setOrientation(o);
  }

  // eslint-disable-next-line class-methods-use-this
  clone() {
    return new OpponentCard(
      this.scene,
      this.title,
      this.effect,
      this.image,
      this.backStyle,
      this.x,
      this.y
    );
  }
}

import { nanoid } from 'nanoid';

import Card, { WIDTH as CARD_WIDTH, HEIGHT as CARD_HEIGHT } from './card';
import CardDisplayManager from './card-display-manager';
import ModifierCalculator from './modifier-calculator';
import Observer from './observer';
import Orientation from './orientation';
import Parser from './parser';

export default class InvestigatorCard
  extends Phaser.GameObjects.Container
  implements Card
{
  private id;

  private backStyle;

  private title;

  private effect;

  private image;

  private drawn;

  private front: Phaser.GameObjects.Container;

  private back: Phaser.GameObjects.Sprite;

  private displayManager;

  private calculator;

  private parser;

  private subscribers: Observer[];

  constructor(
    scene: Phaser.Scene,
    title: string,
    effect: string,
    image: string,
    backStyle = 'card-back',
    x = 0,
    y = 0,
    isFlipped = false,
    drawn = false
  ) {
    super(scene, x, y);

    this.id = nanoid();
    this.title = title;
    this.effect = effect;
    this.image = image;
    this.backStyle = backStyle;
    this.drawn = drawn;

    this.parser = new Parser(effect);
    this.calculator = new ModifierCalculator(this.parser.instructions);

    this.subscribers = [];

    this.setSize(CARD_WIDTH, CARD_WIDTH);
    this.setInteractive();
    this.on('pointerdown', () => {
      if (this.drawn) {
        this.play();
      } else {
        this.flip();
      }
    });
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
    const frame = scene.add.sprite(0, 0, 'investigator-frame');

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

  getIntelligenceModifier() {
    return this.calculator.getIntelligenceModifier();
  }

  getSuspicionModifier() {
    return this.calculator.getSuspicionModifier();
  }

  getId() {
    return `CP${this.id}`;
  }

  isDrawn() {
    return this.drawn;
  }

  flip() {
    this.displayManager.flip();
  }

  play() {
    this.drawn = false;
    this.displayManager.setShown(false);
    this.notify();
  }

  draw() {
    this.drawn = true;
  }

  discard() {
    this.drawn = false;
    this.displayManager.setShown(true);
  }

  setOrientation(o: Orientation) {
    this.displayManager.setOrientation(o);
  }

  addSubscriber(observer: Observer) {
    this.subscribers.push(observer);
  }

  removeSubscriber(observer: Observer) {
    const index = this.subscribers.findIndex((o) => o.isEqual(observer));
    this.subscribers.splice(index);
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber.update(this));
  }

  clone() {
    const clone = new InvestigatorCard(
      this.scene,
      this.title,
      this.effect,
      this.image,
      this.backStyle,
      this.x,
      this.y
    );
    this.subscribers.forEach((subscriber) => clone.addSubscriber(subscriber));
    return clone;
  }
}

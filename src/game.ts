import * as Phaser from 'phaser';

import Compendium from './compendium';
import Card from './card';

import cardBackImage from './images/card-back.png';
import Orientation from './orientation';
import Deck from './deck';
import CardEntry from './card-entry';

const cardBackName = 'card-back';
const cardWidth = 210;
const cardHeight = 280;
const cardScale = 0.6;

const canvasWidth = cardWidth * cardScale * 10;
const canvasHeight = cardHeight * cardScale * 3;

class Scene extends Phaser.Scene {
  static xDraw = 0;

  keyR: Phaser.Input.Keyboard.Key;

  keyS: Phaser.Input.Keyboard.Key;

  keyD: Phaser.Input.Keyboard.Key;

  keySpace: Phaser.Input.Keyboard.Key;

  compendium: Compendium;

  playerDeck: Deck;

  playerHand: Card[] = [];

  opponentDeck: Deck;

  static deal(cards: Card[], y = 0) {
    const padding = 3;
    let x = 0;

    cards.forEach((card) => {
      card.setOrientation(Orientation.FRONT);
      card.getSprite().setPosition(x, y);

      x = x + padding + cardWidth * cardScale;
    });
  }

  draw() {
    const padding = 3;
    const cards = this.playerDeck.draw();

    cards.forEach((card) => {
      Scene.xDraw += cardWidth * cardScale + padding;
      card.setOrientation(Orientation.FRONT);
      card
        .getSprite()
        .setPosition(Scene.xDraw, canvasHeight - cardHeight * cardScale);
      this.playerHand.push(card);
    });
  }

  preload() {
    this.load.image(cardBackName, cardBackImage);
  }

  create() {
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.compendium = new Compendium(this);

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.playerDeck = this.createPlayerDeck();
      this.playerDeck.setScale(cardScale);

      this.opponentDeck = this.createOpponentDeck();
      this.opponentDeck.setScale(cardScale);
      Scene.deal(this.opponentDeck.cardPile);
    });

    this.load.start();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      this.opponentDeck.cardPile.forEach((card) => card.flip());
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyD)) this.draw();

    if (Phaser.Input.Keyboard.JustDown(this.keyS)) this.playerDeck.shuffle();

    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.playerDeck.combine(this.playerHand, Orientation.TOP);
      this.playerHand = [];
      Scene.xDraw = 0;
    }
  }

  private createPlayerDeck() {
    const entries = this.compendium
      .getPlayerCards()
      .map((card) => new CardEntry(card, 3));

    return new Deck(entries, 0, canvasHeight - cardHeight * cardScale);
  }

  private createOpponentDeck() {
    const entries = this.compendium
      .getOpponentCards()
      .map((card) => new CardEntry(card, 1));

    return new Deck(entries, 0, 0);
  }
}

const config = {
  type: Phaser.AUTO,
  width: canvasWidth,
  height: canvasHeight,
  scene: [Scene],
  backgroundColor: 'E75480',
};

export default new Phaser.Game(config);

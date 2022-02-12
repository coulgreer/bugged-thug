import * as Phaser from 'phaser';

import Compendium from './compendium';
import Card, {
  WIDTH as CARD_WIDTH,
  HEIGHT as CARD_HEIGHT,
  SCALE as CARD_SCALE,
} from './card';

import cardBackImage from './images/card-back.png';
import Orientation from './orientation';
import Deck from './deck';
import CardEntry from './card-entry';

const cardBackName = 'card-back';

const canvasWidth = CARD_WIDTH * CARD_SCALE * 10;
const canvasHeight = CARD_HEIGHT * CARD_SCALE * 3;

class Scene extends Phaser.Scene {
  static xDraw = (CARD_WIDTH * CARD_SCALE) / 2;

  keyR: Phaser.Input.Keyboard.Key;

  keyS: Phaser.Input.Keyboard.Key;

  keyD: Phaser.Input.Keyboard.Key;

  keySpace: Phaser.Input.Keyboard.Key;

  intel: number;

  intelScore: Phaser.GameObjects.Text;

  suspicion: number;

  suspicionScore: Phaser.GameObjects.Text;

  compendium: Compendium;

  playerDeck: Deck;

  playerHand: Card[] = [];

  opponentDeck: Deck;

  static deal(cards: Card[], y = (CARD_HEIGHT * CARD_SCALE) / 2) {
    const padding = 3;
    let x = (CARD_WIDTH * CARD_SCALE) / 2;

    cards.forEach((card) => {
      card.setOrientation(Orientation.FRONT);
      card.getContainer().setPosition(x, y);

      x = x + padding + CARD_WIDTH * CARD_SCALE;
    });
  }

  draw() {
    const padding = 3;
    const cards = this.playerDeck.draw();

    cards.forEach((card) => {
      Scene.xDraw += CARD_WIDTH * CARD_SCALE + padding;
      card.setOrientation(Orientation.FRONT);
      card
        .getContainer()
        .setPosition(
          Scene.xDraw,
          canvasHeight - (CARD_HEIGHT * CARD_SCALE) / 2
        );
      this.playerHand.push(card);
    });
  }

  preload() {
    this.load.image(cardBackName, cardBackImage);

    this.intel = 0;
    this.suspicion = 0;
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
      this.playerDeck.setScale(CARD_SCALE);

      this.opponentDeck = this.createOpponentDeck();
      this.opponentDeck.setScale(CARD_SCALE);
      Scene.deal(this.opponentDeck.cardPile);
    });

    this.load.start();
  }

  update() {
    let y = CARD_HEIGHT * CARD_SCALE * 1.5;
    this.intelScore = this.add.text(10, y, `Intel: ${this.intel}`);
    y += this.intelScore.height;
    this.suspicionScore = this.add.text(10, y, `Suspicion: ${this.suspicion}`);

    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      this.opponentDeck.cardPile.forEach((card) => card.flip());
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyD)) this.draw();

    if (Phaser.Input.Keyboard.JustDown(this.keyS)) this.playerDeck.shuffle();

    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.playerDeck.combine(this.playerHand, Orientation.TOP);
      this.playerHand = [];
      Scene.xDraw = (CARD_WIDTH * CARD_SCALE) / 2;
    }
  }

  private createPlayerDeck() {
    const entries = this.compendium
      .getPlayerCards()
      .map((card) => new CardEntry(card, 3));

    return new Deck(
      entries,
      (CARD_WIDTH * CARD_SCALE) / 2,
      canvasHeight - (CARD_HEIGHT * CARD_SCALE) / 2
    );
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

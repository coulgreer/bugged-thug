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
import Player from './player';

const cardBackName = 'card-back';

const canvasWidth = CARD_WIDTH * CARD_SCALE * 10;
const canvasHeight = CARD_HEIGHT * CARD_SCALE * 3;
const dimensions = { width: canvasWidth, height: canvasHeight };

class Scene extends Phaser.Scene {
  private static xDraw = (CARD_WIDTH * CARD_SCALE) / 2;

  private keyR: Phaser.Input.Keyboard.Key;

  private keyS: Phaser.Input.Keyboard.Key;

  private keyD: Phaser.Input.Keyboard.Key;

  private keySpace: Phaser.Input.Keyboard.Key;

  private player: Player;

  private intelText: Phaser.GameObjects.Text;

  private suspicionText: Phaser.GameObjects.Text;

  private compendium: Compendium;

  private playerDeck: Deck;

  private opponentDeck: Deck;

  private static deal(cards: Card[], y = (CARD_HEIGHT * CARD_SCALE) / 2) {
    const padding = 3;
    let x = (CARD_WIDTH * CARD_SCALE) / 2;

    cards.forEach((card) => {
      card.setOrientation(Orientation.FRONT);
      card.getContainer().setPosition(x, y);

      x = x + padding + CARD_WIDTH * CARD_SCALE;
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
    this.renderScore();

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.player = new Player(dimensions, this.createPlayerDeck());
      this.playerDeck = this.player.getDrawPile();
      this.playerDeck.setScale(CARD_SCALE);

      this.opponentDeck = this.createOpponentDeck();
      this.opponentDeck.setScale(CARD_SCALE);
      Scene.deal(this.opponentDeck.getCards());
    });

    this.load.start();
  }

  update() {
    this.intelText.setText(this.getIntelligenceText());
    this.suspicionText.setText(this.getSuspicionText());

    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      this.opponentDeck.getCards().forEach((card) => card.flip());
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyD)) this.draw();

    if (Phaser.Input.Keyboard.JustDown(this.keyS)) this.playerDeck.shuffle();

    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.player.reset();
      Scene.xDraw = (CARD_WIDTH * CARD_SCALE) / 2;
    }
  }

  private draw() {
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
      card.draw();
      this.player.getHandPile().push(card);
    });
  }

  private renderScore() {
    const padding = 10;
    let y = CARD_HEIGHT * CARD_SCALE * 1.5;

    this.intelText = this.add.text(0, y, this.getIntelligenceText());
    this.intelText.setPadding(padding);

    y += this.intelText.height - padding * 2;

    this.suspicionText = this.add.text(0, y, this.getSuspicionText());
    this.suspicionText.setPadding(padding);
  }

  private createPlayerDeck() {
    return this.compendium
      .getPlayerCards()
      .map((card) => new CardEntry(card, 3));
  }

  private createOpponentDeck() {
    const entries = this.compendium.getOpponentCards().map((card) => {
      card.addSubscriber(this.player);
      return new CardEntry(card, 1);
    });

    return new Deck(entries, 0, 0);
  }

  private getIntelligenceText() {
    return `Intel: ${this.player?.getIntelligence() ?? 0}`;
  }

  private getSuspicionText() {
    return `Suspicion: ${this.player?.getSuspicion() ?? 0}`;
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

import * as Phaser from 'phaser';

import Compendium from './compendium';
import PlayerCard from './player-card';
import OpponentCard from './opponent-card';

import cardBackImage from './images/card-back.png';
import Orientation from './orientation';

const cardBackName = 'card-back';
const cardWidth = 210;
const cardHeight = 280;
const cardScale = 0.6;

class Scene extends Phaser.Scene {
  compendium: Compendium;

  playerCards: PlayerCard[];

  opponentCards: OpponentCard[];

  static deal(cards: (OpponentCard | PlayerCard)[], yOffset = 0) {
    const padding = 3;
    let x = 0;
    const y = 0 + yOffset;

    cards.forEach((card) => {
      card.setScale(cardScale);
      card.setPosition(x, y);
      card.setOrientation(Orientation.FRONT);

      x = x + padding + cardWidth * cardScale;
    });
  }

  preload() {
    this.load.image(cardBackName, cardBackImage);
  }

  create() {
    this.compendium = new Compendium(this);

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.playerCards = this.compendium.getPlayerCards();
      this.opponentCards = this.compendium.getOpponentCards();

      Scene.deal(this.playerCards);
      Scene.deal(this.opponentCards, cardHeight * cardScale);
    });
  }

  update() {
    this.input.keyboard.on('keydown-SPACE', () =>
      this.opponentCards.forEach((card) => card.flip())
    );
  }
}

const config = {
  type: Phaser.AUTO,
  width: cardWidth * cardScale * 4,
  height: cardHeight * cardScale * 3,
  scene: [Scene],
  backgroundColor: 'E75480',
};

export default new Phaser.Game(config);

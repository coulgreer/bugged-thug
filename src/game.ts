import * as Phaser from 'phaser';

import Card from './card';
import Compendium from './compendium';

import cardBackImage from './images/card-back.png';
import Orientation from './orientation';

const cardBackName = 'card-back';
const chitChatName = 'chit-chat';
const cardWidth = 210;
const cardHeight = 280;
const cardScale = 0.6;

class Scene extends Phaser.Scene {
  compendium: Compendium;

  testCard: Card;

  preload() {
    this.load.image(cardBackName, cardBackImage);
  }

  create() {
    this.compendium = new Compendium(this);

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      const playerCards = this.compendium.getPlayerCards();
      const opponentCards = this.compendium.getOpponentCards();

      Scene.dealCards(playerCards);
      Scene.dealCards(opponentCards, cardHeight * cardScale);

      this.testCard = new Card(
        this,
        'Test Card',
        chitChatName,
        0,
        1,
        cardBackName,
        0,
        cardHeight * cardScale * 2
      );
    });
  }

  update() {
    this.input.keyboard.on(
      'keydown-SPACE',
      () => this.testCard.flip(),
      this.testCard
    );
  }

  static dealCards(cards: Card[], yOffset = 0) {
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
}

const config = {
  type: Phaser.AUTO,
  width: cardWidth * 2,
  height: cardHeight * cardScale * 2 + cardHeight,
  scene: [Scene],
  backgroundColor: 'E75480',
};

export default new Phaser.Game(config);

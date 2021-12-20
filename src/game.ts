import * as Phaser from 'phaser';

import Card from './card';

import cardBackImage from './images/card-back.png';
import chitChatImage from './images/chit-chat.png';
import prodImage from './images/prod.png';
import smallTalkImage from './images/small-talk.png';
import suspectImage from './images/suspect.png';
import thinkImage from './images/think.png';

const cardBackName = 'card-back';
const chitChatName = 'chit-chat';

class Scene extends Phaser.Scene {
  testCard: Card;

  preload() {
    this.load.image(cardBackName, cardBackImage);
    this.load.image(chitChatName, chitChatImage);
    this.load.image('prod', prodImage);
    this.load.image('small-talk', smallTalkImage);
    this.load.image('suspect', suspectImage);
    this.load.image('think', thinkImage);
  }

  create() {
    this.testCard = new Card(
      this,
      'Test Card',
      chitChatName,
      0,
      1,
      cardBackName,
      210,
      280
    );
  }

  update() {
    this.input.keyboard.on(
      'keydown-SPACE',
      () => this.testCard.flip(),
      this.testCard
    );
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Scene],
};

export default new Phaser.Game(config);

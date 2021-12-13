import * as Phaser from 'phaser';
import cardBackImage from './images/card-back.png';
import chitChatImage from './images/chit-chat.png';
import prodImage from './images/prod.png';
import smallTalkImage from './images/small-talk.png';
import suspectImage from './images/suspect.png';
import thinkImage from './images/think.png';

const cardBackName = 'card-back';

class Scene extends Phaser.Scene {
  preload() {
    this.load.image(cardBackName, cardBackImage);
    this.load.image('chit-chat', chitChatImage);
    this.load.image('prod', prodImage);
    this.load.image('small-talk', smallTalkImage);
    this.load.image('suspect', suspectImage);
    this.load.image('think', thinkImage);
  }

  create() {
    this.add.image(210, 280, cardBackName);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Scene],
};

export default new Phaser.Game(config);

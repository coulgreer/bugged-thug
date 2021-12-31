import { Scene } from 'phaser';

import Card from './card';

import playerCard1Image from './images/prod.png';
import playerCard2Image from './images/small-talk.png';

import opponentCard1Image from './images/chit-chat.png';
import opponentCard2Image from './images/suspect.png';
import opponentCard3Image from './images/think.png';

// Player Cards
const playerCard1Name = 'prod';
const playerCard2Name = 'small-talk';

// Opponent Cards
const opponentCard1Name = 'chit-chat';
const opponentCard2Name = 'suspect';
const opponentCard3Name = 'think';

export default class Compendium {
  scene: Scene;

  playerCards: Card[];

  opponentCards: Card[];

  constructor(scene: Scene) {
    this.scene = scene;
    this.playerCards = [];
    this.opponentCards = [];

    scene.load.image(playerCard1Name, playerCard1Image);
    scene.load.image(playerCard2Name, playerCard2Image);
    scene.load.image(opponentCard1Name, opponentCard1Image);
    scene.load.image(opponentCard2Name, opponentCard2Image);
    scene.load.image(opponentCard3Name, opponentCard3Image);

    scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.playerCards = [
        new Card(this.scene, 'Prod', playerCard1Name, 0, 1),
        new Card(this.scene, 'Small Talk', playerCard2Name, 0, 1),
      ];

      this.opponentCards = [
        new Card(this.scene, 'Chit-Chat', opponentCard1Name, 0, 1),
        new Card(this.scene, 'Suspect', opponentCard2Name, 0, 1),
        new Card(this.scene, 'Think', opponentCard3Name, 0, 1),
      ];
    });

    scene.load.start();
  }

  getPlayerCards() {
    return Array.from(this.playerCards);
  }

  getOpponentCards() {
    return Array.from(this.opponentCards);
  }
}

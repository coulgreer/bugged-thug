import { Scene } from 'phaser';

import PlayerCard from './player-card';
import OpponentCard from './opponent-card';

import playerCardFrame from './images/player-frame.png';
import playerCard1Image from './images/prod.png';
import playerCard2Image from './images/small-talk.png';

import opponentCardFrame from './images/opponent-frame.png';
import opponentCard1Image from './images/chit-chat.png';
import opponentCard2Image from './images/suspect.png';
import opponentCard3Image from './images/think.png';

// Player Cards
const playerFrameName = 'player-frame';
const playerCard1Name = 'prod';
const playerCard2Name = 'small-talk';

// Opponent Cards
const opponentFrameName = 'opponent-frame';
const opponentCard1Name = 'chit-chat';
const opponentCard2Name = 'suspect';
const opponentCard3Name = 'think';

export default class Compendium {
  scene: Scene;

  playerCards: PlayerCard[];

  opponentCards: OpponentCard[];

  constructor(scene: Scene) {
    this.scene = scene;
    this.playerCards = [];
    this.opponentCards = [];

    scene.load.image(playerFrameName, playerCardFrame);
    scene.load.image(playerCard1Name, playerCard1Image);
    scene.load.image(playerCard2Name, playerCard2Image);
    scene.load.image(opponentFrameName, opponentCardFrame);
    scene.load.image(opponentCard1Name, opponentCard1Image);
    scene.load.image(opponentCard2Name, opponentCard2Image);
    scene.load.image(opponentCard3Name, opponentCard3Image);

    scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.playerCards = [
        new PlayerCard(
          this.scene,
          'Prod',
          'Gain 0-2 intel. If 0 intel is gained then suspicion is increased by 1-2.',
          playerCard1Name,
          [0, 2],
          0
        ),
        new PlayerCard(
          this.scene,
          'Small Talk',
          'Gain 0-1 intel.',
          playerCard2Name,
          [0, 1],
          0
        ),
      ];

      this.opponentCards = [
        new OpponentCard(
          this.scene,
          'Chit-Chat',
          'Gain 0-2 intel.',
          opponentCard1Name,
          [0, 2],
          1
        ),
        new OpponentCard(
          this.scene,
          'Suspect',
          'Gain 1-2 suspicion.',
          opponentCard2Name,
          0,
          [1, 2]
        ),
        new OpponentCard(
          this.scene,
          'Think',
          'Gain 0-1 suspicion.',
          opponentCard3Name,
          0,
          [0, 1]
        ),
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

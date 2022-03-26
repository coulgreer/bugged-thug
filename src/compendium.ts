import { Scene } from 'phaser';

import InvestigatorCard from './investigator-card';
import OpponentCard from './opponent-card';

import investigatorCardFrame from './images/investigator-frame.png';
import investigatorCard1Image from './images/prod.png';
import investigatorCard2Image from './images/small-talk.png';

import opponentCardFrame from './images/opponent-frame.png';
import opponentCard1Image from './images/chit-chat.png';
import opponentCard2Image from './images/suspect.png';
import opponentCard3Image from './images/think.png';

// Investigator Cards
const investigatorFrameName = 'investigator-frame';
const investigatorCard1Name = 'prod';
const investigatorCard2Name = 'small-talk';

// Opponent Cards
const opponentFrameName = 'opponent-frame';
const opponentCard1Name = 'chit-chat';
const opponentCard2Name = 'suspect';
const opponentCard3Name = 'think';

export default class Compendium {
  private scene;

  private investigatorCards: InvestigatorCard[];

  private opponentCards: OpponentCard[];

  constructor(scene: Scene) {
    this.scene = scene;
    this.investigatorCards = [];
    this.opponentCards = [];

    scene.load.image(investigatorFrameName, investigatorCardFrame);
    scene.load.image(investigatorCard1Name, investigatorCard1Image);
    scene.load.image(investigatorCard2Name, investigatorCard2Image);
    scene.load.image(opponentFrameName, opponentCardFrame);
    scene.load.image(opponentCard1Name, opponentCard1Image);
    scene.load.image(opponentCard2Name, opponentCard2Image);
    scene.load.image(opponentCard3Name, opponentCard3Image);

    scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.investigatorCards = [
        new InvestigatorCard(
          this.scene,
          'Prod',
          '<Gain 0-2 intel>. If 0 intel is gained then suspicion is increased by 1-2.',
          investigatorCard1Name
        ),
        new InvestigatorCard(
          this.scene,
          'Small Talk',
          '<Gain 0-1 intel>.',
          investigatorCard2Name
        ),
      ];

      this.opponentCards = [
        new OpponentCard(
          this.scene,
          'Chit-Chat',
          '<Gain 0-2 intel>.',
          opponentCard1Name
        ),
        new OpponentCard(
          this.scene,
          'Suspect',
          '<Gain 1-2 suspicion>.',
          opponentCard2Name
        ),
        new OpponentCard(
          this.scene,
          'Think',
          '<Gain 0-1 suspicion>.',
          opponentCard3Name
        ),
      ];
    });

    scene.load.start();
  }

  getInvestigatorCards() {
    return Array.from(this.investigatorCards);
  }

  getOpponentCards() {
    return Array.from(this.opponentCards);
  }
}

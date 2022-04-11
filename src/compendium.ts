import { Scene } from 'phaser';

import InvestigatorCard from './investigator-card';
import OpponentCard from './opponent-card';

import investigatorCardFrame from './images/investigator-frame.png';
import prod from './images/prod.png';
import smallTalk from './images/small-talk.png';

import opponentCardFrame from './images/opponent-frame.png';
import chitChat from './images/chit-chat.png';
import suspect from './images/suspect.png';
import think from './images/think.png';

export default class Compendium {
  private scene;

  private investigatorCards: InvestigatorCard[];

  private opponentCards: OpponentCard[];

  constructor(scene: Scene) {
    this.scene = scene;
    this.investigatorCards = [];
    this.opponentCards = [];

    scene.load.image('investigator-frame', investigatorCardFrame);
    scene.load.image('prod', prod);
    scene.load.image('small-talk', smallTalk);
    scene.load.image('opponent-frame', opponentCardFrame);
    scene.load.image('chit-chat', chitChat);
    scene.load.image('suspect', suspect);
    scene.load.image('think', think);

    scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.investigatorCards = [
        new InvestigatorCard(
          this.scene,
          'Prod',
          '<Gain 0-2 intel>. If 0 intel is gained then suspicion is increased by 1-2.',
          'prod'
        ),
        new InvestigatorCard(
          this.scene,
          'Small Talk',
          '<Gain 0-1 intel>.',
          'small-talk'
        ),
      ];

      this.opponentCards = [
        new OpponentCard(
          this.scene,
          'Chit-Chat',
          '<Gain 0-2 intel>.',
          'chit-chat'
        ),
        new OpponentCard(
          this.scene,
          'Suspect',
          '<Gain 1-2 suspicion>.',
          'suspect'
        ),
        new OpponentCard(this.scene, 'Think', '<Gain 0-1 suspicion>.', 'think'),
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

import { GameObjects, Scene } from 'phaser';

import Player from './player';

export default class TurnTracker extends GameObjects.Sprite {
  private static STARTING_INDEX = 0;

  private players;

  private currentIndex;

  constructor(
    scene: Scene,
    players: { player: Player; icon: string }[],
    x = 0,
    y = 0
  ) {
    super(scene, x, y, 'placeholder-turn-token');
    scene.add.existing(this);

    this.players = players;

    this.currentIndex = TurnTracker.STARTING_INDEX;
    this.setTexture(this.players[this.currentIndex].icon);
  }
}

import * as Phaser from 'phaser';

class Scene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  preload() {
    this.load.image('sky');
  }

  create() {
    this.add.image(400, 300, 'sky');
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Scene],
};

export default new Phaser.Game(config);

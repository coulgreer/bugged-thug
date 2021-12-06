import * as Phaser from 'phaser';
import logo from './images/logo.png';

class Scene extends Phaser.Scene {
  preload() {
    this.load.image('logo', logo);
  }

  create() {
    this.add.image(200, 200, 'logo');
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Scene],
};

export default new Phaser.Game(config);

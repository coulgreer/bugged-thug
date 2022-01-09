import Displayable from './displayable';
import Modifier from './modifier';
import Orientation from './orientation';

export default class PlayerCard
  extends Phaser.GameObjects.Sprite
  implements Modifier, Displayable
{
  private title;

  private frontImage;

  private backImage;

  private intelModifier;

  private suspicionModifier;

  private isFlipped;

  constructor(
    scene: Phaser.Scene,
    title: string,
    frontImage: string,
    intelModifier: number,
    suspicionModifier: number,
    backImage = 'card-back',
    x = 0,
    y = 0,
    isFlipped = false
  ) {
    super(scene, x, y, backImage);

    scene.add.existing(this);
    this.setOrigin(0, 0);
    this.setInteractive();

    this.title = title;
    this.frontImage = frontImage;
    this.backImage = backImage;
    this.intelModifier = intelModifier;
    this.suspicionModifier = suspicionModifier;
    this.isFlipped = isFlipped;

    this.on('pointerdown', () => this.flip());
  }

  flip() {
    this.isFlipped = !this.isFlipped;

    if (this.isFlipped) {
      this.setTexture(this.frontImage);
    } else {
      this.setTexture(this.backImage);
    }
  }

  modifyIntel(intel: number) {
    return intel + this.intelModifier;
  }

  modifySuspicion(suspicion: number) {
    return suspicion + this.suspicionModifier;
  }

  getTitle() {
    return this.title;
  }

  setOrientation(o: Orientation) {
    switch (o) {
      case Orientation.FRONT: 
        this.isFlipped = true;
        this.setTexture(this.frontImage);
        break;
      case Orientation.BACK:
        this.isFlipped = false;
        this.setTexture(this.backImage);
        break;
      default:
        break;
    }
  }
}

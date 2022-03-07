import Orientation from './orientation';

export default class CardDisplayManager {
  private isFlipped;

  private parent;

  private front;

  private back;

  constructor(
    parent: Phaser.GameObjects.Container,
    front: Phaser.GameObjects.Container,
    back: Phaser.GameObjects.Sprite,
    isFlipped: boolean
  ) {
    this.parent = parent;
    this.front = front;
    this.back = back;
    this.isFlipped = isFlipped;

    if (isFlipped) {
      this.parent.bringToTop(this.front);
    } else {
      this.parent.bringToTop(this.back);
    }
  }

  flip() {
    this.isFlipped = !this.isFlipped;

    if (this.isFlipped) {
      this.parent.bringToTop(this.front);
    } else {
      this.parent.bringToTop(this.back);
    }
  }

  setShown(isShown: boolean) {
    this.parent.setVisible(isShown);
  }

  setOrientation(o: Orientation) {
    switch (o) {
      case Orientation.FRONT:
        this.isFlipped = true;
        this.parent.bringToTop(this.front);
        break;
      case Orientation.BACK:
        this.isFlipped = false;
        this.parent.bringToTop(this.back);
        break;
      default:
        break;
    }
  }
}

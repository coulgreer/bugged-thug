import type Card from './card';

export default interface Observer {
  update(card: Card): void;

  isEqual(obj: any): boolean;
}

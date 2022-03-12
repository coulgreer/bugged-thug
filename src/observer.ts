export default interface Observer {
  update(intel: number, suspicion: number): void;

  isEqual(obj: any): boolean;
}

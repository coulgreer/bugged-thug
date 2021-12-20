export default interface Modifier {
  modifyIntel(intel: number): number;
  modifySuspicion(suspicion: number): number;
}

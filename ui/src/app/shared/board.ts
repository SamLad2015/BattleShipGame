export class Board {
  boardCellStatuses: Array<number[]>;
  rows: number;
  columns: number;
  occupationCount:number;
  hitCount: number;
  hasLost: boolean;
}

export class AttackInfo {
  board: Board;
  row: number;
  column: number;
}

export enum AttackResult {
  hit,
  miss
}
 export enum BoardCellStatus {
   hit,
   miss,
   unoccupied,
   occupied
 }

 export enum GameMode {
   on,
   quit,
   finished
 }

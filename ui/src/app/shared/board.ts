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
  number: number;
}

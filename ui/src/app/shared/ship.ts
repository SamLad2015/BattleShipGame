import {Board} from "./board";

export class Ship {
  name: string;
  type: number;
  constructor(name: string, type: number) {
    this.name = name;
    this.type = type;
  }
}

export enum ShipOrientations {
  horizontal,
  vertical
}

export enum ShipTypes {
  battleship,
  destroyer
}

export class ShipPositionInfo {
  shipOrientation: number;
  row: number;
  column: number;
}

export class ShipPlacementInfo extends ShipPositionInfo{
  ship: Ship;
  constructor(ship: Ship, placement: ShipPositionInfo) {
    super();
    this.ship = ship;
    this.shipOrientation = placement.shipOrientation;
    this.row = placement.row;
    this.column = placement.column;
  }
}

export class ShipsPlacementInfo {
  board: Board;
  shipModels: ShipPlacementInfo[];
  constructor(board: Board, shipModels: ShipPlacementInfo[]) {
    this.board = board;
    this.shipModels = shipModels;
  }
}

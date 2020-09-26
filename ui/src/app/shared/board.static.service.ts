import {Injectable} from '@angular/core';
import {Ship, ShipOrientations, ShipPlacementInfo, ShipPositionInfo} from "./ship";
import {AttackInfo} from "./board";


@Injectable({
  providedIn: 'root'
})

export class BoardStaticService {
  static GetShipPlacementInfo = (orientation: number, row: number, column: number) => {
    const positionInfo = new ShipPositionInfo();
    positionInfo.shipOrientation = orientation;
    positionInfo.row = row;
    positionInfo.column = column;
    return positionInfo;
  }

  static GetPositionAlphas = () => {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  }

  static DetectAttackAttempt =  (attack: AttackInfo, index: number, type: string) => {
    if (type === 'row') {
      if (!attack.column && attack.row) {
        delete attack.row;
      } else {
        attack.row = index;
      }
    } else {
      if (!attack.row && attack.column) {
        delete attack.column;
      } else {
        attack.column = index;
      }
    }
    return attack;
  }

  static updateShipCellsInfo = (placements: ShipPlacementInfo[]): Ship[] => {
    function getCellsOccupied(p: ShipPlacementInfo, isVertical: boolean) {
      const colAlphas = BoardStaticService.GetPositionAlphas();
      const cells =[];
      for (let i= isVertical ? p.row : p.column; i < p.ship.size + (isVertical ? p.row : p.column); i++){
        cells.push((isVertical ? i + 1 : p.row + 1) + (isVertical ? colAlphas[p.column] : colAlphas[i]));
      }
      return cells;
    }
    placements.forEach((p) => {
      p.ship.cellsOccupied = getCellsOccupied(p, p.shipOrientation === ShipOrientations.vertical);
    });
    return placements.map(p => p.ship);
  }
}

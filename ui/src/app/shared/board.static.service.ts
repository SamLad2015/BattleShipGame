import { Injectable } from '@angular/core';
import {Ship, ShipPlacementInfo, ShipPositionInfo} from "./ship";
import {Board} from "./board";

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
}

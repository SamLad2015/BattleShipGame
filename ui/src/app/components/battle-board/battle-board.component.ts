import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "../../shared/board.service";
import {Board} from "../../shared/board";
import {
  Ship,
  ShipOrientations,
  ShipPlacementInfo,
  ShipsPlacementInfo,
  ShipTypes
} from "../../shared/ship";
import {ShipService} from "../../shared/ship.service";
import {BoardStaticService} from "../../shared/board.static.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-battle-board',
  templateUrl: './battle-board.component.html',
  styleUrls: ['./battle-board.component.css']
})
export class BattleBoardComponent implements OnInit, OnDestroy {
  boardSubscription: Subscription;
  shipsAddSubscription: Subscription;
  shipsPlaceSubscription: Subscription;
  board: Board;
  ships: Ship[];
  constructor(private boardService: BoardService,
              private shipService: ShipService) { }

  ngOnInit(): void {
    this.ships = [
      new Ship('HMS Queen Elizabeth', ShipTypes.battleship),
      new Ship('HMS Duncan', ShipTypes.destroyer),
      new Ship('HMS Defender', ShipTypes.destroyer)
    ];
    this.boardSubscription = this.boardService.CreateBoard().subscribe(board => {
      this.board = board;
      this.shipsAddSubscription = this.addShips(this.ships).subscribe((ships) => {
        this.ships = ships;
        const shipPlacements = [
          new ShipPlacementInfo(ships[0], BoardStaticService.GetShipPlacementInfo(ShipOrientations.horizontal, 1, 1)),
          new ShipPlacementInfo(ships[1], BoardStaticService.GetShipPlacementInfo(ShipOrientations.horizontal, 3, 3)),
          new ShipPlacementInfo(ships[2], BoardStaticService.GetShipPlacementInfo(ShipOrientations.vertical, 5, 9))
        ];
        this.shipsPlaceSubscription = this.placeShips(new ShipsPlacementInfo(this.board, shipPlacements))
          .subscribe(board => this.board = board);
      })
    });
  }

  addShips(ships: Ship[]): Observable<Ship[]> {
    return this.shipService.AddShips(ships);
  }

  placeShips(placements: ShipsPlacementInfo): Observable<Board> {
    return this.shipService.PlaceShips(placements);
  }

  ngOnDestroy() {
    this.boardSubscription.unsubscribe();
    this.shipsAddSubscription.unsubscribe();
    this.shipsPlaceSubscription.unsubscribe();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "../../shared/board.service";
import {AttackInfo, AttackResult, Board, BoardCellStatus, GameMode} from "../../shared/board";
import {Ship, ShipOrientations, ShipPlacementInfo, ShipsPlacementInfo, ShipTypes} from "../../shared/ship";
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
  attackSubscription: Subscription;
  board: Board;
  ships: Ship[];
  columnLetters: string[];
  attemptedAttack: AttackInfo;
  hasWonGame: boolean;
  gameMode: GameMode;
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
          .subscribe(response => {
            this.board = response.board;
            this.ships = BoardStaticService.updateShipCellsInfo(response.shipModels);
          });
      })
    });
    this.getColumnAlphas();
    this.attemptedAttack = new AttackInfo();
    this.gameMode = GameMode.on;
  }

  addShips(ships: Ship[]): Observable<Ship[]> {
    return this.shipService.AddShips(ships);
  }

  placeShips(placements: ShipsPlacementInfo): Observable<any> {
    return this.shipService.PlaceShips(placements);
  }

  getColumnAlphas = () => {
    this.columnLetters = BoardStaticService.GetPositionAlphas();
  }

  ngOnDestroy() {
    this.boardSubscription.unsubscribe();
    this.shipsAddSubscription.unsubscribe();
    this.shipsPlaceSubscription.unsubscribe();
    if (this.attackSubscription) {
      this.attackSubscription.unsubscribe();
    }
  }

  selectButton(i: number, type: string) {
   this.attemptedAttack = BoardStaticService.DetectAttackAttempt(this.attemptedAttack, i, type);
   if (this.attemptedAttack.row && this.attemptedAttack.column) {
     this.attemptedAttack.board = this.board;
     this.attackSubscription = this.boardService.AttemptAttack(this.attemptedAttack)
       .subscribe(result => {
         this.board.boardCellStatuses[this.attemptedAttack.row][this.attemptedAttack.column] = result;
         if (result === AttackResult.hit) {
           this.board.occupationCount -= 1;
         }
         this.attemptedAttack = new AttackInfo();
         this.board.hitCount += 1;
         this.checkIfHasWonGame();
       });
   }
  }

  checkIfHasWonGame() {
    this.hasWonGame = this.board.hitCount > 0 && this.board.boardCellStatuses
      .filter(r => r.indexOf(BoardCellStatus.occupied) > -1).length === 0;
    if (this.hasWonGame) {
      this.gameMode = GameMode.finished;
    }
  }

  isBattleShip(cell: string) {
    const parentShip = this.ships
      .find(s => s.cellsOccupied && s.cellsOccupied.indexOf(cell) > -1);
    return parentShip && parentShip.type === ShipTypes.battleship;
  }

  quitGame() {
    this.gameMode = GameMode.quit;
  }

  getShipName(cell: string) {
    const parentShip = this.ships
      .find(s => s.cellsOccupied && s.cellsOccupied.indexOf(cell) > -1);
    return parentShip ? parentShip.name.replace('HMS ', '').substring(0, 2) : 'O';
  }
}

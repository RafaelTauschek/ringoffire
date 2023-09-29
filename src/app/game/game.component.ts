import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game!: Game;
  unsubSingle: any;
  gameId: any;

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, public dialog: MatDialog) { }


  async ngOnInit() {
    this.newGame();
    this.route.params.subscribe((param) => {
      console.log('params', param['id']);
      // Update?
      
    });
  }

  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      this.firebase.updateGame(this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.firebase.updateGame(this.game);
      }, 1000);
    }
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.firebase.updateGame(this.game);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { FirebaseServicesComponent } from '../firebase-services/firebase-services.component';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game!: Game;

  constructor(private route: ActivatedRoute, private firebase: FirebaseServicesComponent, public dialog: MatDialog) { }


  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
    })
  }


  newGame() {
    this.game = new Game();
    //this.firebase.addGame(this.game.toJson());
  }



  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}

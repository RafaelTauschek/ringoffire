import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  unsubSingle: any;
  gameId: any;

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, public dialog: MatDialog) { }


  async ngOnInit() {
    this.newGame();
    this.route.params.subscribe((param) => {
      console.log('params', param['id']);
      if (this.gameId == undefined) {
        this.gameId = param['id'];
        this.firebase.subscribeGame(this.gameId);
      }
    });
    this.firebase.subject.subscribe((game) => {
      console.log('subject game:', game);
      this.game.stack = game.stack;
      this.game.players = game.players;
      this.game.player_images = game.player_images;
      this.game.playedCards = game.playedCards;
      this.game.currentPlayer = game.currentPlayer
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
    });
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.firebase.updateGame(this.game);
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.firebase.updateGame(this.game);
      }, 1000);
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      this.game.player_images[playerId] = change;
      this.firebase.updateGame(this.game);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('sheep.png')
        this.firebase.updateGame(this.game);
      }
    });
  }
}

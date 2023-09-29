import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firebase: FirebaseService, private router: Router) { }



  newGame() {
    let game = new Game();
    this.firebase.addGame(game.toJson()).then(() => {
      this.router.navigateByUrl('/game/' + this.firebase.gameId);
    }).catch((err) => {
      console.error('Error adding game', err)
    });
  }
}

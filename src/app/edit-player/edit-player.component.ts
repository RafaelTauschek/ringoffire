import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

  allProfilePictures = [
    'bear.png',
    'cat.png',
    'cow.png',
    'dog.png',
    'ladybug.png',
    'moose.png',
    'mouse.png',
    'penguin.png',
    'sheep.png',
  ];
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }
  

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

  onNoClick() {
    this.dialogRef.close();
  }
}

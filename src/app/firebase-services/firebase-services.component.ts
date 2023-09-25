import { Component, Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-services',
  templateUrl: './firebase-services.component.html',
  styleUrls: ['./firebase-services.component.scss']
})
export class FirebaseServicesComponent {

  firestore: Firestore = inject(Firestore);
  items$;
  items;

  constructor() {
    this.items$ = collectionData(this.getGameRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach((element) => {
        console.log(element);
      })
    });
    this.items.unsubscribe();
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }

}

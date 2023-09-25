import { Component, Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-services',
  templateUrl: './firebase-services.component.html',
  styleUrls: ['./firebase-services.component.scss']
})
export class FirebaseServicesComponent {

  firestore: Firestore = inject(Firestore);
  unsubList;
  unsubSingle;

  constructor() {

    this.unsubList = onSnapshot(this.getGameRef(), (list) => {
      list.forEach((element) => {
        console.log(element.data());
      });
    });
    this.unsubSingle = onSnapshot(this.getSingleGameRef('game', '681719ASFA51'), (element) => {
    });
  }


  async addGame(item: {}) {
    await addDoc(this.getGameRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log('Document written with ID: ', docRef?.id); }
    )
  }

  ngonDestroy() {
    this.unsubList();
    this.unsubSingle();
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}

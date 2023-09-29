import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: Firestore = inject(Firestore);
  unsubSingle: any;
  gameId: any;

  constructor() {
  }


  async addGame(item: {}) {
    await addDoc(this.getGameRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log('Document written with ID: ', docRef?.id);
      this.snapshotSingleGame(docRef?.id);
      this.gameId = docRef?.id;
    }
    )
  }

  snapshotSingleGame(id:any) {
    onSnapshot(this.getSingleGameRef('games', id), (game:any) => {
      return game.data();
    });
  }


  ngonDestroy() {
    this.unsubSingle();
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}

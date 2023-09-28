import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: Firestore = inject(Firestore);
  unsubList: any;
  unsubSingle: any;

  constructor() {
  }


  async addGame(item: {}) {
    await addDoc(this.getGameRef(), item)
      .then((docRef) => {
        this.unsubSingle = onSnapshot(this.getSingleGameRef('games', docRef.id), (gameInfo: any) => {
          console.log(gameInfo.data()); 
        });
      })
      .catch((err) => {
        console.error(err);
      });
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

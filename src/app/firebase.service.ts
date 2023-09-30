import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: Firestore = inject(Firestore);
  subject = new Subject<any>();
  unsubSingle: any;
  gameId: any;
  game = {};

  serviceMethod(game:any) : void {
    this.subject.next(game);
  }
  

  constructor() {
  }


  async addGame(item: {}) {
    await addDoc(this.getGameRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.subscribeGame(docRef?.id);
      }
    )
  }


  async subscribeGame(id: any) {
    this.unsubSingle = this.snapshotSingleGame(id);
    this.gameId = id;
  }


  snapshotSingleGame(id: any) {
    onSnapshot(this.getSingleGameRef('games', id), (game: any) => {
      this.game = game.data();
      this.serviceMethod(this.game);
    });
  }


  async updateGame(game: Game) {
    if (game) {
      let docRef = this.getSingleGameRef('games', this.gameId);
      console.log('Game is:', game);
      await updateDoc(docRef, game.toJson()).catch(
        (err) => { console.log(err) }
      )
    }
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

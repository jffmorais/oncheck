import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ItemI } from '../models/item.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private servCollection: AngularFirestoreCollection<ItemI>;
  private items: Observable<ItemI[]>;

  constructor(db: AngularFirestore) {
    this.servCollection = db.collection<ItemI>('item');
    this.items = this.servCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

  getServicos() {
    return this.items;
  }
}

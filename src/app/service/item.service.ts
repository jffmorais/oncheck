import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { ItemI } from '../models/item.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemCollection: AngularFirestoreCollection<ItemI>;
  private itemFSD: AngularFirestoreDocument<ItemI>;
  private itens: Observable<ItemI[]>;
  private item: Observable<ItemI>;

  constructor(private db: AngularFirestore) {  }

  getItensDisp() {
    this.itemCollection = this.db.collection<ItemI>('item', ref => ref.where('status', '==', 'disponível'));
    this.itens = this.itemCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return this.itens;
  }

  getItens() {
    this.itemCollection = this.db.collection<ItemI>('item');
    this.itens = this.itemCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return this.itens;
  }

  getItem(id) {
    this.itemFSD = this.db.doc<ItemI>('item/' + id);
    this.item = this.itemFSD.valueChanges();
    return this.item;
  }

  updateStatus(id, newStatus) {
    this.db.doc<ItemI>('item/' + id).update({status: newStatus});
  }
}

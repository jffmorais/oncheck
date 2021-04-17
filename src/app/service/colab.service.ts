import { ColabI } from './../models/colab.interface';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColabService {

  private colabFSD: AngularFirestoreDocument<ColabI>;
  private colab: Observable<ColabI>;

  constructor(private db: AngularFirestore) { }

  addColab(id, colab) {
    this.colabFSD = this.db.doc<ColabI>('colaborador/' + id);
    this.colabFSD.set(colab);
  }

  getColab(id) {
    this.colabFSD = this.db.doc<ColabI>('colaborador/' + id);
    this.colab = this.colabFSD.valueChanges();
    return this.colab;
  }
}

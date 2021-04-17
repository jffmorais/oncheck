import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from 'angularfire2/firestore';
import { ReqI } from '../models/req.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ReqService {
  private reqCollection: AngularFirestoreCollection<ReqI>;
  private reqs: Observable<ReqI[]>;

  constructor(
    private db: AngularFirestore,
    public alertController: AlertController
  ) {
    this.reqCollection = db.collection<ReqI>('requisicoes');
    this.reqs = this.reqCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMinhasReqs(id) {
    // console.log(id);
    this.reqCollection = this.db.collection<ReqI>('requisicoes', (ref) =>
      ref.where('colab_id', '==', id).orderBy('data', 'desc')
    );
    this.reqs = this.reqCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.reqs;
  }

  async closeReq(id) {
    const alert = await this.alertController.create({
      header: 'Realizar devolução',
      message: 'Você confirma <strong>estar devolvendo</strong> o equipamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelou devolução');
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Devolução realizada');
            this.db.doc('requisicoes/' + id).update({
              status: 'devolvido',
              data_devolucao: Math.round(+new Date() / 1000),
            });
          },
        },
      ],
    });

    await alert.present();
  }

  getRequisicoes() {
    return this.reqs;
  }

  addReq(req) {
    this.db.collection<ReqI>('requisicoes').add(req);
  }
}

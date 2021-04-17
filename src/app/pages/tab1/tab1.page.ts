import { ItemService } from './../../service/item.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ReqService } from '../../service/req.service';
import { ReqI } from '../../models/req.interface';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  requisicoes: ReqI[];
  noData = false;

  constructor(
    private loadingCtrl: LoadingController,
    private reqService: ReqService,
    private itemService: ItemService,
    public afAuth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      this.loadRequisicoes(auth.uid);
    });
  }

  async loadRequisicoes(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    try {
      await loading.present();
      this.reqService.getMinhasReqs(id).subscribe((res) => {
        this.noData = false;
        if (res.length > 0) {
          res.forEach((item) => {
          item.data_form = this.timeConverter(item.data);
          item.status === 'devolvido' ? item.status_color = 'success' : item.status_color = 'warning';
          if (item.data_devolucao) {item.data_devolucao_form = this.timeConverter(item.data_devolucao); }
        });
        } else {
          this.noData = true;
        }
        // console.log(res);
        this.requisicoes = res;
        loading.dismiss();
      });
    } catch (err) {
      console.log('Ocorreu uma falha: ' + err);
      loading.dismiss();
    }
  }

  darBaixa(reqId) {
    this.reqService.closeReq(reqId);
    const itemObj = this.requisicoes.find((item) => {
      return item.id === reqId;
    });
    // console.log(itemId);
    this.itemService.updateStatus(itemObj.item_id, 'disponível');
  }

  timeConverter(timestamp) {
    return new Date(timestamp * 1000);
  }
}

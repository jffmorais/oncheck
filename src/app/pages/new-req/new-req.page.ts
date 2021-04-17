import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ItemService } from '../../service/item.service';
import { ItemI } from '../../models/item.interface';

@Component({
  selector: 'app-new-req',
  templateUrl: './new-req.page.html',
  styleUrls: ['./new-req.page.scss'],
})
export class NewReqPage implements OnInit {

  itens: ItemI[];

  constructor(
    private loadingCtrl: LoadingController,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.loadItens();
  }

  async loadItens() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.itemService.getItensDisp().subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.itens = res;
    });
  }

}

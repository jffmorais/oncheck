import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ItemService } from '../../service/item.service';
import { ItemI } from '../../models/item.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  itens: ItemI[];

  constructor(
    private loadingCtrl: LoadingController,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadItens();
  }

  async loadItens() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.itemService.getItens().subscribe(res => {
      loading.dismiss();
      console.log(res);
      res.forEach(item => {
        item.status === 'disponível' ? item.status_color = 'success' : item.status_color = 'warning';
      });
      this.itens = res;
    });
  }

  async filterItens(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.itens = this.itens.filter(res => {
      if (res.desc && searchTerm) {
        return (res.desc.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || res.modelo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  requisitar(id) {
    this.router.navigateByUrl('/conf-req/' + id);
  }

}

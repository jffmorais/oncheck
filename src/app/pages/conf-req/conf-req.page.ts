import { ReqService } from './../../service/req.service';
import { ReqI } from './../../models/req.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ItemService } from '../../service/item.service';
import { ItemI } from '../../models/item.interface';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-conf-req',
  templateUrl: './conf-req.page.html',
  styleUrls: ['./conf-req.page.scss'],
})
export class ConfReqPage implements OnInit {
  itemId = null;
  item: ItemI;
  requisicao: ReqI;
  obs = '';
  dataAprox: Date;
  localData = {
    id: '',
    nome: '',
    sobrenome: '',
    registro: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private itemService: ItemService,
    private storage: Storage,
    private reqService: ReqService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataAprox = this.timeConverter(Math.round(+new Date() / 1000));
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadItem(this.itemId);
    this.storage.get('nome').then((val) => {
      this.localData.nome = val;
    });
    this.storage.get('sobrenome').then((val) => {
      this.localData.sobrenome = val;
    });
    this.storage.get('registro').then((val) => {
      this.localData.registro = val;
    });
    this.storage.get('id').then((val) => {
      this.localData.id = val;
    });

  }

  async loadItem(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    await this.itemService.getItem(id).subscribe((res) => {
      loading.dismiss();
      console.log(res);
      this.item = res;
      this.item.status === 'disponível'
        ? (this.item.status_color = 'success')
        : (this.item.status_color = 'warning');
    });
  }

  requisita() {
    this.requisicao = {
      colab_id: this.localData.id,
      colab_nome: this.localData.nome + ' ' + this.localData.sobrenome,
      colab_reg: this.localData.registro,
      data : Math.round(+new Date() / 1000),
      item_desc: this.item.desc,
      item_id: this.itemId,
      item_modelo: this.item.modelo,
      status: 'emprestado',
      item_imagem: this.item.imagem,
      item_numero: this.item.numero,
      obs: this.obs,
    };
    // adiciona uma nova requisição
    this.reqService.addReq(this.requisicao);
    // muda o status do item
    this.itemService.updateStatus(this.itemId, 'indisponível');
    // volta para a home
    this.router.navigateByUrl('/menu/first');
  }

  cancela() {
    this.router.navigateByUrl('/menu/first');
  }

  timeConverter(timestamp) {
    return new Date(timestamp * 1000);
  }
}

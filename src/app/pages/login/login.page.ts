import { ColabService } from './../../service/colab.service';
import { ColabI } from './../../models/colab.interface';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  senha = '';
  loader: any;
  colab: ColabI;

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router,
    private loadCtrl: LoadingController,
    private storage: Storage,
    private colabService: ColabService
  ) {}

  ngOnInit() {
    this.storage.clear();
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  showLoader() {
    this.loader = this.loadCtrl
      .create({
        message: 'carregando',
        // duration: 2000,
        spinner: 'bubbles',
      })
      .then((res) => {
        res.present();
      });
  }

  dismissLoader() {
    this.loadCtrl.dismiss();
  }

  async presentToast(mens) {
    const toast = await this.toastCtrl.create({
      message: mens,
      duration: 2000,
    });
    await toast.present();
  }

  async login() {
    const { email, senha } = this;
    // this.showLoader();
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        senha
      );
      // console.dir(res.user.uid);
      this.setColabToLocal(res.user.uid);
      // this.dismissLoader();
      this.router.navigateByUrl('/menu/first');
    } catch (err) {
      console.dir(err);
      // this.dismissLoader();
      this.presentToast(err.message);
      /*if(err.code === "auth/invalid-email"){
        this.presentToast("O email digitado é inválido");
      }*/
    }
  }

  setColabToLocal(id) {
    this.colabService.getColab(id).subscribe(async (colab) => {
      if (colab) {
        await this.storage.set('id', id);
        await this.storage.set('nome', colab.nome);
        await this.storage.set('sobrenome', colab.sobrenome);
        await this.storage.set('registro', colab.registro);
      }
    });
  }
}

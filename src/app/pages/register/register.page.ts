import { ColabService } from './../../service/colab.service';
import { ColabI } from './../../models/colab.interface';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  senha: string = "";
  csenha: string = "";
  colab: ColabI = {
    nome: "",
    sobrenome: "",
    email: "",
    registro: "",
    cargo:"",
    setor: "",
  };

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router,
    private colabService: ColabService
  ) { }

  ngOnInit() {
  }

  async presentToast(mens) {
    const toast = await this.toastCtrl.create({
      message: mens,
      duration: 2000
    });
    await toast.present();
  }

  async register() {
    const {colab, senha, csenha} = this;
    console.log(colab);
    if (senha !== csenha) {
      this.presentToast("As senhas digitada não conferem");
    } else {
      try {
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(colab.email, senha);
        console.dir(res.user.uid);
        await this.colabService.addColab(res.user.uid, colab);
        this.presentToast("Usuário criado com sucesso!");
        this.router.navigateByUrl("/login");
      } catch (err) {
        console.dir(err);
        this.presentToast(err.message);
      }
    }
  }

}

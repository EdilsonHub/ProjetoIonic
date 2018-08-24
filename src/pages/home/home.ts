import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { CredenciaisDTO } from '../../app/models/credenciais.dto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {


  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController) {

  }

  login() {
    // this.navCtrl.push('CategoriasPage');
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }
}

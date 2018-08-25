import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { CredenciaisDTO } from '../../app/models/credenciais.dto';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AuthService } from '../../app/services/auth.service';

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

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private authService: AuthService
  ) {}

  login() {

    console.log(this.creds);

    this.authService.authenticate(this.creds).subscribe( response => {
      console.log(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    }, error => {});
  }
}

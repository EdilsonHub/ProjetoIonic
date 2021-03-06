import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../app/services/storage.service';
import { ClienteDTO } from '../../app/models/cliente.dto';
import { ClienteService } from '../../app/services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storageService: StorageService,
    private clienteService: ClienteService  
  ) {
  }

  ionViewDidLoad() {
    let usr = this.storageService.getLocalUser();
    if(usr && usr.email) {
     
      this.clienteService.findByEmail(usr.email)
        .subscribe(response =>  {
          console.log("RESPOSTA =>  ")
          console.log(response);
          this.cliente = response;
          //pegar imagem da pessoa aqui
          this.getImagemExiste();
    },
     error => {
      if(error.status == 403) {
        
        this.navCtrl.setRoot('HomePage');
      }
    })
  
    //acredito que o ideal seria assim: this.email = this.storageService.getLocalUser().email; // e os error devem ser tratados antes, nas classes anteriores
   }
  else {
    this.navCtrl.setRoot('HomePage');
  } 

}
  getImagemExiste() {
    this.clienteService.getImagemFromBucket(this.cliente.id)
    .subscribe(
      response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      }, error => {}
    );
  }


}
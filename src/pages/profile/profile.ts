import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../app/services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storageService: StorageService) {
  }

  ionViewDidLoad() {
    let usr = this.storageService.getLocalUser();
    if(usr && usr.email) this.email = usr.email;
    //acredito que o ideal seria assim: this.email = this.storageService.getLocalUser().email; // e os error devem ser tratados antes, nas classes anteriores
  }

}

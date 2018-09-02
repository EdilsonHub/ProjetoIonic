import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../app/services/domain/categoria.service';
import { CategoriaDTO } from '../../app/models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService
    ) {
  }

  items: CategoriaDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  ionViewDidLoad() {

    this.categoriaService.findAll()
      .subscribe(
        response => {this.items = response},
        error => {}
      );

       
    //console.log('ionViewDidLoad CategoriasPage');
  }

  visualizarProdutos(categoria_id: string) {
    this.navCtrl.push('ProdutosPage',{categoria_id: categoria_id});
  }



}

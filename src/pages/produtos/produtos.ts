import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../app/models/produto.dto';
import { ProdutoService } from '../../app/services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private produtoService: ProdutoService
  ){}

  items: ProdutoDTO[];

  ionViewDidLoad() {
    this.produtoService.findByCategoria(this.navParams.get("categoria_id"))
      .subscribe(response => {
        this.items = response['content'];
        this.loadUrlsImages();
        //this.items = response.content; parece funcionar tambem
      },errors => {});
  }

  loadUrlsImages() {
    this.items.forEach(n => {
      this.produtoService.getImageSmallFromBucket(n.id).subscribe(response => {
        n.imagemUrl = `${API_CONFIG.bucketBaseUrl}/prod${n.id}-small.jpg`;
      },errors => {});
    });
  }

}

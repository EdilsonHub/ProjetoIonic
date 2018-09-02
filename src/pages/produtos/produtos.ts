import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../app/models/produto.dto';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  items: ProdutoDTO[] = [
    {id: "1", nome: "ima de geladeira", preco: 87.88},
    {id: "2", nome: "camisinha de protituta", preco: 0.88},
    {id: "3", nome: "buceta macia", preco: 10000}
  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
  }

}

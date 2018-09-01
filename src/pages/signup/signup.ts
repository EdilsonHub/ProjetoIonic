import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../app/services/domain/estado.service';
import { CidadeService } from '../../app/services/domain/cidade.service';
import { EstadoDTO } from '../../app/models/estado.dto';
import { CidadeDTO } from '../../app/models/cidade.dto';
import { ClienteService } from '../../app/services/domain/cliente.service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public criadorFormularios: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clientService: ClienteService,
    public alert: AlertController
  ){
    this.formGroup = this.criadorFormularios.group({
      nome: ['Edilson',[Validators.required,Validators.maxLength(120),Validators.minLength(5)]],
      email: ['di3.pereiradasilva@gmail.com',[Validators.required,Validators.email]],
      tipo:['1',[Validators.required]],
      cpfOuCnpj:['04327505170',[Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      senha: ['123456', [Validators.required]],
      logradouro:['Rua da minha casa',[Validators.required]],
      numero:['25',[Validators.required]], //talvez não fosse com colocar validators required no número pois muitas casas não tem números 
      complemento:['Casa do Adelaide',[]],
      bairro:['Lindo Horizonte',[]],
      cep:['72940000',[Validators.required]], //Estes campo seria com validalos com a aceitação apenas de números, isto pode ser feito com patterns
      telefone1:['62982669607',[Validators.required]],
      telefone2: ['',[]],
      telefone3:['',[]],
      estadoId:[null,[Validators.required]],
      cidadeId:[null,[Validators.required]]
    });
  }



  ionViewDidLoad() {  
    this.estadoService.findAll().subscribe(response =>{
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }),errors => {};
  }
  updateCidades(){
    this.cidadeService.findAll(this.formGroup.value.estadoId).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }),errors => {};
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },errors => {});
  }
  showInsertOk(){
    this.alert.create({
      title: 'Secesso',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [{
          text: 'ok', 
          handler: () => {this.navCtrl.pop()}
        }]      
    }).present();
  }
}

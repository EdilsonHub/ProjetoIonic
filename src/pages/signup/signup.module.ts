import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../app/services/domain/cidade.service';
import { EstadoService } from '../../app/services/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers:[
    CidadeService,
    EstadoService
  ]
})
export class SignupPageModule {}

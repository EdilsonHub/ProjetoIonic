// import {Injectable} from '@angular/core';
// import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
// import {Observable} from 'rxjs/Rx';
// import { _switch } from 'rxjs/operator/switch';
// import { StorageService } from '../services/storage.service';
// import { AlertController } from 'ionic-angular';
// import { FieldMessage } from '../models/fieldMessage.dto';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {

//     constructor(
//         public storage: StorageService,
//         public alertControl: AlertController    
//     ){}

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//         console.log("passamos");
//         return next.handle(req) //erros 
//             .catch((erro, caught) => {
//                 let error = erro;
//                 if(error.error) error = error.error;


//                 if(!error.status) error = JSON.parse(error);

//                 console.log("Erro detectado pelo interceptor");
//                  console.log(error);

//                 switch (error.status) {
//                     case 403:
//                         this.handle403();
//                         break;

//                     case 401:
//                         this.handle401();
//                         break;

//                     case 422:
//                         this.handle422(error);
//                         break;
                
//                     default:
//                         this.handleDefault(error);
//                         break;
//                 }


//                 return Observable.throw(error);
//             }) as any; 

        
//     }

//     handle403() {
//         this.storage.setLocalUser(null);
//     }
//     handle401(){
//         //let alert = 
//         this.alertControl.create({
//             title: 'Erro 401: Falha na autenticação',
//             message: 'email ou senha estão incorretos',
//             enableBackdropDismiss: false,
//             buttons: [
//                 {
//                     text: 'ok'
//                 }
//             ]
//         }).present();// erro introduzido aqui de propósito... corrigir agora, corrigido!

//         //alert.present();
//     }

//     // handle422(errors){
//     //     console.log("errors");
//     //     console.log(errors);
//     //     console.log(errors);
//     //   let alert = this.alertControl.create({
//     //         title: 'Erro de 422: Validação',
//     //         message: this.listErrors(errors.errors),
//     //         enableBackdropDismiss: false,
//     //         buttons: [{
//     //             text: 'ok'
//     //         }]
//     //     });
//     //     alert.present();
//     // }


//     handle422(errorObj) {
//         let alert = this.alertControl.create({
//             title: 'Erro 422: Validação',
//             message: this.listErrors(errorObj.errors),
//             enableBackdropDismiss: false,
//             buttons: [
//                 {
//                     text: 'Ok'
//                 }
//             ]
//         });
//         alert.present();
//     }

//     handleDefault(error){

//         let alert = this.alertControl.create({
//             title: 'Erro ' + error.status,
//             message: error.message,
//             enableBackdropDismiss: false,
//             buttons: [
//                 {
//                     text: 'ok'
//                 }
//             ]
//         });

//         alert.present();    
//     }

//     // listErrors(listaDeErros: { fieldName: string, message: string}) : string{
//     //     //  let returno = listaDeErros.map(element => {
//     //     //     return `<p><strong>${element.fieldName}</strong>: ${element.message}</p>`;
//     //     // }).join('');
//     //     console.log("listaDeErros");
//     //     console.log(listaDeErros);
//     //     return "lista de erros deve retorar aqui";
//     // }

//     private listErrors(messages : FieldMessage[]) : string {
//         let s : string = '';
//         for (var i=0; i<messages.length; i++) {
//             s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
//         }
//         return s;
//     }
// }


// export const ErrorInterceptorProvider = {
//     provide: HTTP_INTERCEPTORS,
//     useClass: ErrorInterceptor,
//     multi: true
// };

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FieldMessage } from '../models/fieldMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status) {
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;

                default:
                this.handleDefaultEror(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultEror(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();        
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
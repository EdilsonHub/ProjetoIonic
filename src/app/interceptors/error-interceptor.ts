import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { _switch } from 'rxjs/operator/switch';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService,
        private alertControl: AlertController    
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("passamos");

        return next.handle(req) //erros 
            .catch((error, caught) => {
          //      let copia_error = error;
            //    no curso o professor cria uma nova variavel
                if(error.error) error = error.error;
                if(!error.status) error = JSON.parse(error);
                console.log("Erro detectado pelo interceptor");
                 console.log(error);

                switch (error.status) {
                    case 403:
                        this.handle403();
                        break;

                    case 401:
                        this.handle401();
                        break;
                
                    default:
                        break;
                }

                return Observable.throw(error);
            }) as any; 

        
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
    handle401(){
        let alert = this.alertControl.create({
            title: 'Erro 401: Falha na autenticação',
            message: 'email ou senha estão incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'ok'
                }
            ]
        });

        alert.present();
    }
}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { swipeShouldReset } from 'ionic-angular/util/util';
import { _switch } from 'rxjs/operator/switch';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("passamos");

        return next.handle(req) //erros 
            .catch((error, caught) => {
                let copia_error = error;
            //    no curso o professor cria uma nova variavel
                if(error.error) error = error.error;
                if(!error.status) error = JSON.parse(error);
                console.log("Erro detectado pelo interceptor");
                 console.log(error);

                switch (error.status) {
                    case 403:
                        this.handle403();
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
}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
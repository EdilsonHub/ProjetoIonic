import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("passamos");

        return next.handle(req) //erros 
            .catch((error, caught) => {

                //no curso o professor cria uma nova variavel
                if(error.error) error = error.error;
                if(!error.status) error = JSON.parse(error);
                console.log("Erro detectado pelo interceptor");
                console.log(error);

                return Observable.throw(error);
            }) as any; 
        
    }
    
}

export const ErrorInterceptorProviders = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
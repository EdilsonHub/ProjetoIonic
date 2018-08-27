import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();
        let requestToApi = req.url.substring(0,API_CONFIG.baseUrl.length) == API_CONFIG.baseUrl;

        if(localUser && requestToApi) {
            return next.handle(
                req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)
                })
            );
        }else {
            return next.handle(req);
        }

        
    }
    
}


export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
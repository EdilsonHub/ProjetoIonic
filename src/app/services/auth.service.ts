import { CredenciaisDTO } from "../models/credenciais.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/localUser.dto";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {
    
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private http: HttpClient,
        private stogeService: StorageService
    ){}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
         `${API_CONFIG.baseUrl}/login`,
         creds,
         {
             observe: 'response',
             responseType: 'text'
         }
        )
    }

    refreshToken() {
        return this.http.post(
         `${API_CONFIG.baseUrl}/auth/refresh_token`,
         {},
         {
             observe: 'response',
             responseType: 'text'
         }
        )
    }

    successfullLogin(autorizationToken: string) {
 
        let usr: LocalUser = {
            token: autorizationToken.substring(7),
            email: this.jwtHelper.decodeToken(autorizationToken.substring(7)).sub
        }

        this.stogeService.setLocalUser(usr);
    } 

    logout() {
        this.stogeService.setLocalUser(null);
    }
}

// /** sudo npm install --save angular2-jwt
//  * -------------------------------------
// npm WARN angular2-jwt@0.2.3 requires a peer of @angular/core@^2.0.0||^4.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN angular2-jwt@0.2.3 requires a peer of @angular/http@^2.0.0||^4.0.0 but none is installed. You must install peer dependencies yourself.
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
// * /
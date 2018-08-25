import { CredenciaisDTO } from "../models/credenciais.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/localUser.dto";
import { STORAGE_KEYS } from "../../config/storage_key.config";

@Injectable()
export class AuthService {
    
    constructor(
        private http: HttpClient,
        private stogeService: StorageService
    ){}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
         `${API_CONFIG.baseUrl}/login`,
         creds,
         {observe: 'response',responseType: 'text'}
        )
    }

    successfullLogin(autorizationToken: string) {
 
        let usr: LocalUser = {
            token : autorizationToken.substring(7)
        }

        this.stogeService.setLocalUser(usr);
    } 

    logout() {
        this.stogeService.setLocalUser(null);
    }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient, 
        public storageService: StorageService
    ){}

    findByEmail(email: string): Observable<ClienteDTO>{       
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImagemFromBucket(id: string): Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`,{ responseType: 'blob'});
    }
} 
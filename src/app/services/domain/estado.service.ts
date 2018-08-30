import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../../config/api.config";

@Injectable()
export class EstadoService {

    estados :EstadoDTO[];
    constructor(public http: HttpClient){}

    findAll() : Observable<EstadoDTO[]> {
        console.log(`${API_CONFIG.baseUrl}/estados`);
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}
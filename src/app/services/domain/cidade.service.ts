import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../../config/api.config";

@Injectable()
export class CidadeService {

    categorias :CidadeDTO[];
    constructor(public http: HttpClient){}

    findAll(estadoId: string) : Observable<CidadeDTO[]> {
        console.log(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../../config/api.config";

@Injectable()
export class CategoriaService {

    categorias :CategoriaDTO[];
    constructor(public http: HttpClient){}

    findAll() : Observable<CategoriaDTO[]> {
        console.log(`${API_CONFIG.baseUrl}/categorias`);
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categoriass`);
    }
}
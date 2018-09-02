import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProdutoDTO } from "../../models/produto.dto";
import { API_CONFIG } from "../../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {

    constructor(
        private http: HttpClient
    ){}

    findByCategoria(categoria_id: string): Observable<ProdutoDTO[]> { // não sei porque na aula o professor não coloca observable e nem tipa o get com Produto[] 
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id || "1"}`)
    }
}
import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
    CadastrarCategoriaModel, CadastrarCategoriaResponseModel, DetalhesCategoriasModel,
    EditarCategoriaModel, EditarCategoriaResponseModel, ListagemCategoriasApiResponse,
    ListagemCategoriasModel
} from './categorias.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl: string = 'https://localhost:9001/categorias';

  public cadastrar(
    categoria: CadastrarCategoriaModel,
  ): Observable<CadastrarCategoriaResponseModel> {
    return this.http.post<CadastrarCategoriaResponseModel>(this.apiUrl, categoria);
  }

  public editar(
    id: string,
    categoria: EditarCategoriaModel,
  ): Observable<EditarCategoriaResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarCategoriaResponseModel>(urlCompleto, categoria);
  }

  public excluir(id: string): Observable<void> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<void>(urlCompleto);
  }
  
  public selecionarTodas(): Observable<ListagemCategoriasModel[]> {
    return this.http
      .get<ListagemCategoriasApiResponse>(this.apiUrl)
      .pipe(map((res) => res.registros));
  }

  public selecionarPorId(id: string): Observable<DetalhesCategoriasModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesCategoriasModel>(urlCompleto);
  }
}

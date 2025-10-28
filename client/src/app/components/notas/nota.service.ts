import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
    CadastrarNotaModel, CadastrarNotaResponseModel, ListagemNotasApiResponse, ListagemNotasModel
} from './nota.models';

@Injectable()
export class NotaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/notas';

  public cadastrar(notaModel: CadastrarNotaModel): Observable<CadastrarNotaResponseModel> {
    return this.http.post<CadastrarNotaResponseModel>(this.apiUrl, notaModel);
  }

  public selecionarTodas(): Observable<ListagemNotasModel[]> {
    return this.http.get<ListagemNotasApiResponse>(this.apiUrl).pipe(map((res) => res.registros));
  }
}

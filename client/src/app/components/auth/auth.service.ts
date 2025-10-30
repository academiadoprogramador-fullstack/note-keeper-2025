import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
    LoginModel, RegistroModel, TokenResponseModel, UsuarioAutenticadoModel
} from './auth.models';

@Injectable()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/auth';

  private readonly usuarioAutenticadoSubject$ = new BehaviorSubject<
    UsuarioAutenticadoModel | undefined
  >(undefined);

  public readonly usuarioAutenticado$ = this.usuarioAutenticadoSubject$.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public registro(registroModel: RegistroModel): Observable<UsuarioAutenticadoModel> {
    const urlCompleto = `${this.apiUrl}/registro`;

    return this.http.post<TokenResponseModel>(urlCompleto, registroModel).pipe(
      map((res) => res.usuarioAutenticado),
      tap((usuario) => this.usuarioAutenticadoSubject$.next(usuario)),
    );
  }

  public login(loginModel: LoginModel): Observable<UsuarioAutenticadoModel> {
    const urlCompleto = `${this.apiUrl}/login`;

    return this.http.post<TokenResponseModel>(urlCompleto, loginModel).pipe(
      map((res) => res.usuarioAutenticado),
      tap((usuario) => this.usuarioAutenticadoSubject$.next(usuario)),
    );
  }

  public sair(): Observable<null> {
    const urlCompleto = `${this.apiUrl}/sair`;

    return this.http
      .post<null>(urlCompleto, {})
      .pipe(tap(() => this.usuarioAutenticadoSubject$.next(undefined)));
  }
}

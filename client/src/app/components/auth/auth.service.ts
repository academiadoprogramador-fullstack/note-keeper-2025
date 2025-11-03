import {
    BehaviorSubject, defer, distinctUntilChanged, merge, Observable, of, shareReplay, tap
} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { obterOpcoesHeaderAutorizacao } from '../../util/obter-opcoes-header-autorizacao';
import { AccessTokenModel, LoginModel, RegistroModel } from './auth.models';

@Injectable()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/auth';
  private readonly chaveAccessToken: string = 'notekeeper:access-token';

  public readonly accessTokenSubject$ = new BehaviorSubject<AccessTokenModel | undefined>(
    undefined,
  );

  private readonly acessTokenArmazenadoSubject$ = defer(() => {
    const token = this.obterAccessToken();

    if (!token) return of<AccessTokenModel | undefined>(undefined);

    const valido = new Date(token.expiracao) > new Date();

    if (valido) return of(token);

    return of<AccessTokenModel | undefined>(undefined);
  });

  public readonly accessToken$ = merge(
    this.acessTokenArmazenadoSubject$,
    this.accessTokenSubject$,
  ).pipe(
    distinctUntilChanged((a, b) => a === b),
    tap((accessToken) => {
      if (accessToken) this.salvarAccessToken(accessToken);
      else this.limparAccessToken();
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public registro(registroModel: RegistroModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/registro`;

    return this.http
      .post<AccessTokenModel>(urlCompleto, registroModel)
      .pipe(tap((token) => this.accessTokenSubject$.next(token)));
  }

  public login(loginModel: LoginModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/login`;

    return this.http
      .post<AccessTokenModel>(urlCompleto, loginModel)
      .pipe(tap((token) => this.accessTokenSubject$.next(token)));
  }

  public sair(): Observable<null> {
    const urlCompleto = `${this.apiUrl}/sair`;

    return this.http
      .post<null>(
        urlCompleto,
        {},
        obterOpcoesHeaderAutorizacao(this.accessTokenSubject$.getValue()),
      )
      .pipe(tap(() => this.accessTokenSubject$.next(undefined)));
  }

  private salvarAccessToken(token: AccessTokenModel): void {
    const jsonString = JSON.stringify(token);

    localStorage.setItem(this.chaveAccessToken, jsonString);
  }

  private limparAccessToken(): void {
    localStorage.removeItem(this.chaveAccessToken);
  }

  private obterAccessToken(): AccessTokenModel | undefined {
    const jsonString = localStorage.getItem(this.chaveAccessToken);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString);
  }
}

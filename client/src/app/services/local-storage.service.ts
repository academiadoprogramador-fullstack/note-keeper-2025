import { Injectable } from '@angular/core';

import { AccessTokenModel } from '../components/auth/auth.models';

@Injectable()
export class LocalStorageService {
  private readonly chaveAccessToken: string = 'notekeeper:access-token';

  public salvarAccessToken(token: AccessTokenModel): void {
    const jsonString = JSON.stringify(token);

    localStorage.setItem(this.chaveAccessToken, jsonString);
  }

  public obterAccessToken(): AccessTokenModel | undefined {
    const jsonString = localStorage.getItem(this.chaveAccessToken);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString);
  }

  public limparAccessToken(): void {
    localStorage.removeItem(this.chaveAccessToken);
  }
}

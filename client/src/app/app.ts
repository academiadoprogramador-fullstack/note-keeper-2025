import { PartialObserver, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthLocalStorageService } from './components/auth/auth.local-storage.service';
import { AuthService } from './components/auth/auth.service';
import { NotificacaoService } from './components/shared/notificacao/notificacao.service';
import { ShellComponent } from './components/shared/shell/shell.component';

@Component({
  selector: 'app-root',
  template: `
    @if (accessToken$ | async; as accessToken) {
      <app-shell
        [usuarioAutenticado]="accessToken.usuarioAutenticado"
        (logoutRequisitado)="logout()"
      >
        <router-outlet></router-outlet>
      </app-shell>
    } @else {
      <main class="container-fluid py-3">
        <router-outlet></router-outlet>
      </main>
    }
  `,
  imports: [ShellComponent, RouterOutlet, AsyncPipe],
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authLocalStorageService = inject(AuthLocalStorageService);
  private readonly notificacaoService = inject(NotificacaoService);

  protected readonly accessToken$ = this.authService.accessToken$.pipe(
    tap((accessToken) => {
      if (accessToken) this.authLocalStorageService.salvarAccessToken(accessToken);
      else this.authLocalStorageService.limparAccessToken();
    }),
  );

  public ngOnInit(): void {
    const accessToken = this.authLocalStorageService.obterAccessToken();

    if (!accessToken) return;

    if (new Date(accessToken.expiracao) > new Date())
      this.authService.accessTokenSubject$.next(accessToken);
    else this.notificacaoService.aviso('Sessão expirada. Faça login novamente.');
  }

  public logout(): void {
    const sairObserver: PartialObserver<null> = {
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/auth/login']),
    };

    this.authService.sair().subscribe(sairObserver);
  }
}

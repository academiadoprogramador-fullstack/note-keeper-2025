import { PartialObserver } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './components/auth/auth.service';
import { NotificacaoService } from './components/shared/notificacao/notificacao.service';
import { ShellComponent } from './components/shared/shell/shell.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ShellComponent, RouterOutlet, AsyncPipe],
})
export class App implements OnInit {
  protected readonly router = inject(Router);
  protected readonly localStorageService = inject(LocalStorageService);
  protected readonly authService = inject(AuthService);
  protected readonly notificacaoService = inject(NotificacaoService);

  ngOnInit(): void {
    const token = this.localStorageService.obterAccessToken();

    if (!token) return;

    const tokenValido = new Date(token.expiracao) > new Date();

    if (tokenValido) this.authService.accessTokenSubject$.next(token);
  }

  public sair() {
    const logOutObserver: PartialObserver<null> = {
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/auth/login']),
    };

    this.authService.sair().subscribe(logOutObserver);
  }
}

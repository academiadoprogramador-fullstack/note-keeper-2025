import { map } from 'rxjs';

import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { CanActivateFn, provideRouter, Router, Routes } from '@angular/router';

import { provideAuth } from './components/auth/auth.provider';
import { AuthService } from './components/auth/auth.service';
import { provideNotifications } from './components/shared/notificacao/notificacao.provider';

// retorna verdadeiro quando EXISTE um usuário autenticado
const usuarioDesconhecidoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.accessToken$.pipe(
    map((token) => (!token ? true : router.createUrlTree(['/inicio']))),
  );
};

const usuarioAutenticadoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.accessToken$.pipe(
    map((token) => (token ? true : router.createUrlTree(['/auth/login']))),
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then((r) => r.authRoutes),
    canActivate: [usuarioDesconhecidoGuard],
  },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((c) => c.Inicio),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./components/categorias/categoria.routes').then((r) => r.categoriaRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'notas',
    loadChildren: () => import('./components/notas/nota.routes').then((r) => r.notaRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),

    provideNotifications(),
    provideAuth(),
  ],
};

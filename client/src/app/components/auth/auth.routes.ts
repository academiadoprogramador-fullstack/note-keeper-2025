import { Routes } from '@angular/router';

import { AuthService } from './auth.service';
import { Login } from './login/login';
import { Registro } from './registro/registro';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: Login },
      { path: 'registro', component: Registro },
    ],
    providers: [AuthService],
  },
];

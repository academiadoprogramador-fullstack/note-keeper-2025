import { Routes } from '@angular/router';

import { CadastrarNota } from './cadastrar/cadastrar-nota';
import { ListarNotas } from './listar/listar-notas';
import { NotaService } from './nota.service';

export const notaRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListarNotas },
      { path: 'cadastrar', component: CadastrarNota },
    ],
    providers: [NotaService],
  },
];

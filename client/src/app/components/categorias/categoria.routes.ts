import { Routes } from '@angular/router';

import { CadastrarCategoria } from './cadastrar/cadastrar-categoria';
import { ListarCategorias } from './listar/listar-categorias';

export const categoriaRoutes: Routes = [
  { path: '', component: ListarCategorias },
  { path: 'cadastrar', component: CadastrarCategoria },
];

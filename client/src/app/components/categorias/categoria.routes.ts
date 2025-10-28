import { Routes } from '@angular/router';

import { CadastrarCategoria } from './cadastrar/cadastrar-categoria';
import { EditarCategoria } from './editar/editar-categoria';
import { ExcluirCategoria } from './excluir/excluir-categoria';
import { ListarCategorias } from './listar/listar-categorias';

export const categoriaRoutes: Routes = [
  { path: '', component: ListarCategorias },
  { path: 'cadastrar', component: CadastrarCategoria },
  { path: 'editar/:id', component: EditarCategoria },
  { path: 'excluir/:id', component: ExcluirCategoria },
];

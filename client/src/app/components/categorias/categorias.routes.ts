import { Routes } from '@angular/router';

import { CadastrarCategoria } from './cadastrar-categoria/cadastrar-categoria';
import { EditarCategoria } from './editar-categoria/editar-categoria';
import { ExcluirCategoria } from './excluir-categoria/excluir-categoria';
import { ListagemCategorias } from './listagem-categorias/listagem-categorias';

export const categoriasRoutes: Routes = [
  { path: '', component: ListagemCategorias },
  { path: 'cadastrar', component: CadastrarCategoria },
  { path: 'editar/:id', component: EditarCategoria },
  { path: 'excluir/:id', component: ExcluirCategoria },
];

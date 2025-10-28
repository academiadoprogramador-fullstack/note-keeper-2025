import { Routes } from '@angular/router';

import { CadastrarCategoria } from './cadastrar/cadastrar-categoria';
import { CategoriaService } from './categoria.service';
import { ListarCategorias } from './listar/listar-categorias';

export const categoriaRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListarCategorias },
      { path: 'cadastrar', component: CadastrarCategoria },
    ],
    providers: [CategoriaService],
  },
];

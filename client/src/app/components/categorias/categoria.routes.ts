import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { CadastrarCategoria } from './cadastrar/cadastrar-categoria';
import { CategoriaService } from './categoria.service';
import { EditarCategoria } from './editar/editar-categoria';
import { ExcluirCategoria } from './excluir/excluir-categoria';
import { ListagemCategorias } from './listar/listagem-categorias';

const listagemCategoriasResolver = () => {
  const categoriaService = inject(CategoriaService);

  return categoriaService.selecionarTodas();
};

const detalhesCategoriasResolver = (route: ActivatedRouteSnapshot) => {
  const categoriaService = inject(CategoriaService);

  const id = route.paramMap.get('id');

  if (!id) throw new Error('O parâmetro de rota ":id" não é legível.');

  return categoriaService.selecionarPorId(id);
};

export const categoriaRoutes: Routes = [
  {
    path: '',
    component: ListagemCategorias,
    resolve: { categorias: listagemCategoriasResolver },
  },
  {
    path: 'cadastrar',
    component: CadastrarCategoria,
  },
  {
    path: 'editar/:id',
    component: EditarCategoria,
    resolve: { categoria: detalhesCategoriasResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirCategoria,
    resolve: { categoria: detalhesCategoriasResolver },
  },
];

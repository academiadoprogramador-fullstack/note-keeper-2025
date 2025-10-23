import { filter, map, Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ListagemCategoriasModel } from '../categoria.models';

@Component({
  selector: 'app-listagem-categorias',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule, RouterLink, AsyncPipe],
  templateUrl: './listagem-categorias.html',
})
export class ListagemCategorias {
  private readonly route = inject(ActivatedRoute);

  protected readonly categorias$: Observable<ListagemCategoriasModel[]> = this.route.data.pipe(
    filter((data) => data['categorias']),
    map((data) => data['categorias'] as ListagemCategoriasModel[]),
  );
}

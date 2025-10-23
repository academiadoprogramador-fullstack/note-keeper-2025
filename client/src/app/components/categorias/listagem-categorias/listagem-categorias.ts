import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { CategoriaService } from '../categoria.service';
import { ListagemCategoriasModel } from '../categorias.models';

@Component({
  selector: 'app-listagem-categorias',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule, RouterLink, AsyncPipe],
  templateUrl: './listagem-categorias.html',
})
export class ListagemCategorias {
  private readonly categoriaService = inject(CategoriaService);

  protected readonly categorias$?: Observable<ListagemCategoriasModel[]> =
    this.categoriaService.selecionarTodas();
}

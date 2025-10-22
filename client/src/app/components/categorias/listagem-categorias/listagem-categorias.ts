import { Observable, of } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { ListagemCategoriasModel } from '../categorias.models';

@Component({
  selector: 'app-listagem-categorias',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule, RouterLink, AsyncPipe],
  templateUrl: './listagem-categorias.html',
})
export class ListagemCategorias {
  protected readonly categorias$?: Observable<ListagemCategoriasModel[]> = of([
    { id: 'e1b83bfc-bb34-4a59-830f-a35aa02e7274', titulo: 'Lembretes' },
    { id: '5fe30afd-9701-4940-8041-e034a62b9b79', titulo: 'Faculdade' },
  ]);
}

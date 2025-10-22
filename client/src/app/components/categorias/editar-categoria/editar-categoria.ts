import { Observable, of } from 'rxjs';

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { DetalhesCategoriasModel } from '../categorias.models';

@Component({
  selector: 'app-editar-categoria',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './editar-categoria.html',
})
export class EditarCategoria {
  protected readonly categoria$: Observable<DetalhesCategoriasModel> = of({
    id: 'e1b83bfc-bb34-4a59-830f-a35aa02e7274',
    titulo: 'Mercado',
  });

  public editar() {}
}

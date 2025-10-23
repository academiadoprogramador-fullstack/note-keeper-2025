import {
    filter, finalize, map, Observable, PartialObserver, shareReplay, switchMap, take
} from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { DetalhesCategoriasModel } from '../categoria.models';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-excluir-categoria',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './excluir-categoria.html',
})
export class ExcluirCategoria {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);

  protected readonly categoria$: Observable<DetalhesCategoriasModel> = this.route.data.pipe(
    filter((data) => data['categoria']),
    map((data) => data['categoria'] as DetalhesCategoriasModel),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public excluir() {
    const exclusaoObserver: PartialObserver<null> = {
      error: (err) => console.error('Ocorreu um erro inesperado.', err),
    };

    this.categoria$
      .pipe(
        take(1),
        switchMap((categoria) => this.categoriaService.excluir(categoria.id)),
        finalize(() => this.router.navigate(['/categorias'])),
      )
      .subscribe(exclusaoObserver);
  }
}

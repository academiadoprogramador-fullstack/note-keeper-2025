import {
    filter, finalize, map, Observable, PartialObserver, shareReplay, switchMap, take
} from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CategoriaService } from '../categoria.service';
import { DetalhesCategoriasModel } from '../categorias.models';

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
  ],
  templateUrl: './excluir-categoria.html',
})
export class ExcluirCategoria {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);

  protected readonly categoria$: Observable<DetalhesCategoriasModel> = this.route.paramMap.pipe(
    filter((params) => params.has('id')),
    map((params) => params.get('id')!),
    switchMap((id) => this.categoriaService.selecionarPorId(id)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public excluir() {
    const exclusaoObserver: PartialObserver<void> = {
      next: (res) => console.log(res),
      error: (err) => console.error(err),
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

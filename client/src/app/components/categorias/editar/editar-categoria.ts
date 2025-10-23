import {
    filter, finalize, map, Observable, PartialObserver, shareReplay, switchMap, take, tap
} from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
    DetalhesCategoriasModel, EditarCategoriaModel, EditarCategoriaResponseModel
} from '../categoria.models';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-editar-categoria',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-categoria.html',
})
export class EditarCategoria {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);

  protected readonly categoriaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  protected readonly categoria$: Observable<DetalhesCategoriasModel> = this.route.data.pipe(
    filter((data) => data['categoria']),
    map((data) => data['categoria'] as DetalhesCategoriasModel),
    tap((categoria) => this.categoriaForm.patchValue(categoria)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public editar() {
    if (this.categoriaForm.invalid) return;

    const editarCategoriaModel: EditarCategoriaModel = this.categoriaForm.value;

    const edicaoObserver: PartialObserver<EditarCategoriaResponseModel> = {
      next: (res) => console.log(res),
      error: (err) => console.error('Ocorreu um erro inesperado.', err),
    };

    this.categoria$
      .pipe(
        take(1),
        switchMap((categoria) => this.categoriaService.editar(categoria.id, editarCategoriaModel)),
        finalize(() => this.router.navigate(['/categorias'])),
      )
      .subscribe(edicaoObserver);
  }
}

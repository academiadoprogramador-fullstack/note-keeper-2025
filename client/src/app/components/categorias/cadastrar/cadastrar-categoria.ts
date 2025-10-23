import { finalize, PartialObserver } from 'rxjs';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { CadastrarCategoriaModel, CadastrarCategoriaResponseModel } from '../categoria.models';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-categoria.html',
})
export class CadastrarCategoria {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);

  protected readonly categoriaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  public cadastrar() {
    if (this.categoriaForm.invalid) return;

    const cadastrarCategoriaModel: CadastrarCategoriaModel = this.categoriaForm.value;

    const cadastroObserver: PartialObserver<CadastrarCategoriaResponseModel> = {
      next: (res) => console.log(res),
      error: (err) => console.error('Ocorreu um erro inesperado.', err),
    };

    this.categoriaService
      .cadastrar(cadastrarCategoriaModel)
      .pipe(finalize(() => this.router.navigate(['/categorias'])))
      .subscribe(cadastroObserver);
  }
}

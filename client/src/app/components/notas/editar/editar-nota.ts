import { filter, map, Observable, Observer, shareReplay, switchMap, take, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CategoriaService } from '../../categorias/categoria.service';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { DetalhesNotaModel, EditarNotaModel, EditarNotaResponseModel } from '../nota.models';
import { NotaService } from '../nota.service';

@Component({
  selector: 'app-editar-nota',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-nota.html',
})
export class EditarNota {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly categoriaService = inject(CategoriaService);
  protected readonly notaService = inject(NotaService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected notaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    conteudo: [''],
    categoriaId: ['', [Validators.required]],
  });

  get titulo() {
    return this.notaForm.get('titulo');
  }

  get conteudo() {
    return this.notaForm.get('conteudo');
  }

  get categoriaId() {
    return this.notaForm.get('categoriaId');
  }

  protected readonly nota$: Observable<DetalhesNotaModel> = this.route.data.pipe(
    filter((data) => data['nota']),
    map((data) => data['nota'] as DetalhesNotaModel),
    tap((nota) => this.notaForm.patchValue({ ...nota, categoriaId: nota.categoria.id })),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected readonly categorias$ = this.categoriaService.selecionarTodas();

  public editar() {
    if (this.notaForm.invalid) return;

    const editarCategoriaModel: EditarNotaModel = this.notaForm.value;

    const edicaoObserver: Observer<EditarNotaResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `O registro "${editarCategoriaModel.titulo}" foi editado com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/notas']),
    };

    this.nota$
      .pipe(
        take(1),
        switchMap((categoria) => this.notaService.editar(categoria.id, editarCategoriaModel)),
      )
      .subscribe(edicaoObserver);
  }
}

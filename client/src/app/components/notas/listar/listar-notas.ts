import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { NotaService } from '../nota.service';

@Component({
  selector: 'app-listar-notas',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, RouterLink, AsyncPipe],
  templateUrl: './listar-notas.html',
})
export class ListarNotas {
  protected readonly notaService = inject(NotaService);

  protected readonly notas$ = this.notaService.selecionarTodas();
}

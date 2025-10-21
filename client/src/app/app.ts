import { Component } from '@angular/core';

import { ShellComponent } from './components/shell/shell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ShellComponent],
})
export class App {}

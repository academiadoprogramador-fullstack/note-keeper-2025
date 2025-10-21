import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ShellComponent } from './components/shell/shell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ShellComponent, RouterOutlet],
})
export class App {}

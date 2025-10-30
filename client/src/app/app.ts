import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ShellComponent } from './components/shared/shell/shell.component';

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <router-outlet></router-outlet>
    </app-shell>
  `,
  imports: [ShellComponent, RouterOutlet],
})
export class App {}

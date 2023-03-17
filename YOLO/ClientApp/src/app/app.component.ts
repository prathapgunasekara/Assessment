import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }

      .title {
        cursor: pointer;
      }

      .welcome-text {
        font-size: smaller;
      }

      .mat-toolbar.mat-primary {
        background: #3f51b5;
        color: #fff;
      }
    `,
  ],
})
export class AppComponent {
  title = 'app';
}

import { Component } from '@angular/core';
import { Layout } from './templates/layout';

@Component({
    selector: 'app-root',
    imports: [Layout],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'showcase';
}

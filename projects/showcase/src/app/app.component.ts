import { Component } from '@angular/core';
import { Layout } from './templates/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'showcase';
}

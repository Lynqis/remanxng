import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './templates/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Layout],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remanxng';
}

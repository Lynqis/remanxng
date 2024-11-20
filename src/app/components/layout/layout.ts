import {
  Component,
  Input,
  PLATFORM_ID,
  inject,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'rx-layout',
  template: `
    <div class="rx-layout-container overflow-hidden">
      <div class="absolute-full">
        <div class="scroll">
          <div [class]="classes" tabindex="-1">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./layout.css'],
})
export class RxLayout implements OnInit {
  private platformId: any = inject(PLATFORM_ID);

  @Input() container: boolean = false;
  @Input() view: string = 'hhh scc fff';

  layoutConfig: any = {};

  height$ = new BehaviorSubject<number>(0);
  width$ = new BehaviorSubject<number>(0);

  classes: string = '';
  style: any = {};

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeLayout();
    }
  }

  initializeLayout() {
    this.parseView();
    this.height$.next(window.innerHeight);
    this.width$.next(window.innerWidth);

    this.classes = this.container
      ? 'rx-layout rx-layout--containerized'
      : 'rx-layout rx-layout--standard';

    this.classes += ` layout-${this.layoutConfig.header}-${this.layoutConfig.body}-${this.layoutConfig.footer}`;

    this.style = this.container
      ? null
      : { minHeight: `${window.innerHeight}px` };
  }

  parseView() {
    const viewParts = this.view.split(' ');
    this.layoutConfig = {
      header: viewParts[0] || '',
      body: viewParts[1] || '',
      footer: viewParts[2] || '',
    };
  }
}

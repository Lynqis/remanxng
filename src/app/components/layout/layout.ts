import {
  Component,
  Input,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
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
  styleUrls: ['./layout.scss'],
})
export class QLayoutComponent implements AfterViewInit {
  @Inject(PLATFORM_ID) private platformId: any;

  @Input() container: boolean = false;
  @Input() view: string = 'hhh lpr fff';

  layoutConfig: any = {};

  height$ = new BehaviorSubject<number>(0);
  width$ = new BehaviorSubject<number>(0);

  classes: string = '';
  style: any = {};

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeLayout();
    }
  }

  initializeLayout() {
    this.height$.next(window.innerHeight);
    this.width$.next(window.innerWidth);

    this.classes = this.container
      ? 'rx-layout rx-layout--containerized'
      : 'rx-layout rx-layout--standard';
    this.style = this.container
      ? null
      : { minHeight: `${window.innerHeight}px` };
  }

  parseView() {
    const viewParts = this.view.split(' ');
    this.layoutConfig = {
      header: viewParts[0] || '', // Ex : 'hhh'
      body: viewParts[1] || '', // Ex : 'lpr'
      footer: viewParts[2] || '', // Ex : 'fff'
    };
  }
}

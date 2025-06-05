import {
  Component,
  Input,
  PLATFORM_ID,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnDestroy,
  Signal,
  effect,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LayoutService } from './layout.service';

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
  imports: [],
  styleUrls: ['./layout.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxLayout implements OnInit, OnChanges, OnDestroy {
  private platformId: any = inject(PLATFORM_ID);
  private _layout: LayoutService = inject(LayoutService);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() container: boolean = false;
  @Input() view: string = 'hhh scc fff';

  layoutConfig: any = {};

  height$ = new BehaviorSubject<number>(0);
  width$ = new BehaviorSubject<number>(0);

  classes: string = '';
  style: any = {};
  positionSidebar: string = '';
  noSidebarClasse: string = 'layout-hhh-ccc-fff';

  sidebarVisible: Signal<boolean> = this._layout.sidebarVisible;

  constructor() {
    effect(() => {
      this.initializeLayout();
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeLayout(true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      this.initializeLayout();
    }
  }

  ngOnDestroy(): void {}

  initializeClasses() {
    this.classes = 'rx-layout';
  }

  initializeLayout(init?: boolean) {
    this.initializeClasses();
    this.height$.next(window.innerHeight);
    this.width$.next(window.innerWidth);
    this.declarePositionSidebar();

    this.style = this.container
      ? null
      : { minHeight: `${window.innerHeight}px` };

    this.cd.markForCheck();
  }

  hasSidebar(): boolean {
    return this.view.includes('s');
  }

  splitView(): [string, string, string] {
    const [header, body, footer] = this.view.split(' ');
    return [header, body, footer];
  }

  checkPositionSidebar(): string {
    if (!this.hasSidebar()) return 'none';

    const [header, body, footer] = this.splitView();

    const sidebarLeft =
      header.startsWith('s') || body.startsWith('s') || footer.startsWith('s');
    const sidebarRight =
      header.endsWith('s') || body.endsWith('s') || footer.endsWith('s');

    if (sidebarLeft && sidebarRight) return 'both';
    if (sidebarLeft) return 'left';
    if (sidebarRight) return 'right';
    return 'none';
  }

  declarePositionSidebar() {
    const position = this.checkPositionSidebar();

    switch (position) {
      case 'both':
        throw new Error('Cannot have two sidebars');
      case 'left':
        this.positionSidebar = 'left';
        break;
      case 'right':
        this.positionSidebar = 'right';
        break;
      default:
        this.positionSidebar = 'none';
        break;
    }

    const [header, body, footer] = this.splitView();

    if (position === 'none') {
      this.classes += ' layout-no-sidebar ' + this.noSidebarClasse;
      return;
    }

    this.classes += ` layout-${header}-${body}-${footer}`;

    if (!this._layout.sidebarVisible() && position !== 'none') {
      this.classes += ' layout-no-sidebar';
      this.classes += `-${this.positionSidebar}`;
    } else if (
      this._layout.sidebarVisible() &&
      this._layout.sidebarShrink() &&
      this._layout.isShrink()
    ) {
      this.classes += ` layout-sidebar-${this.positionSidebar}-shrink`;
    } else {
      this.classes += ` layout-sidebar-${this.positionSidebar}-fullwidth`;
    }

    // Add animations
    if (this._layout.sidebarShrink()) {
      this.classes += ' layout-sidebar-anim-shrink';
    } else {
      this.classes += ' layout-sidebar-anim-opacity';
    }
  }

  onToggleSidebar() {
    this._layout.toggleSidebar();
  }
}

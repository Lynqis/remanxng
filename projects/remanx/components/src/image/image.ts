import { Component, HostListener, Input } from '@angular/core';
import { BaseComponent } from '../base/basecomponent';
import { ImageOptions, VoidListener } from '@lynqis/remanxng/api';
import { RxIcon } from '../icon';
import { RxButton } from '../button';

@Component({
  selector: 'rx-image',
  template: `
    <span class="rx-image">
      <img
        [attr.src]="image.src ?? src"
        [attr.width]="image.width ?? $width"
        [attr.height]="image.height ?? $height"
      />

      @if(preview) {
      <button class="rx-image-button-preview" (click)="clickPreview()">
        <rx-icon [iconJson]="'search'" [stroke]="'#ccc'" />
      </button>
      }
    </span>
    @if(maskVisible) {
      <div class="rx-image-mask">
        <div class="rx-image-toolbar">
          <rx-button
            [severity]="'contrast'"
            [classes]="'rx-toolbar-button'"
            (click)="close()"
            [hidden]="true"
            ><rx-icon [iconJson]="'upload'" [svgClasses]="'rx-toolbar-icon'"
          /></rx-button>
          <rx-button
            [severity]="'contrast'"
            [classes]="'rx-toolbar-button'"
            (click)="close()"
            [hidden]="true"
            ><rx-icon [iconJson]="'info'" [svgClasses]="'rx-toolbar-icon'"
          /></rx-button>
          <rx-button
            [severity]="'contrast'"
            [classes]="'rx-toolbar-button'"
            (click)="close()"
            [hidden]="true"
            ><rx-icon [iconJson]="'x'" [svgClasses]="'rx-toolbar-icon'"
          /></rx-button>
        </div>
        <div class="rx-image-original">
          <img [attr.src]="image.src ?? src" [alt]="image.alt ?? alt" />
        </div>
      </div>
      }
  `,
  styleUrls: ['./image.css'],
  imports: [RxIcon, RxButton],
})
export class RxImage extends BaseComponent {
  @Input() src: string = '';
  @Input() $width: string = '200px';
  @Input() $height: string = 'auto';
  @Input() image: ImageOptions = {};
  @Input() alt: string = '';
  @Input() preview: boolean = false;

  maskVisible: boolean = false;

  documentEscapeListener: VoidListener;

  constructor() {
    super();
  }

  clickPreview() {
    this.maskVisible = true;
  }

  close() {
    this.maskVisible = false;
  }

  @HostListener('document:keydown', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

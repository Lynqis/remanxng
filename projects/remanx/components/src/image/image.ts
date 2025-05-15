import { Component, HostListener, Input } from "@angular/core";
import { BaseComponent } from "../base/basecomponent";
import { VoidListener } from "@lynqis/remanxng/api";
import { RxIcon } from "../icon";
import { RxButton } from "../button";

@Component({
  selector: 'rx-image',
  template: `
    <span class="rx-image">
      <img [attr.src]="src" [attr.width]="width" [attr.height]="height">

      @if(preview) {
        <button class="rx-image-button-preview" (click)="clickPreview()">
          +
        </button>
      }

      @if(maskVisible) {
        <div class="rx-image-mask">
          <div class="rx-image-toolbar">
            <rx-button
                [severity]="'contrast'"
                class=""
                (click)="close()"
                ><rx-icon [iconJson]="'x'" /></rx-button
              >
          </div>
          <div class="rx-image-original">
            <img [attr.src]="src">
          </div>
        </div>
      }
    </span>
  `,
  styleUrls: ['./image.css'],
  imports: [RxIcon, RxButton]
})
export class RxImage extends BaseComponent {
  @Input() src: string | undefined;
  @Input() width: string = '200px';
  @Input() height: string = 'auto';
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

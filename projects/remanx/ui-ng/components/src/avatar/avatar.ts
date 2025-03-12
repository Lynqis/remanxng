import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '../base/basecomponent';
import { NgClass, NgIf } from '@angular/common';

/**
 * Avatar represents people using icons, labels and images.
 * @group Components
 */
@Component({
  selector: 'rx-avatar',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <ng-content></ng-content>
    <span class="rx-avatar-text" *ngIf="label; else iconTemplate">{{
      label
    }}</span>
    <ng-template #iconTemplate
      ><span
        [class]="icon"
        [ngClass]="'rx-avatar-icon'"
        *ngIf="icon; else imageTemplate"
      ></span
    ></ng-template>
    <ng-template #imageTemplate>
      <img
        [src]="image"
        *ngIf="image"
        (error)="imageError($event)"
        [attr.aria-label]="ariaLabel"
    /></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.rx-avatar]': 'true',
    '[class.rx-avatar-circle]': 'shape === "circle"',
    '[class.rx-avatar-image]': 'image != null',
    '[attr.data-pc-name]': '"avatar"',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-labelledby]': 'ariaLabelledBy',
    '[style]': '_style',
  },
  providers: [],
  styleUrls: ['./avatar.css']
})
export class RxAvatar extends BaseComponent {
  /**
   * Defines the text to display.
   * @group Props
   */
  @Input() label: string | undefined;
  /**
   * Defines the icon to display.
   * @group Props
   */
  @Input() icon: string | undefined;
  /**
   * Defines the image to display.
   * @group Props
   */
  @Input() image: string | undefined;
  /**
   * Size of the element.
   * @group Props
   */
  @Input() size: 'normal' | 'large' | 'xlarge' = 'normal';
  /**
   * Shape of the element.
   * @group Props
   */
  @Input() shape: 'square' | 'circle' = 'circle';
  /**
   * Inline style of the element.
   * @group Props
   */
  @Input() _style: { [klass: string]: any } | null | undefined;
  /**
   * Class of the element.
   * @group Props
   */
  @Input() _class: string | undefined;
  /**
   * Establishes a string value that labels the component.
   * @group Props
   */
  @Input() ariaLabel: string | undefined;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  @Input() ariaLabelledBy: string | undefined;
  /**
   * This event is triggered if an error occurs while loading an image file.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  @Output() onImageError: EventEmitter<Event> = new EventEmitter<Event>();

  imageError(event: Event) {
    this.onImageError.emit(event);
  }

  @HostBinding('class') get hostClass(): any {
    return this._class;
  }
}

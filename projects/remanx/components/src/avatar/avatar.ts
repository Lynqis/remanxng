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
import { NgClass } from '@angular/common';

@Component({
  selector: 'rx-avatar',
  standalone: true,
  imports: [NgClass],
  template: `
    <ng-content></ng-content>
    @if (label) {
    <span class="rx-avatar-text">{{ label }}</span>
    } @else { @if (icon) {
    <span [class]="icon" [ngClass]="'rx-avatar-icon'"></span>
    } @else {
    <img
      [src]="image"
      (error)="imageError($event)"
      [attr.aria-label]="ariaLabel"
    />
    } }
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
    '[style]': '$style',
    '[class.rx-avatar-default]': '!$style && !$class'
  },
  providers: [],
  styleUrls: ['./avatar.css'],
})
export class RxAvatar extends BaseComponent {
  @Input() label: string | undefined;
  @Input() icon: string | undefined;
  @Input() image: string | undefined;
  @Input() size: 'normal' | 'large' | 'xlarge' = 'normal';
  @Input() shape: 'square' | 'circle' = 'circle';
  @Input() $style: { [klass: string]: any } | null | undefined;
  @Input() $class: string | undefined;
  @Input() ariaLabel: string | undefined;
  @Input() ariaLabelledBy: string | undefined;
  @Output() onImageError: EventEmitter<Event> = new EventEmitter<Event>();

  imageError(event: Event) {
    this.onImageError.emit(event);
  }

  @HostBinding('class') get hostClass(): any {
    return this.$class;
  }
}

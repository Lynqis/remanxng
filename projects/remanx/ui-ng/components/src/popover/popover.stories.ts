import { Meta, moduleMetadata } from "@storybook/angular";
import { RxButton } from "../button";
import { RxPopover } from "./popover";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Surfaces/RxPopover',
  component: RxPopover,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RxButton,
        BrowserAnimationsModule
      ],
    }),
  ]
} as Meta<RxPopover>;

export const Default = (args: RxPopover) => ({
  component: RxPopover,
  template: `
    <rx-button (click)="op.toggle($event, button)" [label]="'Open a modal'"></rx-button>
    <rx-overlaypanel #op [$height]="'200px'" [$width]="'50%'">
      <h1>Popover</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
    </rx-overlaypanel>
  `,
  props: {
    ...args
  }
});



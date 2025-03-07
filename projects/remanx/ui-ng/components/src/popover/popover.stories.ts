import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { RxButton } from "../button";
import { RxPopover } from "./popover";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<RxPopover> = {
  title: 'Overlay/RxPopover',
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
}

export default meta;
type Story = StoryObj<RxPopover>;

export const Default: Story = {
  render: () => ({
    template: `
      <rx-button (click)="op.toggle($event, button)" [lbel]="'Open a modal'"></rx-button>
      <rx-popover #op [$height]="'200px'" [$width]="'50%'">
        <h1>Popover</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
      </rx-popover>
    `
  })
};



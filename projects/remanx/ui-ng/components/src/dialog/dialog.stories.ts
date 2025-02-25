import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { RxDialog } from "./dialog";
import { RxButton } from "../button";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<RxDialog> = {
  title: 'Surfaces/RxDialog',
  component: RxDialog,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RxButton,
        BrowserAnimationsModule
      ],
      providers: [
        provideAnimations()
      ]
    }),
  ]
}

export default meta;
type Story = StoryObj<RxDialog>;

export const Default: Story = {
  render: () => {
    return {
      template: `
        <rx-button (click)="pop.toggle()" [label]="'Open a modal'"></rx-button>
        <rx-dialog #pop (visibleChange)="true">
          <p>This is a modal dialog</p>
        </rx-dialog>
      `
    };
  }
};



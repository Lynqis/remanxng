import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { RxDialog } from './dialog';
import { RxButton } from '../button';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<RxDialog> = {
  title: 'Overlay/RxDialog',
  component: RxDialog,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RxButton],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<RxDialog>;

export const Default: Story = {
  render: () => {
    return {
      template: `
        <rx-button (click)="pop.toggle()" [label]="'Open a modal'"></rx-button>
        <rx-dialog #pop (visibleChange)="true">
          <p style="width: 900px">This is a modal dialog</p>
        </rx-dialog>
      `,
    };
  },
};

export const ConfirmDialog: Story = {
  render: () => {
    return {
      template: `
        <rx-button (click)="pop.showConfirmDialog()" [label]="'Open Confirm Dialog'"></rx-button>
        <rx-dialog #pop [confirmDialog]="true" [label]="'Confirm Action'">
          <p>Are you sure you want to proceed?</p>
        </rx-dialog>
      `,
    };
  },
};

export const ConfirmTemplateDialog: Story = {
  render: () => {
    return {
      template: `
        <rx-button (click)="pop.showConfirmDialog()" [label]="'Open Confirm Dialog'"></rx-button>
        <rx-dialog #pop [confirmDialog]="true" [label]="'Confirm Action'">
          <p>Are you sure you want to proceed?</p>
          <ng-template #confirm>
            <rx-button [severity]="'contrast'" (click)="pop.cancel()"
              >Cancel</rx-button
            >
            <rx-button [severity]="'error'" (click)="pop.confirm()"
              >Delete</rx-button
            >
          </ng-template>
        </rx-dialog>
      `,
    };
  },
};

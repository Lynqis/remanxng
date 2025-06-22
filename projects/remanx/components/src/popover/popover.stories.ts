import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { RxButton } from '../button';
import { RxPopover } from './popover';

const meta: Meta<RxPopover> = {
  title: 'Overlay/RxPopover',
  component: RxPopover,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RxButton],
    }),
  ],
};

export default meta;
type Story = StoryObj<RxPopover>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="">
        <div style="top: 0;">
          <div>
            <rx-button (click)="op.toggle($event, button)" [label]="'Open a modal'" style="position: absolute; left: 0; top: 0;"></rx-button>
            <rx-popover #op>
              <h1>Popover</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </rx-popover>
          </div>

          <div >
            <rx-button (click)="op2.toggle($event, button)" [label]="'Open a modal'" style="position: absolute; right: 0; top: 0;"></rx-button>
            <rx-popover #op2 [$style]="'width: 300px'">
              <h1>Popover</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </rx-popover>
          </div>
        <div>
        <div style="top: 50vh; display: flex; justify-content: center;">
          <div>
            <rx-button (click)="op5.toggle($event, button)" [label]="'Open a modal'" style=""></rx-button>
            <rx-popover #op5 [$style]="'width: 300px'">
              <h1>Popover</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </rx-popover>
          </div>

          <div >
            <rx-button (click)="op6.toggle($event, button)" [label]="'Open a modal'" style=""></rx-button>
            <rx-popover #op6 [$style]="'width: 300px'">
              <h1>Popover</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </rx-popover>
          </div>
        <div>
        <div style="">
          <div >
            <rx-button (click)="op3.toggle($event, button)" [label]="'Open a modal'" style="position: absolute; left: 0; bottom: 0;"></rx-button>
            <rx-popover #op3>
              <h1>Popover</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </rx-popover>
          </div>

          <div >
            <rx-button (click)="op4.toggle($event, button)" [label]="'Open a modal'" style="position: absolute; right: 0; bottom: 0;"></rx-button>
            <rx-popover #op4>
              <h1>Popover</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </rx-popover>
          </div>
        <div>
      </div>
    `,
  }),
};

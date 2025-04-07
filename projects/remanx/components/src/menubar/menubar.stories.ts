import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { RxButton } from '../button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RxMenuBar } from './menubar';
import { items } from './data';

const meta: Meta<RxMenuBar> = {
  title: 'Menu/RxMenuBar',
  component: RxMenuBar,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RxButton, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<RxMenuBar>;

export const MenuBar: Story = {
  render: () => ({
    props: {
      model: items
    },
    template: `
      <rx-menubar [model]="model"></rx-menubar>
    `,
  }),
};

export const Menu: Story = {
  render: () => ({
    props: {
      model: items,
      direction: 'column'
    },
    template: `
      <rx-menubar [model]="model" [direction]="direction"></rx-menubar>
    `,
  }),
}

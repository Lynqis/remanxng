import { Meta, StoryObj } from '@storybook/angular';
import { RxButton } from './button';

export default {
  title: 'Buttons/RxButton',
  component: RxButton,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'help', 'contrast'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
    type: { control: 'text' },
    hidden: { control: 'boolean' },
    noStyle: { control: 'boolean' }
  },
} as Meta<RxButton>;

type Story = StoryObj<RxButton>;

export const Default: Story = {
  args: {
    label: 'Primary',
    severity: 'primary',
    disabled: false,
    loading: false,
    hidden: false,
    noStyle: false,
    type: 'button'
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    severity: 'primary',
    disabled: true,
    loading: false,
  },
};

export const NoStyle: Story = {
  args: {
    label: 'Loading',
    severity: 'secondary',
    disabled: false,
    loading: false,
    noStyle: true
  },
};

export const ColorShowcase: Story = {
  render: (args) => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <rx-button *ngFor="let color of colors"
          [severity]="color"
          label="{{ color | titlecase }}"
          [disabled]="false">
        </rx-button>
      </div>
    `,
    props: {
      colors: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'help', 'contrast'],
    },
  }),
};

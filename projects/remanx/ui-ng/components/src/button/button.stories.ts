import { Meta, StoryFn, StoryObj } from '@storybook/angular';
import { RxButton } from './button';

export default {
  title: 'Components/RxButton',
  component: RxButton,
  tags: ['autodocs'], // Si vous utilisez les addons de documentation automatique
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger'], // Adaptez en fonction des valeurs possibles
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
    type: { control: 'text' },
  },
} as Meta<RxButton>;

type Story = StoryObj<RxButton>;

export const Default: Story = {
  args: {
    label: 'Primary',
    severity: 'primary',
    disabled: false,
    loading: false,
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

export const Loading: Story = {
  args: {
    label: 'Loading',
    severity: 'secondary',
    disabled: false,
    loading: true,
  },
};

export const ColorShowcase = () => ({
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
    colors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'], // Toutes vos couleurs ici
  },
});

import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { RxToast } from './toast';
import { ToastMessage } from '@lynqis/remanxng/api';

export default {
  title: 'Messages/RxToast',
  component: RxToast,
  decorators: [
    moduleMetadata({
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'RxToast is a customizable toast notification component that displays feedback messages to users.'
      }
    }
  }
} as Meta;
type Story = StoryObj<RxToast>;

const messages: ToastMessage[] = [
  {
    severity: 'success',
    title: 'Success!',
    content: 'This is a success toast notification.'
  }
]

export const Default: Story = {
  args: {
    messages: messages
  },
  render: (args) => ({
    props: {
      ...args,
      messages: messages
    },
    template: `
      <rx-toast [messages]="messages"></rx-toast>
    `
  }),
  parameters: {
    docs: {
      storyDescription: 'The default toast notification displays a success message.'
    }
  }
}

export const ColorShowcase: Story = {
  args: {
    messages: messages
  },
  render: (args) => ({
    template: `
      <rx-toast [messages]="messages">
      </rx-toast>
    `,
    props: {
      ...args,
      messages: [
        {
          title: 'Success',
          content: 'This is a success toast notification.',
          severity: 'success'
        },
        {
          title: 'Warning',
          content: 'This is a warning toast notification.',
          severity: 'warning'
        },
        {
          title: 'Error',
          content: 'This is an error toast notification.',
          severity: 'error'
        },
        {
          title: 'Info',
          content: 'This is an info toast notification.',
          severity: 'info'
        },
        {
          title: 'Secondary',
          content: 'This is a secondary toast notification.',
          severity: 'secondary'
        },
        {
          title: 'Contrast',
          content: 'This is a contrast toast notification.',
          severity: 'contrast'
        }
      ]
    }
  }),
  parameters: {
    docs: {
      storyDescription: 'Showcases different severity types of toast notifications for visual differentiation.'
    }
  }
}

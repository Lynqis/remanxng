import { applicationConfig, Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { RxAvatar } from "./avatar";

const meta: Meta<RxAvatar> = {
  title: 'Misc/RxAvatar',
  component: RxAvatar,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
      ],
    }),
    applicationConfig({
      providers: [
      ]
    })
  ]
}

export default meta;
type Story = StoryObj<RxAvatar>;

export const Default: Story = {
  render: () => {
    return {
      template: `
        <rx-avatar label="X"></rx-avatar>
      `
    };
  }
};



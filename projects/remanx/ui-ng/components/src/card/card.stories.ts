import { applicationConfig, Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { RxCard } from "./card";

const meta: Meta<RxCard> = {
  title: 'Surfaces/RxCard',
  component: RxCard,
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
type Story = StoryObj<RxCard>;

export const Default: Story = {
  render: () => {
    return {
      template: `
        <rx-card>
          <h1>This is a card</h1>
          <p>content</p>
          <h4>footer</h4>
        </rx-card>
      `
    };
  }
};



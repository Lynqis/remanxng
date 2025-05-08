import { applicationConfig, Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { RxIcon } from "./icon";

const meta: Meta<RxIcon> = {
  title: 'Misc/RxIcon',
  component: RxIcon,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: []
    }),
    applicationConfig({
      providers: [],
    }),
  ],
};

export default meta;
type Story = StoryObj<RxIcon>;


export const SimpleExemple: Story = {
  render: () => ({
    template: `
    <rx-icon [iconName]="'home'" />
    <rx-icon [iconName]="'eye'" />
    <rx-icon [iconName]="'info'" />
    <rx-icon [iconName]="'menu'" />
    <rx-icon [iconName]="'save'" />
    `
  })
}

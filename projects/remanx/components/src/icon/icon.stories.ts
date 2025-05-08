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
    <div style="display: flex; gap: 5px;">
      <rx-icon [iconJson]="'home'" />
      <rx-icon [iconJson]="'eye'" [stroke]="'red'" />
      <rx-icon [iconJson]="'info'" [thickness]="'3'" />
      <rx-icon [iconJson]="'menu'" [stroke]="'green'" />
      <rx-icon [iconJson]="'save'" [fill]="'red'" />
    </div>
    `
  })
}

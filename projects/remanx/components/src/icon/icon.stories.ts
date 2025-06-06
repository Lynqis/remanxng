import { applicationConfig, Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { RxIcon } from "./icon";
import * as DefaultIcons from '@lynqis/remanx-icons/icons.json';

const icons: Record<string, string> = (DefaultIcons as any).icons;

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
    <div style="display: flex; gap: 10px;">
      <rx-icon [iconJson]="'home'" />
      <rx-icon [iconJson]="'eye'" [stroke]="'red'" />
      <rx-icon [iconJson]="'info'" [thickness]="'3'" />
      <rx-icon [iconJson]="'menu'" [stroke]="'green'" />
      <rx-icon [iconJson]="'save'" [fill]="'red'" />
      <rx-icon [iconJson]="'rx-leanqis'" [fill]="'red'" [stroke]="'red'" [$height]="'3rem'" [$width]="'3rem'" />
    </div>
    `
  })
}



export const AllIcons: Story = {
  render: () => {
    const html = Object.keys(icons)
      .map(
        name => `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; justify-content: center; width: 200px;">
            <rx-icon [iconJson]="'${name}'" [$height]="'50'" [$width]="'50'" [thickness]="1" [stroke]="'#000'" />
            <div style="font-size: 10px">${name}</div>
          </div>
        `
      )
      .join('');

    return {
      template: `
        <div style="display: flex; flex-wrap: wrap; gap: 30px; text-align: center">
          ${html}
        </div>
      `,
    };
  },
}

import { RxImage } from "./image";
import { applicationConfig, Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const meta: Meta<RxImage> = {
  title: 'Overlay/Image',
  component: RxImage,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: []
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<RxImage>;


export const WithPreview: Story = {
  render: () => ({
    template: `<rx-image [src]="'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg'" [preview]="true" />`
  })
}

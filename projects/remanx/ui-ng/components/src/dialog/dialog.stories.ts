import { Meta, moduleMetadata, StoryFn, StoryObj } from "@storybook/angular";
import { RxDialog } from "./dialog";
import { RxButton } from "../button";

export default {
  title: 'Surfaces/RxDialog',
  component: RxDialog,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RxButton,
      ],
    }),
  ]
} as Meta<RxDialog>;

export const Default = (args: RxDialog) => ({
  component: RxDialog,
  template: `
    <rx-button (click)="onToggle()" [label]="'Open a modal'"></rx-button>
    <rx-dialog [visible]="visible" (visibleChange)="visible = $event">
      <p>This is a modal dialog</p>
    </rx-dialog>
  `,
  props: {
    ...args,
    view: 'hhh scc fff',
    visible: false,
    onToggle: function () {
      this.visible = !this.visible;
    },
  }
});



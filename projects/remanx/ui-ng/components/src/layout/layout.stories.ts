import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { RxLayout } from './layout';
import { RxHeader } from '../header';
import { RxSidebar } from '../sidebar';
import { RxMainContent } from '../main-content';
import { RxFooter } from '../footer';
import { fn } from '@storybook/test';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

const meta: Meta<RxLayout> = {
  title: 'Layout/RxLayout',
  component: RxLayout,
  tags: ['autodocs'],
  argTypes: {
    container: {
      control: 'boolean',
      description: 'Définit si le layout est containerisé ou non.',
    },
    view: {
      control: 'text',
      description: 'Définit la structure du layout sous la forme "header body footer".',
    },
  },
  args: {
    view: 'hhh scc fff'
  },
  parameters: {
    docs: {
      description: {
        component: `
Le composant **RxLayout** permet de structurer une page avec des zones configurables via \`view\`.
Par exemple : "header body footer".
L'attribut \`container\` définit si le layout est en mode containerisé.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        RxLayout,
        RxHeader,
        RxSidebar,
        RxMainContent,
        RxFooter,
        CommonModule
      ]
    }),
  ]
}

export default meta;
type Story = StoryObj<RxLayout>;


export const Default: Story = {
  render: () => ({
    template: `
      <rx-layout>
        <rx-header [$style]="'background-color:blue'">Header</rx-header>
        <rx-sidebar [visible]="true" [$style]="'background-color:red'">
          Sidebar
        </rx-sidebar>
        <rx-main [$style]="'background-color:green'">
          Main Content
        </rx-main>
        <rx-footer [$style]="'background-color:yellow'">Footer</rx-footer>
      </rx-layout>
    `,
    props: {
      view: 'hhh scc fff'
    }
  })
};

export const ToggleSidebar: Story = {
  render: () => ({
    template: `
      <rx-layout #layout>
        <rx-header [$style]="'background-color:blue'">
          <button (click)="layout.onToggleSidebar()">Toggle Sidebar</button>
        </rx-header>
        <rx-sidebar [visible]="sidebarVisible()" [$style]="'background-color:red'">
          Sidebar
        </rx-sidebar>
        <rx-main [$style]="'background-color:green'">
          Main Content
        </rx-main>
        <rx-footer [$style]="'background-color:yellow'">Footer</rx-footer>
      </rx-layout>
    `,
    props: {
      view: 'shh scc fff',
      sidebarVisible: signal(true)
    }
  })
};

export const ShrinkSidebar: Story = {
  render: () => ({
    template: `
      <rx-layout [view]="view" #layout>
        <rx-header [$style]="'background-color:blue'">
          <button (click)="layout.onToggleSidebar()">Toggle Sidebar</button>
        </rx-header>
        <rx-sidebar [visible]="sidebarVisible()" [shrink]="shrink" [$style]="'background-color:red'">
          Sidebar
        </rx-sidebar>
        <rx-main [$style]="'background-color:green'">
          Main Content
        </rx-main>
        <rx-footer [$style]="'background-color:yellow'">Footer</rx-footer>
      </rx-layout>
    `,
    props: {
      sidebarVisible: signal(true),
      view: 'shh scc sff',
      shrink: true
    }
  })
};

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { RxTable } from './table';
import {
  RxSelectableRow,
  RxSortIcon,
  RxSortableColumn,
} from './table.directives';
import { products } from './data/products';

const meta: Meta<RxTable> = {
  title: 'Data/RxTable',
  component: RxTable,
  decorators: [
    moduleMetadata({
      imports: [
        NgFor,
        NgIf,
        DecimalPipe,
        RxSortableColumn,
        RxSortIcon,
        RxSelectableRow,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Un composant de tableau avancé avec tri et sélection.',
      },
    },
  },
  argTypes: {
    value: {
      description: 'Les données à afficher dans le tableau',
      control: 'object',
      table: {
        type: { summary: 'any[]' },
        defaultValue: { summary: '[]' },
      },
    },
    showGridlines: {
      description: 'Affiche les bordures de grille',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectionMode: {
      description: 'Mode de sélection des lignes',
      control: 'select',
      options: [null, 'single', 'multiple'],
      table: {
        type: { summary: "'single' | 'multiple' | null" },
        defaultValue: { summary: 'null' },
      },
    },
    selection: {
      description: 'Élément(s) sélectionné(s)',
      control: 'object',
      table: {
        type: { summary: 'any | any[]' },
        defaultValue: { summary: 'null' },
      },
    },
    emptyMessage: {
      description: 'Message à afficher lorsque le tableau est vide',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Aucune donnée'" },
      },
    },
    selectionChange: {
      description: 'Émis lorsque la sélection change',
      table: {
        type: { summary: 'EventEmitter<any | any[]>' },
      },
    },
    sortData: {
      description: 'Émis lorsque le tri est effectué',
      table: {
        type: { summary: 'EventEmitter<SortEvent>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<RxTable>;

interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

/**
 * Exemple de base avec tri des colonnes.
 *
 * Cette story montre comment utiliser le composant RxTable avec le tri des colonnes.
 * Les colonnes "Nom", "Catégorie" et "Prix" sont triables.
 */
export const Basic: Story = {
  args: {
    value: products,
    showGridlines: true,
    emptyMessage: 'Aucune donnée disponible',
  },
  render: (args) => ({
    props: {
      ...args,
      sortField: '',
      sortOrder: 1,
    },
    template: `
      <rx-table [value]="value"
                [showGridlines]="showGridlines"
                [emptyMessage]="emptyMessage"
                >
        <ng-template #header>
          <tr>
            <th [rxSortableColumn]="'name'">
              Nom
              <span rxSortIcon="name"></span>
            </th>
            <th [rxSortableColumn]="'category'">
              Catégorie
              <span rxSortIcon="category"></span>
            </th>
            <th [rxSortableColumn]="'price'">
              Prix
              <span rxSortIcon="price"></span>
            </th>
            <th>Quantité</th>
            <th>Statut</th>
          </tr>
        </ng-template>
        <ng-template #body let-item>
          <tr>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.quantity}}</td>
            <td>{{item.inventoryStatus}}</td>
          </tr>
        </ng-template>
      </rx-table>
    `,
  }),
};

/**
 * Exemple avec sélection multiple.
 *
 * Cette story montre comment utiliser le composant RxTable avec la sélection multiple.
 * Les utilisateurs peuvent sélectionner plusieurs lignes en utilisant des cases à cocher.
 */
export const MultipleSelection: Story = {
  args: {
    value: products,
    showGridlines: true,
    selectionMode: 'multiple',
    emptyMessage: 'Aucune donnée disponible',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <rx-table [value]="value"
                [showGridlines]="showGridlines"
                [selectionMode]="'multiple'"
                [emptyMessage]="emptyMessage">
        <ng-template #header>
          <tr>
            <th style="width: 3rem">Sélection</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Statut</th>
          </tr>
        </ng-template>
        <ng-template #body let-item>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.inventoryStatus}}</td>
          </tr>
        </ng-template>
      </rx-table>
    `,
  }),
};

/**
 * Exemple sans sélection.
 *
 * Cette story montre comment utiliser le composant RxTable sans fonctionnalité de sélection.
 * C'est utile pour l'affichage simple de données tabulaires.
 */
export const NoSelection: Story = {
  args: {
    value: products,
    showGridlines: true,
    emptyMessage: 'Aucune donnée disponible',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <rx-table [value]="value"
                [showGridlines]="showGridlines"
                [emptyMessage]="emptyMessage">
        <ng-template #header>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Statut</th>
          </tr>
        </ng-template>
        <ng-template #body let-item>
          <tr>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.quantity}}</td>
            <td>{{item.inventoryStatus}}</td>
          </tr>
        </ng-template>
      </rx-table>
    `,
  }),
};

/**
 * Exemple de table vide.
 *
 * Cette story montre comment le composant RxTable gère l'absence de données.
 * Un message personnalisable est affiché lorsque le tableau est vide.
 */
export const EmptyTable: Story = {
  args: {
    value: [],
    showGridlines: true,
    emptyMessage: 'Aucune donnée disponible',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <rx-table [value]="value"
                [showGridlines]="showGridlines"
                [emptyMessage]="emptyMessage">
        <ng-template #header>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Statut</th>
          </tr>
        </ng-template>
        <ng-template #body let-item>
          <tr>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.quantity}}</td>
            <td>{{item.inventoryStatus}}</td>
          </tr>
        </ng-template>
      </rx-table>
    `,
  }),
};

/**
 * Exemple de pagination.
 *
 * Cette story montre comment utiliser le composant RxTable avec la pagination.
 * Les utilisateurs peuvent naviguer entre les pages pour afficher les données.
 */
export const Pagination: Story = {
  args: {
    value: products,
    showGridlines: true,
    emptyMessage: 'Aucune donnée disponible',
    rows: 5,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <rx-table [value]="value"
                [showGridlines]="showGridlines"
                [emptyMessage]="emptyMessage"
                [rows]="rows">
        <ng-template #header>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Statut</th>
          </tr>
        </ng-template>
        <ng-template #body let-item>
          <tr>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.quantity}}</td>
            <td>{{item.inventoryStatus}}</td>
          </tr>
        </ng-template>
      </rx-table>
    `,
  }),
};

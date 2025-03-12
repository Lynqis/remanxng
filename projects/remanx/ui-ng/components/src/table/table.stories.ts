import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NgFor } from '@angular/common';
import { RxTable } from './table';

const meta: Meta<RxTable> = {
  title: 'Data/RxTable',
  component: RxTable,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NgFor],
    }),
  ],
};

export default meta;
type Story = StoryObj<RxTable>;

const products = [
  {
    code: 'P001',
    name: 'Laptop Pro',
    category: 'Electronics',
    quantity: 15,
  },
  {
    code: 'P002',
    name: 'Wireless Mouse',
    category: 'Accessories',
    quantity: 42,
  },
  {
    code: 'P003',
    name: 'USB-C Cable',
    category: 'Accessories',
    quantity: 30,
  },
];

export const Basic: Story = {
  args: {
    value: products,
    showGridlines: true,
    tableStyle: { 'min-width': '50rem' },
  },
  render: (args) => ({
    props: args,
    template: `
      <rx-table
        [value]="value"
        [showGridlines]="showGridlines"
        [tableStyle]="tableStyle">
          <ng-template #header>
              <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
              </tr>
          </ng-template>
          <ng-template #body let-products>
              <tr *ngFor="let product of products">
                  <td>{{ product.code }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.quantity }}</td>
              </tr>
          </ng-template>
      </rx-table>
    `,
  }),
};

export const Empty: Story = {
  args: {
    value: [],
    showGridlines: true,
    tableStyle: { 'min-width': '50rem' },
    emptyMessage: 'Aucun produit disponible',
  },
  render: (args) => ({
    props: args,
    template: `
      <rx-table
        [value]="value"
        [showGridlines]="showGridlines"
        [tableStyle]="tableStyle"
        [emptyMessage]="emptyMessage">
          <ng-template #header>
              <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
              </tr>
          </ng-template>
          <ng-template #body let-products>
              <tr *ngFor="let product of products">
                  <td>{{ product.code }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.quantity }}</td>
              </tr>
          </ng-template>
      </rx-table>
    `,
  }),
};

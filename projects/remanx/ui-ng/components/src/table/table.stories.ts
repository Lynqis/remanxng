import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { RxTable } from './table';
import { RxSelectableRow, RxSortIcon, RxSortableColumn } from './table.directives';

/**
 * # RxTable
 * 
 * Le composant RxTable est un composant de tableau avancé qui offre des fonctionnalités de tri et de sélection.
 * 
 * ## Fonctionnalités
 * 
 * - Tri des colonnes (simple)
 * - Sélection de lignes (simple ou multiple)
 * - Affichage de bordures de grille
 * - Message personnalisable en cas de données vides
 * 
 * ## Installation
 * 
 * ```typescript
 * import { RxTableModule } from '@remanx/ui-ng';
 * 
 * @NgModule({
 *   imports: [
 *     RxTableModule
 *   ],
 * })
 * export class AppModule { }
 * ```
 * 
 * ## Utilisation de base
 * 
 * ```html
 * <rx-table [value]="data" [showGridlines]="true">
 *   <ng-template #header>
 *     <tr>
 *       <th>Nom</th>
 *       <th>Catégorie</th>
 *     </tr>
 *   </ng-template>
 *   <ng-template #body let-items>
 *     <tr *ngFor="let item of items">
 *       <td>{{item.name}}</td>
 *       <td>{{item.category}}</td>
 *     </tr>
 *   </ng-template>
 * </rx-table>
 * ```
 * 
 * ## Tri des colonnes
 * 
 * Pour ajouter le tri sur une colonne, utilisez la directive `rxSortableColumn` et `rxSortIcon` :
 * 
 * ```html
 * <th [rxSortableColumn]="'name'">
 *   Nom
 *   <span rxSortIcon="name"></span>
 * </th>
 * ```
 * 
 * ## Sélection de lignes
 * 
 * Le composant supporte deux modes de sélection : simple et multiple.
 * 
 * ### Sélection simple
 * 
 * ```html
 * <rx-table [value]="data" 
 *     [selectionMode]="'single'"
 *     [(selection)]="selectedItem"
 *     [dataKey]="'id'">
 *   ...
 *   <tr *ngFor="let item of items" [rxSelectableRow]="item">
 *     ...
 *   </tr>
 * </rx-table>
 * ```
 * 
 * ### Sélection multiple
 * 
 * ```html
 * <rx-table [value]="data" 
 *     [selectionMode]="'multiple'"
 *     [(selection)]="selectedItems"
 *     [dataKey]="'id'">
 *   ...
 *   <tr *ngFor="let item of items" [rxSelectableRow]="item">
 *     ...
 *   </tr>
 * </rx-table>
 * ```
 * 
 * ## Styles
 * 
 * Le composant utilise des variables CSS pour la personnalisation :
 * 
 * ```css
 * :root {
 *   --rx-border-color: #dee2e6;
 *   --rx-hover-bg: rgba(0, 0, 0, 0.04);
 *   --rx-selected-bg: #e3f2fd;
 *   --rx-selected-text-color: #1976d2;
 * }
 * ```
 */
const meta: Meta<RxTable> = {
  title: 'Data/RxTable',
  component: RxTable,
  decorators: [
    moduleMetadata({
      imports: [NgFor, NgIf, DecimalPipe, RxSortableColumn, RxSortIcon, RxSelectableRow],
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
      action: 'selectionChange',
    },
    sort: {
      description: 'Émis lorsque le tri est effectué',
      table: {
        type: { summary: 'EventEmitter<SortEvent>' },
      },
      action: 'sort',
    },
  },
};

export default meta;
type Story = StoryObj<RxTable>;

// Définition du type Product pour éviter les erreurs de typage
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

const products: Product[] = [
  {
    id: 1,
    code: 'P001',
    name: 'Ordinateur portable',
    description: 'Ordinateur portable 15" avec processeur i7',
    price: 1200,
    category: 'Électronique',
    quantity: 24,
    inventoryStatus: 'En stock',
    rating: 5
  },
  {
    id: 2,
    code: 'P002',
    name: 'Écran 27"',
    description: 'Écran 27" 4K',
    price: 450,
    category: 'Électronique',
    quantity: 61,
    inventoryStatus: 'En stock',
    rating: 4
  },
  {
    id: 3,
    code: 'P003',
    name: 'Clavier mécanique',
    description: 'Clavier mécanique avec rétroéclairage RGB',
    price: 120,
    category: 'Accessoires',
    quantity: 2,
    inventoryStatus: 'Faible stock',
    rating: 4
  },
  {
    id: 4,
    code: 'P004',
    name: 'Souris sans fil',
    description: 'Souris sans fil ergonomique',
    price: 80,
    category: 'Accessoires',
    quantity: 0,
    inventoryStatus: 'Rupture de stock',
    rating: 3
  },
  {
    id: 5,
    code: 'P005',
    name: 'Casque audio',
    description: 'Casque audio sans fil avec réduction de bruit',
    price: 200,
    category: 'Audio',
    quantity: 15,
    inventoryStatus: 'En stock',
    rating: 5
  }
];

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
      products: [...products],
      selectedProduct: null,
      sortField: '',
      sortOrder: 1,
      onSort: (event: any) => {
        const { field, order } = event;
        const sortedProducts = [...products].sort((a, b) => {
          const valueA = a[field as keyof Product];
          const valueB = b[field as keyof Product];
          return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * order;
        });
        args.value = sortedProducts;
      }
    },
    template: `
      <rx-table [value]="products" 
                [showGridlines]="showGridlines"
                [emptyMessage]="emptyMessage"
                (sort)="onSort($event)">
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
        <ng-template #body let-items>
          <tr *ngFor="let item of items">
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.quantity}}</td>
            <td>{{item.inventoryStatus}}</td>
          </tr>
        </ng-template>
      </rx-table>
    `
  })
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
  render: (args) => {
    // Création d'une classe pour gérer la sélection et éviter les problèmes de typage
    class SelectionManager {
      selectedProducts: Product[] = [];
      
      isSelected(product: Product): boolean {
        return this.selectedProducts.some(p => p.id === product.id);
      }
      
      toggleSelection(product: Product): void {
        if (this.isSelected(product)) {
          this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
        } else {
          this.selectedProducts = [...this.selectedProducts, product];
        }
      }
      
      onSelectionChange(event: any): void {
        console.log('Selection changed:', event);
      }
    }
    
    const selectionManager = new SelectionManager();
    
    return {
      props: {
        ...args,
        products: [...products],
        selectionManager,
      },
      template: `
        <div class="mb-3">
          <strong>Produits sélectionnés:</strong> {{selectionManager.selectedProducts.length}}
        </div>
        <rx-table [value]="products" 
                  [showGridlines]="showGridlines"
                  [selectionMode]="'multiple'"
                  [emptyMessage]="emptyMessage"
                  (selectionChange)="selectionManager.onSelectionChange($event)">
          <ng-template #header>
            <tr>
              <th style="width: 3rem">Sélection</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Statut</th>
            </tr>
          </ng-template>
          <ng-template #body let-items>
            <tr *ngFor="let item of items" [class.selected]="selectionManager.isSelected(item)">
              <td>
                <input type="checkbox" 
                       [checked]="selectionManager.isSelected(item)" 
                       (change)="selectionManager.toggleSelection(item)" />
              </td>
              <td>{{item.name}}</td>
              <td>{{item.category}}</td>
              <td>{{item.price | number:'1.2-2'}} €</td>
              <td>{{item.inventoryStatus}}</td>
            </tr>
          </ng-template>
        </rx-table>
      `
    };
  }
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
      products: [...products],
    },
    template: `
      <rx-table [value]="products" 
                [showGridlines]="showGridlines"
                [emptyMessage]="emptyMessage">
        <ng-template #header>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Statut</th>
            <th>Évaluation</th>
          </tr>
        </ng-template>
        <ng-template #body let-items>
          <tr *ngFor="let item of items">
            <td><span class="code-badge">{{item.code}}</span></td>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.quantity}}</td>
            <td>
              <span [class]="'status-badge status-' + (item.inventoryStatus === 'En stock' ? 'instock' : 
                              item.inventoryStatus === 'Faible stock' ? 'lowstock' : 'outofstock')">
                {{item.inventoryStatus}}
              </span>
            </td>
            <td>
              <span class="rating">
                <span *ngFor="let star of [1,2,3,4,5]" 
                      [class.filled]="star <= item.rating">★</span>
              </span>
            </td>
          </tr>
        </ng-template>
      </rx-table>
      <style>
        .code-badge {
          background-color: #f5f5f5;
          border-radius: 4px;
          padding: 2px 6px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .status-badge {
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 0.9em;
        }
        .status-instock {
          background-color: #c8e6c9;
          color: #256029;
        }
        .status-lowstock {
          background-color: #feedaf;
          color: #8a5340;
        }
        .status-outofstock {
          background-color: #ffcdd2;
          color: #c63737;
        }
        .rating {
          color: #ccc;
          font-size: 1.2em;
        }
        .rating .filled {
          color: #ffc107;
        }
      </style>
    `
  })
};

/**
 * Exemple de table vide.
 * 
 * Cette story montre comment le composant RxTable gère l'absence de données.
 * Un message personnalisable est affiché lorsque le tableau est vide.
 */
export const Empty: Story = {
  args: {
    value: [],
    showGridlines: true,
    emptyMessage: 'Aucune donnée disponible',
  },
  render: (args) => ({
    props: {
      ...args,
      products: [],
    },
    template: `
      <rx-table [value]="products" 
                [showGridlines]="showGridlines"
                [emptyMessage]="emptyMessage">
        <ng-template #header>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Statut</th>
          </tr>
        </ng-template>
        <ng-template #body let-items>
          <tr *ngFor="let item of items">
            <td>{{item.code}}</td>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price | number:'1.2-2'}} €</td>
            <td>{{item.quantity}}</td>
            <td>{{item.inventoryStatus}}</td>
          </tr>
        </ng-template>
      </rx-table>
    `
  })
};

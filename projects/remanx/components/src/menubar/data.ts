import { MenuItem } from "@remanxng/api";

export const items: MenuItem[] = [
  {
    label: 'Paramètres utilisateur',
    items: [
      {
        label: 'My Profile',
      },
      {
        label: 'Users',
        component: 'users',
      },
      {
        label: 'Rôles',
        component: 'roles',
      },
    ],
  },
  {
    label: 'Paramètres application',
    items: [
      {
        label: 'Global',
        component: 'global',
      },
      {
        label: 'Intégration',
      },
      {
        label: 'Organisations',
        component: 'organisation',
      },
    ],
  },
  {
    label: 'Paramètres de facturation',
  },
  {
    label: 'Modération',
  },
];

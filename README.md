# Remanx UI Library

Une bibliothèque de composants Angular modernes et réactifs, conçue pour faciliter le développement d'applications web professionnelles.

## Composants Disponibles

### RxTable
Un composant de tableau avancé avec les fonctionnalités suivantes :
- Tri des colonnes (simple)
- Sélection de lignes (simple ou multiple)
- Affichage de bordures de grille
- Message personnalisable en cas de données vides
- Pagination
- Tri multiple
- Support des thèmes
- Styles responsifs

## Installation

Pour installer la bibliothèque, utilisez la commande suivante :

```bash
npm install @remanx/ui-ng
```

## Structure du Projet

```
remanx/
├── projects/
│   └── remanx/ui-ng/
│       ├── components/
│       │   ├── table/
│       │   │   ├── table.ts
│       │   │   ├── tablebody.ts
│       │   │   ├── table.stories.ts
│       │   │   └── data/
│       │   │       └── products.ts
│       │   └── base/
│       │       └── basecomponent.ts
│       └── pagination/
│           └── pagination.ts
└── src/
    └── lib/
        └── table/
            └── table.module.ts
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Documentation

La documentation complète est disponible dans les stories de chaque composant. Vous pouvez l'explorer en lançant Storybook :

```bash
ng run remanx:storybook
```

## Ressources Supplémentaires

Pour plus d'informations sur l'utilisation de l'Angular CLI, y compris les références détaillées des commandes, consultez la [Documentation Angular CLI](https://angular.dev/tools/cli).

## Contributeurs

- [Dexarys](https://github.com/Dexarys)
- [Contributors](https://github.com/Dexarys/remanxng/graphs/contributors)

## Licence

Ce projet est sous licence GNU GPL v3. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

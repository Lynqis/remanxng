# Remanx UI NG

La bibliothèque Angular de composants pour Remanx, conçue pour faciliter le développement d'applications web modernes et réactives.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## 🚀 Composants Disponibles

### RxTable
Un composant de tableau avancé avec les fonctionnalités suivantes :
- 🔄 Tri des colonnes (simple)
- 🎯 Sélection de lignes (simple ou multiple)
- 📊 Affichage de bordures de grille
- 📝 Message personnalisable en cas de données vides
- 🔄 Pagination
- 🔄 Tri multiple
- 🔄 Support des thèmes
- 📱 Styles responsifs

### RxPagination
Un composant de pagination simple et élégant pour naviguer dans vos listes de données.

## 🛠️ Installation

Pour installer la bibliothèque, utilisez la commande suivante :

```bash
npm install @remanx/ui-ng
```

## 🏗️ Structure du Projet

```
ui-ng/
├── components/
│   ├── table/
│   │   ├── table.ts
│   │   ├── tablebody.ts
│   │   ├── table.stories.ts
│   │   └── data/
│   │       └── products.ts
│   └── base/
│       └── basecomponent.ts
└── pagination/
    └── pagination.ts
```

## 🚀 Building

Pour compiler le projet, exécutez la commande suivante :

```bash
ng build ui-ng
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ui-ng
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## 🧪 Tests

### Unit Tests

Pour exécuter les tests unitaires avec [Karma](https://karma-runner.github.io), utilisez la commande :

```bash
ng test
```

### End-to-End Tests

Pour les tests end-to-end, exécutez :

```bash
ng e2e
```

Note : Angular CLI ne fournit pas de framework de test end-to-end par défaut. Choisissez celui qui convient le mieux à vos besoins.

## 📚 Documentation

La documentation complète est disponible dans les stories de chaque composant. Vous pouvez l'explorer en lançant Storybook :

```bash
ng run remanx:storybook
```

## 📚 Ressources Supplémentaires

Pour plus d'informations sur l'utilisation de l'Angular CLI, y compris les références détaillées des commandes, consultez la [Documentation Angular CLI](https://angular.dev/tools/cli).

## 📝 Contributeurs

- [Dexarys](https://github.com/Dexarys)
- [Contributors](https://github.com/Dexarys/remanxng/graphs/contributors)

## 📝 Licence

Ce projet est sous licence GNU GPL v3. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

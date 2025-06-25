import { applicationConfig, type Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import 'zone.js';
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { importProvidersFrom, inject, provideAppInitializer } from "@angular/core";
import { IconRegistryService } from "../components/src/icon";
import { provideLayoutStore } from "../api";
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', '*'],
      },
    },
    docs: {
      disable: false
    }
  },
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideAnimations(),
        provideAppInitializer(() => {
          const _iconRegistry = inject(IconRegistryService);
          _iconRegistry.initialize();
        }),
        importProvidersFrom(HttpClient),
        provideLayoutStore()
      ]
    })
  ],

  tags: ["autodocs"]
};

export default preview;

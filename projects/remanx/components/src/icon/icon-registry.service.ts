import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService } from '@remanxng/api';

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private icons: Record<string, string> = {};
  private http = inject(HttpClient);
  private _configService = inject(GlobalConfigService);

  constructor() {}

  initialize(): void {
    const configPath = this._configService.getConfig<string>('iconConfigPath', 'assets/icons.json');
    this.loadIcons(configPath);
  }

  private loadIcons(iconConfigPath: string): void {
    this.http.get<Record<string, string>>(iconConfigPath).subscribe(icons => {
      this.icons = icons;
    });
  }

  getIcon(name: string, options?: { stroke?: string; strokeWidth?: string; fill?: string }): string | undefined {
    let svg = this.icons[name];
    if (!svg) return undefined;

    if (options) {
      svg = svg.replace(/stroke="(.*?)"/, `stroke="${options.stroke || 'currentColor'}"`);
      svg = svg.replace(/stroke-width="(.*?)"/, `stroke-width="${options.strokeWidth || '1'}"`);
      svg = svg.replace(/fill="(.*?)"/, `fill="${options.fill || 'none'}"`);
    }

    return svg;
  }
}

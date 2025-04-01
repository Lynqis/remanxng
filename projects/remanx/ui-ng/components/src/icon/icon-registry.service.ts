import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService } from '@remanx/ui-ng/api';

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

  getIcon(name: string): string | undefined {
    return this.icons[name];
  }
}

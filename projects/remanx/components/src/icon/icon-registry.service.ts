import { Injectable, SecurityContext, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService } from '@dexarys/remanxng/api';
import * as DefaultJson from '@dexarys/remanx-icons/icons.json';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private http = inject(HttpClient);
  private _configService = inject(GlobalConfigService);
  private sanitizer = inject(DomSanitizer);

  icons: WritableSignal<Record<string, string>> = signal({});
  svg: WritableSignal<string> = signal('');

  constructor() {}

  initialize(): void {
    const configPath = this._configService.getConfig<string>('iconConfigPath', '');
    this.loadIcons(configPath);
  }

  private loadIcons(iconConfigPath?: string): void {
    const skipDefault = this._configService.getConfig<boolean>('iconSkipDefault', false);

    const defaultIcons = (DefaultJson as { icons: Record<string, string> }).icons;

    if (!iconConfigPath) {
      this.setIcons(skipDefault ? {} : defaultIcons);
      return;
    }

    this.http.get<{ icons: Record<string, string> }>(iconConfigPath).subscribe({
      next: config => {
        const loadedIcons = config?.icons ?? {};
        this.setIcons(skipDefault
          ? loadedIcons
          : { ...defaultIcons, ...loadedIcons });
      },
      error: () => {
        this.setIcons(skipDefault ? {} : defaultIcons);
      }
    });
  }

  setIcons(value: Record<string, string>) {
    this.icons.set(value);
  }

  setSvg(value: string) {
    this.svg.set(value);
  }

  getIcon(name: string, options?: { stroke?: string; strokeWidth?: string; fill?: string }): string | null | SafeHtml {
    this.svg.set(this.icons()[name]);
    if (!this.svg()) return null;

    if (options) {
      this.setSvg(this.svg().replace(/stroke="(.*?)"/, `stroke="${options.stroke || 'currentColor'}"`))
      this.setSvg(this.svg().replace(/stroke-width="(.*?)"/, `stroke-width="${options.strokeWidth || '1'}"`))
      this.setSvg(this.svg().replace(/fill="(.*?)"/, `fill="${options.fill || 'none'}"`))
    }

    return this.sanitizer.bypassSecurityTrustHtml(this.svg());
  }
}

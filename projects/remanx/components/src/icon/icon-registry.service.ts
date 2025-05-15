import { Injectable, SecurityContext, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService, SvgOptions } from '@lynqis/remanxng/api';
import * as DefaultJson from '@lynqis/remanx-icons/icons.json';
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
    const defaultIcons = (DefaultJson as { icons: Record<string, string> }).icons;

    if (!iconConfigPath) {
      this.setIcons(defaultIcons);
      return;
    }

    this.http.get<{ icons: Record<string, string> }>(iconConfigPath).subscribe({
      next: config => {
        const loadedIcons = config?.icons ?? {};
        this.setIcons({ ...defaultIcons, ...loadedIcons });
      },
      error: () => {
        this.setIcons(defaultIcons);
      }
    });
  }

  setIcons(value: Record<string, string>) {
    this.icons.set(value);
  }

  setSvg(value: string) {
    this.svg.set(value);
  }

  getIcon(name: string, options?: SvgOptions): string | null | SafeHtml {
    this.svg.set(this.icons()[name]);
    if (!this.svg()) return null;

    if (options) {
      let svg = this.svg();

      svg = this.setAttribute(svg, 'stroke', options?.stroke);
      svg = this.setAttribute(svg, 'stroke-width', options?.thickness);
      svg = this.setAttribute(svg, 'fill', options?.fill);
      svg = this.setAttribute(svg, 'height', options?.height);
      svg = this.setAttribute(svg, 'width', options?.width);
      svg = this.setAttribute(svg, 'class', options?.svgClasses);

      this.setSvg(svg);
    }

    return this.sanitizer.bypassSecurityTrustHtml(this.svg());
  }

  private setAttribute(svg: string, attr: string, value: string | undefined) {
    if (!value || value === 'undefined') return svg;
    const regex = new RegExp(`${attr}="(.*?)"`);
    if (regex.test(svg)) {
      return svg.replace(regex, `${attr}="${value}"`);
    } else {
      return svg.replace(/<svg\b([^>]*)>/, `<svg$1 ${attr}="${value}">`);
    }
  }
}

import { Injectable, SecurityContext, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService, SvgOptions } from '@lynqis/remanxng/api';
import * as DefaultJson from '@lynqis/remanx-icons/icons.json';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NumberControl } from '@storybook/blocks';

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
      const svg = this.setAttributes(this.svg(), {
        stroke: options.stroke,
        'stroke-width': options.thickness,
        fill: options.fill,
        width: options.width,
        height: options.height,
        class: options.svgClasses,
      });

      this.setSvg(svg);
    }

    return this.sanitizer.bypassSecurityTrustHtml(this.svg());
  }

  private setAttributes(svg: string, attributes: Record<string, string | undefined>): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    if (!svgElement) return svg;

    for (const [attr, value] of Object.entries(attributes)) {
      if (!value || value === 'undefined') continue;

      if (attr === 'stroke-width') {
        const viewBox = svgElement.getAttribute('viewBox');
        if (viewBox) {
          const [x, y, width, height] = viewBox.split(' ').map(parseFloat);
          const pad = parseFloat(value);
          const newX = x - pad;
          const newY = y - pad;
          const newWidth = width + pad * 2;
          const newHeight = height + pad * 2;
          svgElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
        }
      }

      svgElement.setAttribute(attr, value);
    }

    return new XMLSerializer().serializeToString(doc.documentElement);
  }

}

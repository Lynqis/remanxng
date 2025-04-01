import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalConfigService {
  private config: Record<string, any> = {};

  setConfig(key: string, value: any): void {
    this.config[key] = value;
  }

  getConfig<T>(key: string, defaultValue?: T): T {
    return this.config[key] ?? defaultValue;
  }
}

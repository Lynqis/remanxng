export class ZIndexUtils {
  private static zIndexes: { key: string; value: number }[] = [];

  private static generate(key: string, baseZIndex: number): number {
      const lastZIndex = this.zIndexes.length > 0 ? this.zIndexes[this.zIndexes.length - 1] : { key, value: baseZIndex };
      const newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 2;

      this.zIndexes.push({ key, value: newZIndex });

      return newZIndex;
  }

  private static revert(zIndex: number): void {
      this.zIndexes = this.zIndexes.filter((obj) => obj.value !== zIndex);
  }

  public static getCurren(): number {
      return this.zIndexes.length > 0 ? this.zIndexes[this.zIndexes.length - 1].value : 0;
  }

  public static get(el: HTMLElement | null): number {
      return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  }

  public static set(key: string, el: HTMLElement | null, baseZIndex: number): void {
      if (el) {
          el.style.zIndex = String(this.generate(key, baseZIndex));
      }
  }

  public static clear(el: any): void {
      if (el) {
          this.revert(this.get(el));
          el.style.zIndex = '';
      }
  }
}

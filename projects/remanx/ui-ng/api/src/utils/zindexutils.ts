function ZIndexUtils() {
  let zIndexes: { key: string; value: number }[] = [];

  const generateZIndex = (key: string, baseZIndex: number): number => {
      let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : { key, value: baseZIndex };
      let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 2;

      zIndexes.push({ key, value: newZIndex });

      return newZIndex;
  };

  const revertZIndex = (zIndex: number): void => {
      zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };

  const getCurrentZIndex = (): number => {
      return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  };

  const getZIndex = (el: HTMLElement | null): number => {
      return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };

  return {
      get: getZIndex,
      set: (key: string, el: HTMLElement | null, baseZIndex: number): void => {
          if (el) {
              el.style.zIndex = String(generateZIndex(key, baseZIndex));
          }
      },
      clear: (el: any): void => {
          if (el) {
              revertZIndex(getZIndex(el));
              el.style.zIndex = '';
          }
      },
      getCurrent: (): number => getCurrentZIndex(),
      generateZIndex,
      revertZIndex
  };
}

export default ZIndexUtils();

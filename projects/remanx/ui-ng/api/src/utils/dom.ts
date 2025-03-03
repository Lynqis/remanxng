export class Dom {
  public static appendChild(element: any, target: any) {
    if (this.isElement(target)) {
      target.appendChild(element);
    } else if (target && target.el && target.el.nativeElement) {
      target.el.nativeElement.appendChild(element);
    } else {
      throw 'Cannot append ' + target + ' to ' + element;
    }
  }

  public static isElement(obj: any) {
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj &&
          typeof obj === 'object' &&
          obj !== null &&
          obj.nodeType === 1 &&
          typeof obj.nodeName === 'string';
  }

  public static absolutePosition(element: any, target: any) {
    if (!element || !target) return;

    const targetRect = target.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    let top = targetRect.bottom + window.scrollY;
    let left = targetRect.left + window.scrollX;

    if (left + elementRect.width > window.innerWidth) {
        left = window.innerWidth - elementRect.width - 10;
    }

    if (top + elementRect.height > window.innerHeight) {
        top = targetRect.top + window.scrollY - elementRect.height;
    }

    element.style.position = 'absolute';
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }

  public static getOffset(el: any)
  {
    let rect = el.getBoundingClientRect();

    return {
      top: rect.top + (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0),
      left: rect.left + (window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
    };
  }
}

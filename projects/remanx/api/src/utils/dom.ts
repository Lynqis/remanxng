import { ObjectPosition, PositionOptions } from "../interfaces";

export class Dom {

  public static absolutePosition(element: HTMLElement, target: HTMLElement, options?: PositionOptions): ObjectPosition {
    const targetRect = target.getBoundingClientRect();
    const elementDimensions = this.getElementSize(element);

    const elementRect = element.getBoundingClientRect();
    const viewport = this.getViewPort();
    const margin = options?.margin ?? 8;
    const scrollTop = viewport.scrollY;
    const scrollLeft = viewport.scrollX;

    let top: number, left: number;

    const fitsAbove = targetRect.top - elementDimensions.height - margin > 0;

    let placement: 'top' | 'bottom';
    let transformOrigin: 'top' | 'bottom';

    if (fitsAbove) {
      top = targetRect.top - elementDimensions.height - margin - scrollTop;
      transformOrigin = 'bottom';
      placement = 'top';
    } else {
      top = targetRect.bottom + margin + scrollTop;
      transformOrigin = 'top';
      placement = 'bottom';
    }

    left = targetRect.left + elementDimensions.width;
    let leftDirection = true;
    if (((targetRect.right + targetRect.left) / 2) > (viewport.width / 2)) leftDirection = !leftDirection;
    if (left > viewport.width || !leftDirection) {
      left = targetRect.right + scrollLeft - elementDimensions.width;
    } else {
      left = targetRect.left + scrollLeft;
    }

    if (left < 0) left = margin + scrollLeft;
    if (left + elementRect.width > viewport.width) {
      left = viewport.width - elementRect.width - margin + scrollLeft;
    }

    element.style.position = 'absolute';
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    element.style.transformOrigin = transformOrigin;

    return {
      top,
      left,
      transformOrigin,
      placement,
      position: 'absolute'
    };
  }

  public static getViewPort(): { width: number, height: number, scrollY: number, scrollX: number } {
    let win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight,
      sy = win.scrollY,
      sx = win.scrollX;

    return { width: w, height: h, scrollY: sy, scrollX: sx };
  }

  public static getElementSize(element: HTMLElement): { width: number, height: number } {
    return { width: element.offsetWidth, height: element.offsetHeight };
  }
}

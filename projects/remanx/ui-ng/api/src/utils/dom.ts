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
    return typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}
}

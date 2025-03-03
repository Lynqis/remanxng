export class ObjectUtils {
  public static isDate(input: any) {
    return Object.prototype.toString.call(input) === '[object Date]';
  }

  public static isEmpty(value: any) {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (!this.isDate(value) &&
        typeof value === 'object' &&
        Object.keys(value).length === 0)
    );
  }

  public static isFunction(obj: any) {
    return !!(obj?.constructor && obj?.call && obj?.apply);
  }

  public static getItemValue(obj: any, ...params: any) {
    return this.isFunction(obj) ? obj(...params) : obj;
  }
}

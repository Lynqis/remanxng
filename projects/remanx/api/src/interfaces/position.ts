export interface PositionOptions {
  margin?: number;
}

export interface ObjectPosition {
  top: number;
  left: number;
  transformOrigin: 'top' | 'bottom';
  placement: 'top' | 'bottom';
  position: 'absolute';
}

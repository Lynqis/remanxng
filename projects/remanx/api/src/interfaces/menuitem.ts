export interface MenuItem {
  id?: string;
  items?: MenuItem[];
  disabled?: boolean;
  expanded?: boolean;
  label?: string;
  routerLink?: string;
  separator?: boolean;
  visible?: boolean;
  component?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  callback: () => void;
  url?: string;
}

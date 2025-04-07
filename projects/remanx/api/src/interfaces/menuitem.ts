export interface MenuItem {
    id?: string;
    items?: MenuItem[];
    disabled?: boolean;
    expanded?: boolean;
    label?: string;
    routerLink?: any;
    separator?: boolean;
    visible?: boolean;
    component?: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
}

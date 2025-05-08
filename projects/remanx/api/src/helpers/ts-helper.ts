import { TemplateRef } from "@angular/core";

export declare type Nullable<T = void> = T | null | undefined;
export declare type TemplateNull<T = void> = TemplateRef<any> | null | T;
export declare type VoidListener = VoidFunction | null | undefined;
export declare type Position = 'center' | 'left' | 'top' | 'right' | 'bottom' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
export declare type Severity = 'success' | 'info' | 'warning' | 'help' | 'primary' | 'secondary' | 'contrast' | 'error' | null | undefined;
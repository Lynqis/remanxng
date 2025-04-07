import { Severity } from "../helpers";

export interface ToastMessage {
  severity?: Severity;
  title?: string;
  content?: string;
  id?: any;
  lifetime?: number;
  closable?: boolean;
  sticky?: boolean;
}

export interface ToastClose {
  message: ToastMessage;
}

export interface ToastItemCloseEvent extends ToastClose {
  index: number;
}

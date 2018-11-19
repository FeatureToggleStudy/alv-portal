import { Observable } from 'rxjs';

export interface ConfirmModalConfig {
  title: string;
  textHtml: string;
  confirmLabel?: string;
  cancelLabel?: string;
  size?: 'sm' | 'lg';
}



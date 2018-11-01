import { Observable } from 'rxjs';

export interface ConfirmModalConfig {
  title: string;
  textHtml: string;
  confirmLabel?: string;
  confirmAction: (closeModal: (result?) => void) => void;
  cancelLabel?: string;
  cancelAction?: (dismissModal: (reason?) => void) => void;
  size?: 'sm' | 'lg';
}



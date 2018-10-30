import { Observable } from 'rxjs';

export interface ConfirmModalConfig {
  title: string;
  textHtml: string;
  confirmLabel?: string;
  confirmAction: Observable<any>;
  cancelLabel?: string;
  cancelAction?: Observable<any>;
}



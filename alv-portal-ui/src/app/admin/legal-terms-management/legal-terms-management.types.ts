import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export enum LEGAL_ACTIONS {
  VIEW, EDIT, NEW
}

export const CONFIRM_DELETE_MODAL: ConfirmModalConfig = {
  title: 'entity.delete.title',
  content: 'portal.admin.legal-terms-management.legal-terms-delete-dialog.question',
  confirmLabel: 'entity.action.delete',
  cancelLabel: 'entity.action.cancel'
};

export function mapToDateTime(dateStruct: NgbDateStruct): number {
  return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day).getTime();
}

export function todayDateTime(): number {
  return new Date().getTime();
}

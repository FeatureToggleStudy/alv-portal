import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

export enum LEGAL_ACTIONS {
  VIEW, EDIT, NEW
}

export const CONFIRM_DELETE_MODAL: ConfirmModalConfig = {
  title: 'entity.delete.title',
  content: 'portal.admin.legal-terms-management.legal-terms-delete-dialog.question',
  confirmLabel: 'entity.action.delete',
  cancelLabel: 'entity.action.cancel'
};

export const tomorrow = (): NgbDateStruct => {
  const date = new Date();
  return NgbDate.from({year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() + 1});
};

export const mapToDateTime = (dateStruct: NgbDateStruct): number => {
  return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day).getTime();
};

export const todayDateTime = (): number => {
  return new Date().getTime();
};

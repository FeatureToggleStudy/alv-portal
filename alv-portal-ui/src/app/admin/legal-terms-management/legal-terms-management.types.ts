import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

export enum LEGAL_ACTIONS {
  VIEW, EDIT, NEW, DELETE
}

export const CONFIRM_DELETE_MODAL: ConfirmModalConfig = {
  title: 'entity.delete.title',
  content: 'portal.admin.legal-terms-management.legal-terms-delete-dialog.question',
  confirmLabel: 'entity.action.delete',
  cancelLabel: 'entity.action.cancel'
};

export const MESSAGE = {
  success: 'portal.admin.legal-terms-management.notification.success',
  failure: 'portal.admin.legal-terms-management.notification.failure'
};

// TODO temp here -> until DF-517 (github.com/alv-ch/alv-portal/pull/199/) gets merged
export const fromDate = (date: Date): NgbDateStruct => {
  return NgbDate.from({year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()});
};

export const fromISODate = (isoDateString: string): NgbDateStruct => {
  return fromDate(new Date(isoDateString));
};

export const today = (): NgbDateStruct => {
  return fromDate(new Date());
};

export const toISOLocalDate = (date: NgbDateStruct): string => {
  if (!date) {
    return null;
  }
  const dateObj = new Date(date.year, date.month - 1, date.day, 12);
  return formatDate(dateObj, 'yyyy-MM-dd', 'en-US');
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

export function getModalTitle(): string {
  if (this.isReadonly) {
    return 'entity.action.view';
  }
  if (this.isEdit) {
    return 'entity.action.edit';
  } else {
    return 'portal.global.enter';
  }
}

import { ConfirmModalConfig } from '../layout/modal/confirm-modal/confirm-modal-config.model';

export function getDeleteConfirmModalConfig(profileName: string): ConfirmModalConfig {
  return {
    title: 'portal.job-ad-search-profiles.delete-confirmation-modal.title',
    content: 'portal.job-ad-search-profiles.delete-confirmation-modal.question',
    contentParams: { profileName: profileName }
  };
}

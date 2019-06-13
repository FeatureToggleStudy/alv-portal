import { ConfirmModalConfig } from '../layout/modal/confirm-modal/confirm-modal-config.model';

export function getJobAdDeleteConfirmModalConfig(profileName: string): ConfirmModalConfig {
  return {
    title: 'portal.job-ad-search-profiles.delete-confirmation-modal.title',
    content: 'portal.job-ad-search-profiles.delete-confirmation-modal.question',
    confirmLabel: 'portal.job-ad-search-profiles.delete-confirmation-modal.button.confirm',
    contentParams: { profileName: profileName }
  };
}

export function getCandidateDeleteConfirmModalConfig(profileName: string): ConfirmModalConfig {
  return {
    title: 'portal.job-ad-search-profiles.delete-confirmation-modal.title',
    content: 'portal.job-ad-search-profiles.delete-confirmation-modal.question',
    confirmLabel: 'portal.job-ad-search-profiles.delete-confirmation-modal.button.confirm',
    contentParams: { profileName: profileName }
  };
}

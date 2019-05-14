import { ConfirmModalConfig } from '../../../shared/layout/modal/confirm-modal/confirm-modal-config.model';

export interface JobAdFavouritesSearchFilter {
  query: string;
}

export const CONFIRM_DELETE_FAVOURITE_MODAL: ConfirmModalConfig = {
  title: 'portal.job-ad-favourites.delete-confirmation.title',
  content: 'portal.job-ad-favourites.delete-confirmation.remove-favourite',
  primaryLabel: 'portal.job-ad-favourites.delete-confirmation.yes',
  cancelLabel: 'portal.job-ad-favourites.delete-confirmation.no'
};

export const CONFIRM_DELETE_FAVOURITE_NOTE_MODAL: ConfirmModalConfig = {
  title: 'portal.job-ad-favourites.delete-confirmation.title',
  content: 'portal.job-ad-favourites.delete-confirmation.remove-favourite-note',
  primaryLabel: 'portal.job-ad-favourites.delete-confirmation.yes',
  cancelLabel: 'portal.job-ad-favourites.delete-confirmation.no'
};

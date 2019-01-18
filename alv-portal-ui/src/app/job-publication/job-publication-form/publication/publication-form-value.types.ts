export interface PublicationFormValue {
  publicDisplay: boolean;
  euresDisplay: boolean;
}

export const emptyPublicationFormValue: PublicationFormValue = {
  publicDisplay: true,
  euresDisplay: false,
};

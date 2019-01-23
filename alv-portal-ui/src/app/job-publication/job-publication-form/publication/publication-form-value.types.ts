export interface PublicationFormValue {
  publicDisplay: boolean;
  euresDisplay: boolean;
}

export function emptyPublicationFormValue(): PublicationFormValue {
  return {
    publicDisplay: true,
    euresDisplay: false,
  };
}

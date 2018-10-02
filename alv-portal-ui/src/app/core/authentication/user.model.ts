export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  // todo registrationStatus will be added (see ch.admin.seco.jobroom.domain.enumeration.RegistrationStatus)
  langKey: string;
  authorities: Array<string>;
  registrationStatus: RegistrationStatus;
}

export interface Credentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

export enum RegistrationStatus {
  UNREGISTERED = <any>'UNREGISTERED',
  REGISTERED = <any>'REGISTERED',
  VALIDATION_EMP = <any>'VALIDATION_EMP',
  VALIDATION_PAV = <any>'VALIDATION_PAV'
}

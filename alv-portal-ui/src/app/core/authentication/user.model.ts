export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  // todo registrationStatus will be added (see ch.admin.seco.jobroom.domain.enumeration.RegistrationStatus)
  langKey: string;
  authorities: Array<string>;
}

export interface Credentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

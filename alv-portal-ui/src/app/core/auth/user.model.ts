export class User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
  authorities: Array<string>;
  registrationStatus: RegistrationStatus;

  containsAuthority(authorities: string | Array<string>): boolean {
    for (let i = 0; i < authorities.length; i++) {
      if (this.authorities.includes(authorities[i])) {
        return true;
      }
    }
    return false;
  }
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

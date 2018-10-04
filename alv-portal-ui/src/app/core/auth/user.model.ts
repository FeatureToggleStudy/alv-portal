export class User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
  authorities: Array<string>;
  registrationStatus: RegistrationStatus;

  /**
   * Returns true if the user has any of the authorities mentioned in `authorities` param.
   * @example If user.authorities is ['1', '2', '3']
   *
   * user.hasAnyAuthorities(['1']) -> true
   * user.hasAnyAuthorities(['1','3']) -> true
   * user.hasAnyAuthorities(['nono', '1']) -> true
   * user.hasAnyAuthorities(['nono']) -> false
   * @param authorities
   */
  hasAnyAuthorities(authorities: Array<string>): boolean {
    return this.authorities.some(value => -1 !== authorities.indexOf(value));
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

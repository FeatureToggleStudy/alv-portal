import { UserDto } from './authentication.service';

export enum RegistrationStatus {
  UNREGISTERED = <any>'UNREGISTERED',
  REGISTERED = <any>'REGISTERED',
  VALIDATION_EMP = <any>'VALIDATION_EMP',
  VALIDATION_PAV = <any>'VALIDATION_PAV'
}

export const ROLE_JOB_SEEKER = 'ROLE_JOBSEEKER_CLIENT';

export const ROLE_PAV = 'ROLE_PRIVATE_EMPLOYMENT_AGENT';

export const ROLE_COMPANY = 'ROLE_PRIVATE_EMPLOYMENT_AGENT';

export const anyNotAuthenticatedUser = (user: User) => {
  return !anyAuthenticatedUser(user);
};

export const any = () => {
  return true;
};

export const anyAuthenticatedUser = (user: User) => {
  return !!user && user.isRegistered();
};

export const hasAnyAuthorities = (user: User, authorities: Array<string>) => {
  return !!user && user.hasAnyAuthorities(authorities);
};

export class User {

  id: string;

  login: string;

  firstName: string;

  lastName: string;

  email: string;

  langKey: string;

  authorities: Array<string>;

  registrationStatus: RegistrationStatus;

  public static toUser(userDto: UserDto) {
    const user = new User();
    user.id = userDto.id;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.authorities = userDto.authorities;
    user.registrationStatus = userDto.registrationStatus;
    user.login = userDto.login;
    user.langKey = userDto.langKey;
    user.email = userDto.email;
    return user;
  }

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

  isRegistered(): boolean {
    return this.registrationStatus === RegistrationStatus.REGISTERED;
  }

}





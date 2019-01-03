import { UserDto } from './authentication.service';

export enum RegistrationStatus {
  UNREGISTERED = <any>'UNREGISTERED',
  REGISTERED = <any>'REGISTERED',
  VALIDATION_EMP = <any>'VALIDATION_EMP',
  VALIDATION_PAV = <any>'VALIDATION_PAV'
}

export enum UserRole {
  ROLE_JOB_SEEKER = <any>'ROLE_JOBSEEKER_CLIENT',
  ROLE_PAV = <any>'ROLE_PRIVATE_EMPLOYMENT_AGENT',
  ROLE_COMPANY = <any>'ROLE_COMPANY',
  ROLE_ADMIN = <any>'ROLE_ADMIN'
}

export const isAnyUser = () => {
  return true;
};

export const isAuthenticatedUser = (user: User) => {
  return !!user && user.isRegistered();
};

export const isNotAuthenticatedUser = (user: User) => {
  return !isAuthenticatedUser(user);
};

export const hasAnyAuthorities = (user: User, authorities: Array<UserRole>) => {
  return !!user && user.hasAnyAuthorities(authorities);
};

export class User {

  id: string;

  login: string;

  firstName: string;

  lastName: string;

  email: string;

  langKey: string;

  authorities: UserRole[];

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
  hasAnyAuthorities(authorities: Array<UserRole>): boolean {
    return this.authorities.some(value => -1 !== authorities.indexOf(value));
  }

  isRegistered(): boolean {
    return this.registrationStatus === RegistrationStatus.REGISTERED || this.isAdmin();
  }

  isAdmin() {
    return this.hasAnyAuthorities([UserRole.ROLE_ADMIN]);
  }
}





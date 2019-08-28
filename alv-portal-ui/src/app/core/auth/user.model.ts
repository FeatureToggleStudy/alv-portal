import { UserDto } from './authentication.service';
import { FeatureCode } from '../../shared/backend-services/feature-code-list/feature-code-list.types';
import { FeatureCodeListRepository } from '../../shared/backend-services/feature-code-list/feature-code-list.repository';

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
  ROLE_ADMIN = <any>'ROLE_ADMIN', // aka. Supporter
  ROLE_SYSADMIN = <any>'ROLE_SYSADMIN'
}

export function isAnyUser() {
  return true;
}

export function isAnonymous(user: User) {
  return !user;
}

/**
 * User is authenticated if he is logged in AND finished the registration OR is Admin
 *
 * @param user
 */
export function isAuthenticatedUser(user: User) {
  return !!user && user.isRegistered();
}

export function isNotAuthenticatedUser(user: User) {
  return !isAuthenticatedUser(user);
}

export function hasAnyAuthorities(user: User, authorities: Array<UserRole>) {
  return !!user && user.hasAnyAuthorities(authorities);
}

export function hasPilotFeature(user: User, featureCode: FeatureCode) {
  return !!user && user.hasPilotFeature(featureCode);
}

export class User {

  id: string;

  login: string;

  firstName: string;

  lastName: string;

  email: string;

  langKey: string;

  authorities: UserRole[];

  registrationStatus: RegistrationStatus;

  displayName: string;

  legalTermsAccepted: boolean;

  activeFeatures?: FeatureCode[];

  public static toUser(userDto: UserDto) {
    const user = new User();
    user.id = userDto.id;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.displayName = `${userDto.firstName} ${userDto.lastName}`;
    user.authorities = userDto.authorities;
    user.registrationStatus = userDto.registrationStatus;
    user.login = userDto.login;
    user.langKey = userDto.langKey;
    user.email = userDto.email;
    user.legalTermsAccepted = userDto.legalTermsAccepted;
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

  isLegalTermAcceptanceRequired() {
    return !this.legalTermsAccepted && this.isRegistered();
  }

  hasPilotFeature(featureCode: FeatureCode): boolean {
    return this.activeFeatures && this.activeFeatures.includes(featureCode);
  }
}

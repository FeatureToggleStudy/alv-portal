import { InlineBadge } from '../../shared/layout/inline-badges/inline-badge.types';
import { UserInfoDTO } from '../../shared/backend-services/user-info/user-info.types';
import { RegistrationStatus } from '../../core/auth/user.model';
import { Injectable } from '@angular/core';


export enum UserInfoBadgeType {
  REGISTERED, UNREGISTERED, PAV_OR_EMP
}

export interface UserInfoBadge extends InlineBadge {
  badgeType: UserInfoBadgeType;
}

const ALL = [
  UserInfoBadgeType.REGISTERED,
  UserInfoBadgeType.UNREGISTERED,
  UserInfoBadgeType.PAV_OR_EMP
];

@Injectable()
export class UserInfoBadgesMapperService {

  constructor() {}

  public map(userInfo: UserInfoDTO, badgeTypes = ALL): UserInfoBadge[] {

    const result: UserInfoBadge[] = [];

    if (userInfo == null || userInfo.registrationStatus == null) {
      return result;
    }

    if (userInfo.registrationStatus === RegistrationStatus.REGISTERED) {
      result.push({
        badgeType: UserInfoBadgeType.REGISTERED,
        cssClass: 'badge-user-registered',
        label: `${userInfo.registrationStatus}`
      });
    } else if (userInfo.registrationStatus === RegistrationStatus.UNREGISTERED) {
      result.push({
        badgeType: UserInfoBadgeType.UNREGISTERED,
        cssClass: 'badge-user-unregistered',
        label: `${userInfo.registrationStatus}`
      });
    } else if (userInfo.registrationStatus === RegistrationStatus.VALIDATION_PAV
      || userInfo.registrationStatus === RegistrationStatus.VALIDATION_EMP) {
      result.push({
        badgeType: UserInfoBadgeType.PAV_OR_EMP,
        cssClass: 'badge-user-pav-or-emp',
        label: `${userInfo.registrationStatus}`
      });
    }

    return result.filter((b) => badgeTypes.includes(b.badgeType));
  }
}

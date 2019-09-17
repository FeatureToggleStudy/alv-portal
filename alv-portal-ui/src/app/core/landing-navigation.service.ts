import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationStatus, User, UserRole } from './auth/user.model';
import { AppContextService } from './app-context/app-context.service';
import { homeUrlMap } from './app-context/app-context.types';

@Injectable({
  providedIn: 'root'
})
export class LandingNavigationService {

  constructor(private router: Router,
              private appContextService: AppContextService) {
  }

  navigateHome() {
    this.appContextService.getLatestAppContext()
      .subscribe(appContext => {
        this.router.navigate(homeUrlMap[appContext]);
      });
  }

  navigateUser(user: User): void {
    this.appContextService.getLatestAppContext()
      .subscribe(appContext => {
        if (user === null) {
          return this.router.navigate(homeUrlMap[appContext]);
        }

        if (!user.isRegistered()) {
          // For authorised user without permissions - navigate to finish registration page:
          if (user.registrationStatus === RegistrationStatus.UNREGISTERED) {
            return this.router.navigate(['registration', 'finish']);
          }
          // For PAV and companies with open validation - navigate to access code page
          if (user.registrationStatus === RegistrationStatus.VALIDATION_PAV ||
            user.registrationStatus === RegistrationStatus.VALIDATION_EMP) {
            return this.router.navigate(['registration', 'access-code']);
          }
        }

        // For jobseekers: to dashboard page for jobseeker
        if (user.hasAnyAuthorities([UserRole.ROLE_JOB_SEEKER])) {
          return this.router.navigate(['dashboard', 'job-seeker']);
        }
        // For company: to dashboard page for companies
        if (user.hasAnyAuthorities([UserRole.ROLE_COMPANY])) {
          return this.router.navigate(['dashboard', 'company']);
        }
        // For PAVs: to page for headhunters
        if (user.hasAnyAuthorities([UserRole.ROLE_PAV])) {
          return this.router.navigate(['dashboard', 'pav']);
        }

        if (user.hasAnyAuthorities([UserRole.ROLE_ADMIN])) {
          return this.router.navigate(['dashboard', 'admin']);
        }

        if (user.hasAnyAuthorities([UserRole.ROLE_KK_EDITOR])) {
          return this.router.navigate(['kk', 'home']);
        }

        return this.router.navigate(['home']);
      });
  }
}



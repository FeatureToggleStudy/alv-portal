import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationStatus, User } from './auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class LandingNavigationService {

  constructor(private router: Router) {
  }

  navigateUser(user: User): Promise<boolean> {

    if (user === null) {
      return this.router.navigate(['home']);
    }

    // For authorised user without permissions - navigate to finish registration page:
    if (user.registrationStatus === RegistrationStatus.UNREGISTERED) {
      return this.router.navigate(['registration', 'finish']);
    }
    // For PAV and companies with open validation - navigate to access code page
    if (user.registrationStatus === RegistrationStatus.VALIDATION_PAV ||
        user.registrationStatus === RegistrationStatus.VALIDATION_EMP) {
      return this.router.navigate(['registration', 'access-code']);
    }
    // For jobseekers: to dashboard page for jobseeker
    if (user.hasAnyAuthorities(['ROLE_JOBSEEKER_CLIENT'])) {
      return this.router.navigate(['dashboard', 'job-seeker']);
    }
    // For company: to dashboard page for companies
    if (user.hasAnyAuthorities(['ROLE_COMPANY'])) {
      return this.router.navigate(['dashboard', 'company']);
    }
    // For PAVs: to page for headhunters
    if (user.hasAnyAuthorities(['ROLE_PRIVATE_EMPLOYMENT_AGENT'])) {
      return this.router.navigate(['dashboard', 'pav']);
    }
  }
}



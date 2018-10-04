import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationStatus, User } from './authentication/user.model';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LandingNavigationService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  /**
   * Navigates the user to his landing page depending on his roles
   */
  public navigate() {
    this.authenticationService.getCurrentUser()
        .subscribe(user => this.navigateUser(user));
  }

  public navigateUser(user: User) {

    if (user === null) {
      return;
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
    if (user.containsAuthority('ROLE_JOBSEEKER_CLIENT')) {
      return this.router.navigate(['dashboard', 'job-seeker']);
    }
    // For company: to dashboard page for companies
    if (user.containsAuthority('ROLE_COMPANY')) {
      return this.router.navigate(['dashboard', 'company']);
    }
    // For PAVs: to page for headhunters
    if (user.containsAuthority('ROLE_PRIVATE_EMPLOYMENT_AGENT')) {
      this.router.navigate(['dashboard', 'pav']);
    }
  }
}



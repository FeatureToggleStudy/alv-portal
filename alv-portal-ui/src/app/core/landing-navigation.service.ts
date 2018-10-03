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

    console.log('trying to navigate... ', user);
    if (user === null) {
      return;
    }
    const roles = user.authorities;

    // For authorised user without permissions - navigate to finish registration page:
    if (user.registrationStatus === RegistrationStatus.UNREGISTERED) {
      this.router.navigate(['registration', 'finish']);
    }
    if (user.registrationStatus === RegistrationStatus.VALIDATION_PAV ||
        user.registrationStatus === RegistrationStatus.VALIDATION_EMP) {
      this.router.navigate(['registration', 'access-code']);
    }
    // For jobseekers: to dashboard page for jobseeker
    if (roles.includes('ROLE_JOBSEEKER_CLIENT')) {
      this.router.navigate(['dashboard', 'job-seeker']);
    } else if (roles.includes('ROLE_COMPANY')) {
      // For company: to dashboard page for companies
      this.router.navigate(['dashboard', 'company']);
    } else if (roles.includes('ROLE_PRIVATE_EMPLOYMENT_AGENT')) {
      // For PAVs: to page for headhunters
      this.router.navigate(['dashboard', 'pav']);
    }
  }
}



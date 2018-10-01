import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './authentication/user.model';
import { AuthenticationService } from './authentication/authentication.service';
import { SessionManagerService } from './authentication/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LandingNavigationService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private sessionManagerService: SessionManagerService) {

  }

  /**
   * Navigates the user to his landing page depending on his roles
   */
  public navigate() {
    if (!this.sessionManagerService.landingPageFirstShown) {
      this.authenticationService.getCurrentUser()
          .subscribe(user => this.navigateUser(user))
    }

  }

  public navigateUser(user: User) {

    console.log('trying to navigate... ', user);
    if (user === null) {
      return
    }
    const roles = user.authorities;

    // For authorised user without permissions - navigate to NZA:
    if (!roles || !roles.length) {
      debugger;
      this.router.navigate(['nza'])
    }
    // For jobseekers: to dashboard page for jobseeker
    if (roles.includes('ROLE_JOBSEEKER_CLIENT')) {
      debugger;
      this.router.navigate(['dashboard', 'job-seeker'])
    }
    // For company: to dashboard page for companies
    else if (roles.includes('ROLE_COMPANY')) {
      debugger;
      this.router.navigate(['dashboard', 'company'])
    }
    // For PAVs: to page for headhunters
    else if (roles.includes('ROLE_PRIVATE_EMPLOYMENT_AGENT')) {
      this.router.navigate(['dashboard', 'pva'])

    }
    this.sessionManagerService.landingPageFirstShown = Date.now().toString();

  }
}



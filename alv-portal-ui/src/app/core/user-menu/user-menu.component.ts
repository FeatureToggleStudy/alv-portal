import { Component, Input, OnInit } from '@angular/core';
import { RegistrationStatus, User } from '../auth/user.model';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { LandingNavigationService } from '../landing-navigation.service';

@Component({
  selector: 'alv-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input() user: User;

  @Input() noEiam: boolean;

  hasCompletedRegistration: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private landingNavigationService: LandingNavigationService) {
  }

  ngOnInit() {
    this.hasCompletedRegistration = this.user.registrationStatus === RegistrationStatus.REGISTERED;
  }

  logout() {
    this.authenticationService.logout();
    if (!this.noEiam) {
      document.location.href = '/api/redirect/logout';
    } else {
      this.router.navigate(['']);
    }
  }

  goToEiamProfile() {
    document.location.href = 'api/redirect/profile';
  }

  completeRegistration() {
    this.landingNavigationService.navigateUser(this.user);
  }
}

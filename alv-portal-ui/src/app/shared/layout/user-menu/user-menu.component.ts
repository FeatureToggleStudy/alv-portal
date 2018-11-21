import { Component, Input, OnInit } from '@angular/core';
import { RegistrationStatus, User } from '../../../core/auth/user.model';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { Router } from '@angular/router';
import { LandingNavigationService } from '../../../core/landing-navigation.service';

@Component({
  selector: 'alv-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  private _user: User;

  @Input() set user(user: User) {
    this._user = user;
    this.hasCompletedRegistration = this._user.registrationStatus === RegistrationStatus.REGISTERED;
  }
  get user() {
    return this._user;
  }

  @Input() noEiam: boolean;

  hasCompletedRegistration: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private landingNavigationService: LandingNavigationService) {
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    if (!this.noEiam) {
      document.location.href = '/authentication/logout';
    } else {
      this.router.navigate(['']);
    }
  }

  goToEiamProfile() {
    document.location.href = '/authentication/profile';
  }

  completeRegistration() {
    this.landingNavigationService.navigateUser(this.user);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { isAuthenticatedUser, User } from '../../../core/auth/user.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LandingNavigationService } from '../../../core/landing-navigation.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CompanyContactTemplate } from '../../backend-services/user-info/user-info.types';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'alv-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  hideRegistrationAction: boolean;

  isAuthenticated: boolean;

  private readonly FINISH_REGISTRATION_URL = '/registration/finish';

  private readonly ACCESS_CODE_URL = '/registration/access-code';

  constructor(private loginService: LoginService,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private landingNavigationService: LandingNavigationService) {
  }

  private _user: User;

  get user() {
    return this._user;
  }

  @Input() set user(user: User) {
    this._user = user;
    this.hideRegistrationAction = this.user.isRegistered();
    this.isAuthenticated = isAuthenticatedUser(user);
  }

  @Input() company: CompanyContactTemplate;

  ngOnInit() {
    this.subscribeOnRouteChanges();
  }

  logout() {
    this.loginService.logout();
  }

  completeRegistration() {
    this.landingNavigationService.navigateUser(this.user);
  }

  private subscribeOnRouteChanges() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (!this.user.isRegistered()) {
        this.hideRegistrationAction = this.location.isCurrentPathEqualTo(this.FINISH_REGISTRATION_URL) ||
          this.location.isCurrentPathEqualTo(this.ACCESS_CODE_URL);
      }
    });
  }
}

import { Component, Inject, Input, OnInit } from '@angular/core';
import { RegistrationStatus, User } from '../../../core/auth/user.model';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LandingNavigationService } from '../../../core/landing-navigation.service';
import { DOCUMENT, Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'alv-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  private _user: User;

  private readonly FINISH_REGISTRATION_URL = '/registration/finish';

  private readonly ACCESS_CODE_URL = '/registration/access-code';

  get user() {
    return this._user;
  }

  @Input() set user(user: User) {
    this._user = user;
    this.hideRegistrationAction = this._user.registrationStatus === RegistrationStatus.REGISTERED;
  }

  @Input() noEiam: boolean;

  hideRegistrationAction: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private landingNavigationService: LandingNavigationService,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.subscribeOnRouteChanges();
  }

  logout() {
    this.authenticationService.logout();
    if (!this.noEiam) {
      this.document.location.href = '/authentication/logout';
    } else {
      this.router.navigate(['']);
    }
  }

  goToEiamProfile() {
    this.document.location.href = '/authentication/profile';
  }

  completeRegistration() {
    this.landingNavigationService.navigateUser(this.user);
  }

  private subscribeOnRouteChanges() {
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.user.registrationStatus !== RegistrationStatus.REGISTERED) {
        this.hideRegistrationAction = this.location.isCurrentPathEqualTo(this.FINISH_REGISTRATION_URL) ||
            this.location.isCurrentPathEqualTo(this.ACCESS_CODE_URL);
      }
    });
  }
}

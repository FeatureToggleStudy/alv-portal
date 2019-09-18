import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProfileInfoService } from '../layout/header/profile-info.service';
import { LocalLoginComponent } from '../layout/local-login/local-login.component';
import { map, take } from 'rxjs/operators';
import { ModalService } from '../layout/modal/modal.service';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { AppContextService } from '../../core/app-context/app-context.service';
import { LandingNavigationService } from '../../core/landing-navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  noEiam = false;

  constructor(@Inject(DOCUMENT) private document: any,
              private modalService: ModalService,
              private profileInfoService: ProfileInfoService,
              private authenticationService: AuthenticationService,
              private appContextService: AppContextService,
              private landingNavigationService: LandingNavigationService) {

    this.profileInfoService.getProfileInfo().pipe(
      map(profileInfo => profileInfo.noEiam),
      take(1)
    ).subscribe((noEiam) => {
      this.noEiam = noEiam;
    });
  }

  login(): void {
    if (this.noEiam) {
      this.loginLocal();
    } else {
      this.appContextService.getEiamRedirectUrl().subscribe(eiamRedirectUrl => {
        this.loginEiam(eiamRedirectUrl);
      });
    }
  }

  logout(): void {
    this.authenticationService.logout();
    if (this.noEiam) {
      this.landingNavigationService.navigateHome();
    } else {
      this.document.location.href = '/authentication/logout';
    }
  }

  private loginEiam(redirectUrl: string) {
    this.document.location.href = `/login?redirectUrl=${redirectUrl}`;
  }

  private loginLocal() {
    this.modalService.openMedium(LocalLoginComponent, true);
  }
}

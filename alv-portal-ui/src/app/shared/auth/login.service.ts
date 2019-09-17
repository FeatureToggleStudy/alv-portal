import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { ProfileInfoService } from '../layout/header/profile-info.service';
import { LocalLoginComponent } from '../layout/local-login/local-login.component';
import { map, take } from 'rxjs/operators';
import { ModalService } from '../layout/modal/modal.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { AppContextService } from '../../core/app-context/app-context.service';
import { homeUrlMap } from '../../core/app-context/app-context.types';
import { AppContext } from '../../core/app-context/app-context.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  noEiam = false;

  private redirectUrlMap = {
    [AppContext.DEFAULT]: `${this.baseHref}landing`,
    [AppContext.COMPETENCE_CATALOG]: `${this.baseHref}kk/landing`
  };

  constructor(@Inject(APP_BASE_HREF) private baseHref: string,
              @Inject(DOCUMENT) private document: any,
              private modalService: ModalService,
              private profileInfoService: ProfileInfoService,
              private authenticationService: AuthenticationService,
              private appContextService: AppContextService,
              private router: Router) {

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
      this.appContextService.getLatestAppContext()
        .subscribe(appContext => {
          this.loginEiam(this.redirectUrlMap[appContext]);
        });
    }
  }

  private loginEiam(redirectUrl: string) {
    this.document.location.href = `/login?redirectUrl=${redirectUrl}`;
  }

  private loginLocal() {
    this.modalService.openMedium(LocalLoginComponent, true);
  }

  logout(): void {
    this.authenticationService.logout();
    if (this.noEiam) {
      this.appContextService.getLatestAppContext()
        .subscribe(appContext => {
          this.router.navigate(homeUrlMap[appContext]);
        });
    } else {
      this.document.location.href = '/authentication/logout';
    }
  }
}

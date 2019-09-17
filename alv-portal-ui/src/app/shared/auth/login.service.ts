import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { ProfileInfoService } from '../layout/header/profile-info.service';
import { LocalLoginComponent } from '../layout/local-login/local-login.component';
import { map, take } from 'rxjs/operators';
import { ModalService } from '../layout/modal/modal.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { AppContextService } from '../../core/auth/app-context.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  noEiam = false;

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
      this.appContextService.isCompetenceCatalog()
        .pipe(take(1))
        .subscribe(isCompetenceCatalog => {
          if (isCompetenceCatalog) {
            this.loginEiamCompetenceCatalog();
          } else {
            this.loginEiamDefault();
          }
        });
    }
  }

  private loginEiamDefault() {
    this.document.location.href = `/login?redirectUrl=${this.baseHref}landing`;
  }

  private loginEiamCompetenceCatalog() {
    this.document.location.href = `/login?redirectUrl=${this.baseHref}kk/landing`;
  }

  private loginLocal() {
    this.modalService.openMedium(LocalLoginComponent, true);
  }



  logout(): void {
    this.authenticationService.logout();
    if (this.noEiam) {
      this.appContextService.isCompetenceCatalog()
        .pipe(take(1))
        .subscribe(isCompetenceCatalog => {
          if (isCompetenceCatalog) {
            this.router.navigate(['kk']);
          } else {
            this.router.navigate(['']);
          }
        });
    } else {
      this.document.location.href = '/authentication/logout';
    }
  }
}

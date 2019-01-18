import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { ProfileInfoService } from '../layout/header/profile-info.service';
import { LocalLoginComponent } from '../layout/local-login/local-login.component';
import { map } from 'rxjs/operators';
import { ModalService } from '../layout/modal/modal.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(APP_BASE_HREF) private baseHref: string,
              private modalService: ModalService,
              private profileInfoService: ProfileInfoService) {

  }

  isEiamDisabled(): Observable<boolean> {
    return this.profileInfoService.getProfileInfo().pipe(
      map(profileInfo => {
        return profileInfo.noEiam;
      }));
  }

  login(): Observable<void> {
    return this.isEiamDisabled().pipe(
      map(noEiam => {
        if (noEiam) {
          this.modalService.openMedium(LocalLoginComponent, true);
        } else {
          document.location.href = `/login?redirectUrl=${this.baseHref}landing`;
        }
      })
    );
  }
}

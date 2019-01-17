import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { User } from '../../../core/auth/user.model';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { ProfileInfoService } from './profile-info.service';
import { LocalLoginComponent } from '../local-login/local-login.component';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n.service';
import { LANGUAGES } from '../../../core/languages.constants';
import { Observable } from 'rxjs';
import { CoreState } from '../../../core/state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { ToggleMobileNavigationsAction } from '../../../core/state-management/actions/core.actions';
import { ModalService } from '../modal/modal.service';
import { CompanyContactTemplate } from '../../backend-services/user-info/user-info.types';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'alv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractSubscriber implements OnInit {

  user: User;

  company: CompanyContactTemplate;

  noEiam: boolean;

  LANGUAGES: string[] = LANGUAGES;

  currentLanguage$: Observable<string>;

  constructor(@Inject(APP_BASE_HREF) private baseHref: string,
              private store: Store<CoreState>,
              private authenticationService: AuthenticationService,
              private profileInfoService: ProfileInfoService,
              private router: Router,
              private modalService: ModalService,
              private i18nService: I18nService) {
    super();
    this.currentLanguage$ = this.i18nService.currentLanguage$;
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
        this.user = user;
      });
    this.authenticationService.getCurrentCompany()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(company => {
        this.company = company;
      });
    this.profileInfoService.getProfileInfo()
      .subscribe(profileInfo => {
        this.noEiam = profileInfo.noEiam;
      });
  }

  toggleMobileNavigation() {
    this.store.dispatch(new ToggleMobileNavigationsAction({}));
  }

  login() {
    if (this.noEiam) {
      this.modalService.openMedium(LocalLoginComponent, true);
    } else {
      document.location.href = `/login?redirectUrl=${this.baseHref}landing`;
    }
  }

  changeLanguage(lang: string) {
    this.i18nService.changeLanguage(lang);
  }

}

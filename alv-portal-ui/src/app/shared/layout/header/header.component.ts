import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { User } from '../../../core/auth/user.model';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { ProfileInfoService } from './profile-info.service';
import { LocalLoginComponent } from '../../../core/auth/local-login/local-login.component';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n.service';
import { LANGUAGES } from '../../../core/languages.constants';
import { Observable } from 'rxjs';
import { ModalService } from '../../../core/auth/modal.service';
import { CoreState } from '../../../core/state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { ToggleMainNavigationAction } from '../../../core/state-management/actions/core.actions';

@Component({
  selector: 'alv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractSubscriber implements OnInit {

  user: User;
  noEiam: boolean;
  LANGUAGES: string[] = LANGUAGES;
  currentLanguage$: Observable<string>;

  constructor(private store: Store<CoreState>,
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
    this.profileInfoService.getProfileInfo()
      .subscribe(profileInfo => {
        this.noEiam = profileInfo.noEiam;
      });
  }

  toggleNavigation() {
    this.store.dispatch(new ToggleMainNavigationAction({}));
  }

  login() {
    if (this.noEiam) {
      this.modalService.openMedium(LocalLoginComponent, true);
    } else {
      document.location.href = '/login';
    }
  }

  changeLanguage(lang: string) {
    this.i18nService.changeLanguage(lang);
  }

}

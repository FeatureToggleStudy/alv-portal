import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { User } from '../../../core/auth/user.model';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n.service';
import { LANGUAGES } from '../../../core/languages.constants';
import { Observable } from 'rxjs';
import { CoreState } from '../../../core/state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { ToggleMobileNavigationsAction } from '../../../core/state-management/actions/core.actions';
import { CompanyContactTemplate } from '../../backend-services/user-info/user-info.types';
import { LoginService } from '../../auth/login.service';

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

  logoUrl$: Observable<string>;

  private readonly FILENAME_TRANSLATION_KEY = 'portal.home.logo-filename';

  private readonly LOGO_BASE_PATH = 'assets/img/logo/';

  constructor(private store: Store<CoreState>,
              private authenticationService: AuthenticationService,
              private loginSerivce: LoginService,
              private router: Router,
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

    this.logoUrl$ = this.i18nService.stream(this.FILENAME_TRANSLATION_KEY)
      .pipe(
        map((filename) => this.LOGO_BASE_PATH + filename),
        takeUntil(this.ngUnsubscribe)
      );

    this.noEiam = this.loginSerivce.noEiam;
  }

  toggleMobileNavigation() {
    this.store.dispatch(new ToggleMobileNavigationsAction({}));
  }

  login() {
    this.loginSerivce.login();
  }

  changeLanguage(lang: string) {
    this.i18nService.changeLanguage(lang);
  }

}

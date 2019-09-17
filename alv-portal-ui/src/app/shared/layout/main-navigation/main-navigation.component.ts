import {
  AfterViewInit,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  CoreState,
  getMainNavigationExpanded,
  getMobileNavigationExpanded
} from '../../../core/state-management/state/core.state.ts';
import { select, Store } from '@ngrx/store';
import {
  ToggleMainNavigationAction,
  ToggleMobileNavigationsAction
} from '../../../core/state-management/actions/core.actions';
import { MenuEntryService } from './menu-entry.service';
import { combineLatest, Observable } from 'rxjs';
import { MenuDefinition } from './menu-entry.type';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { isAuthenticatedUser, User, UserRole } from '../../../core/auth/user.model';
import { LoginService } from '../../auth/login.service';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import { WINDOW } from '../../../core/window.service';
import { AppContextService } from '../../../core/auth/app-context.service';

@Component({
  selector: 'alv-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  providers: [
    MenuEntryService,
  ]
})
export class MainNavigationComponent extends AbstractSubscriber implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class')
  readonly class = 'side-nav expanded navbar navbar-expand-lg p-0 d-block';

  mainNavigationCollapsed = true;

  @HostBinding('class.d-lg-none')
  hideDesktopMenu = true;

  mobileMenuExpanded: boolean;

  menuDefinition$: Observable<MenuDefinition>;

  currentUser: User;

  currentCompany$: Observable<CompanyContactTemplateModel>;

  userRole = UserRole;

  desktopMenuHeight: String;

  setDesktopMenuHeightFn = this.setDesktopMenuHeight.bind(this);

  constructor(private router: Router,
              private loginService: LoginService,
              private authenticationService: AuthenticationService,
              private appContextService: AppContextService,
              private store: Store<CoreState>,
              private menuEntryService: MenuEntryService,
              @Inject(WINDOW) private window: Window) {
    super();
  }

  ngOnInit() {
    this.menuDefinition$ = this.menuEntryService.prepareEntries();

    combineLatest(this.authenticationService.getCurrentUser(), this.appContextService.isCompetenceCatalog()).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(([user, isCompetenceCatalog]) => {
      this.hideDesktopMenu = !isAuthenticatedUser(user) && !isCompetenceCatalog;
      this.currentUser = user;
    });

    this.currentCompany$ = this.authenticationService.getCurrentCompany();

    this.store.pipe(select(getMobileNavigationExpanded)).pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe(mobileNavigationExpanded => {
      this.mobileMenuExpanded = mobileNavigationExpanded;
    });

    this.store.pipe(select(getMainNavigationExpanded)).pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe(mainNavigationExpanded => {
      this.mainNavigationCollapsed = !mainNavigationExpanded;
    });

    this.setDesktopMenuHeight();
  }

  ngAfterViewInit() {
    this.window.addEventListener('resize', this.setDesktopMenuHeightFn);
    this.setDesktopMenuHeight();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.window.removeEventListener('resize', this.setDesktopMenuHeightFn);
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

  toggleMobileSideNav() {
    this.store.dispatch(new ToggleMobileNavigationsAction({}));
  }

  toggleDesktopSideNav() {
    this.store.dispatch(new ToggleMainNavigationAction({}));
  }

  private setDesktopMenuHeight() {
    this.desktopMenuHeight = `calc(${this.window.innerHeight}px - 53px - 20px)`;
  }

}

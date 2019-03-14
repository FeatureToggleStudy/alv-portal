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
import { Observable } from 'rxjs';
import { MenuEntry } from './menu-entry.type';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { isAuthenticatedUser, User, UserRole } from '../../../core/auth/user.model';
import { LoginService } from '../../auth/login.service';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import { WINDOW } from '../../../core/window.service';

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
  isAnonymous = true;

  mobileMenuExpanded: boolean;

  menuEntries$: Observable<Array<MenuEntry>>;

  currentUser: User;

  currentCompany$: Observable<CompanyContactTemplateModel>;

  userRole = UserRole;

  constructor(private router: Router,
              private loginService: LoginService,
              private authenticationService: AuthenticationService,
              private store: Store<CoreState>,
              private menuEntryService: MenuEntryService,
              @Inject(WINDOW) private window: Window) {
    super();
  }

  ngOnInit() {
    this.menuEntries$ = this.menuEntryService.prepareEntries();

    this.authenticationService.getCurrentUser().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(user => {
      this.isAnonymous = !isAuthenticatedUser(user);
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
  }

  ngAfterViewInit() {
    this.window.addEventListener('resize', this.setDesktopMenuHeight);
    this.setDesktopMenuHeight();
  }

  ngOnDestroy() {
    this.window.removeEventListener('resize', this.setDesktopMenuHeight);
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
    const desktopMenuElement = document.querySelector('alv-main-navigation .desktop-menu');
    desktopMenuElement.setAttribute('style',
      `height: calc(${window.innerHeight}px - 53px - 20px);
                 top: 53px`);
  }

}

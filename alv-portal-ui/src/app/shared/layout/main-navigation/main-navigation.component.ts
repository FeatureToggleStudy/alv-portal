import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import {
  CoreState,
  getMainNavigationExpanded
} from '../../../core/state-management/state/core.state.ts';
import { select, Store } from '@ngrx/store';
import { ToggleMainNavigationAction } from '../../../core/state-management/actions/core.actions';

@Component({
  selector: 'alv-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent extends AbstractSubscriber implements OnInit {

  @HostBinding('class')
  readonly class = 'side-nav expanded navbar navbar-expand-lg p-0';

  @HostBinding('class.collapsed')
  collapsed = true;

  menuEntries: any = [];

  homeRouterLink: string;

  constructor(private router: Router,
              private store: Store<CoreState>,
              private authenticationService: AuthenticationService) {
    super();

    this.store.pipe(select(getMainNavigationExpanded))
      .pipe(
        tap((mainNavigationExpanded) => {
          this.collapsed = !mainNavigationExpanded;
        }),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe();
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser()
      .pipe(
        tap((user) => {
          this.homeRouterLink = user && user.isRegistered() ? '/dashboard' : '/home';
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
  }

  toggleMobileSideNav() {
    this.store.dispatch(new ToggleMainNavigationAction({}));
  }

  toggleDesktopSideNav() {
    this.store.dispatch(new ToggleMainNavigationAction({}));
  }
}

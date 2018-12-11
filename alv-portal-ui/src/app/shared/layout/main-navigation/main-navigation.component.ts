import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  CoreState,
  getMainNavigationExpanded
} from '../../../core/state-management/state/core.state.ts';
import { select, Store } from '@ngrx/store';
import { ToggleMainNavigationAction } from '../../../core/state-management/actions/core.actions';
import { MenuEntryService } from './menu-entry.service';
import { Observable } from 'rxjs';
import { MenuEntry } from './menu-entry.type';

@Component({
  selector: 'alv-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  providers: [
    MenuEntryService,
  ]
})
export class MainNavigationComponent extends AbstractSubscriber implements OnInit {

  @HostBinding('class')
  readonly class = 'side-nav expanded navbar navbar-expand-lg p-0';

  @HostBinding('class.collapsed')
  collapsed = true;

  menuEntries$: Observable<Array<MenuEntry>>;

  constructor(private router: Router,
              private store: Store<CoreState>,
              private menuEntryService: MenuEntryService) {
    super();
  }

  ngOnInit() {
    this.menuEntries$ = this.menuEntryService.prepareEntries();

    this.store.pipe(select(getMainNavigationExpanded)).pipe(
      tap((mainNavigationExpanded) => {
        this.collapsed = !mainNavigationExpanded;
      }),
      takeUntil(this.ngUnsubscribe),
    ).subscribe();
  }

  toggleMobileSideNav() {
    this.store.dispatch(new ToggleMainNavigationAction({}));
  }

  toggleDesktopSideNav() {
    this.store.dispatch(new ToggleMainNavigationAction({}));
  }
}

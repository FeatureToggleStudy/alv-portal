import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { MessageBusService, MessageType } from '../message-bus.service';
import { AbstractSubscriber } from '../../shared/components/abstract-subscriber';

@Component({
  selector: 'alv-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent extends AbstractSubscriber implements OnInit {

  @HostBinding('class') readonly class = 'side-nav expanded navbar navbar-expand-lg p-0';
  @HostBinding('class.collapsed') collapsed = false;

  menuEntries: any = [];

  open: boolean;
  a11yMessage: string;

  constructor(private router: Router,
              private messageBusService: MessageBusService) {
    super();
  }

  ngOnInit() {
    this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
    ).subscribe((routerEvent: any) => {
      this.a11yMessage = 'Navigated to: ' + this.findLabel(routerEvent.urlAfterRedirects);
    });

    this.messageBusService.of(MessageType.TOGGLE_NAVIGATION)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
        message => {
          this.toggleMobileSideNav();
        }
    );
  }

  toggleMobileSideNav() {
    this.open = !this.open;
  }

  toggleDesktopSideNav() {
    this.collapsed = !this.collapsed;
  }

  private findLabel(path: string): string {
    for (const menuEntry of this.menuEntries) {
      if (menuEntry.path === path) {
        return menuEntry.label;
      }
      if (menuEntry.submenuEntries) {
        for (const submenuEntry of menuEntry.submenuEntries) {
          if (submenuEntry.path === path) {
            return submenuEntry.label;
          }
        }
      }
    }
  }

}

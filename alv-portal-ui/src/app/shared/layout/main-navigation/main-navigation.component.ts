import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MessageBusService, MessageType } from '../../../core/message-bus.service';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { AuthenticationService } from '../../../core/auth/authentication.service';

@Component({
  selector: 'alv-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent extends AbstractSubscriber implements OnInit {

  @HostBinding('class') readonly class = 'side-nav expanded navbar navbar-expand-lg p-0';
  @HostBinding('class.collapsed') collapsed = true;

  menuEntries: any = [];

  open: boolean;

  homeRouterLink: string;

  constructor(private router: Router,
              private messageBusService: MessageBusService,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.messageBusService.of(MessageType.TOGGLE_MOBILE_NAVIGATION)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            message => {
              this.toggleMobileSideNav();
            }
        );
    this.messageBusService.of<boolean>(MessageType.TOGGLE_DESKTOP_NAVIGATION)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            collapsed => {
              this.collapseDesktopSideNav(collapsed);
            }
        );
    this.authenticationService.getCurrentUser()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            user => {
              this.homeRouterLink = user && user.isRegistered() ? '/dashboard' : '/home';
            }
        );
  }

  toggleMobileSideNav() {
    this.open = !this.open;
  }

  toggleDesktopSideNav() {
    this.collapsed = !this.collapsed;
  }

  collapseDesktopSideNav(collapsed: boolean) {
    this.collapsed = collapsed;
  }
}

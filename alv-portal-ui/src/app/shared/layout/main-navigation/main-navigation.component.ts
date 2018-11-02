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
  @HostBinding('class.collapsed') collapsed = false;

  menuEntries: any = [];

  open: boolean;

  homeRouterLink: string;

  constructor(private router: Router,
              private messageBusService: MessageBusService,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.messageBusService.of(MessageType.TOGGLE_NAVIGATION)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            message => {
              this.toggleMobileSideNav();
            }
        );
    this.authenticationService.getCurrentUser()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            user => {
              this.homeRouterLink = user.hasAnyAuthorities([
                'ROLE_JOBSEEKER_CLIENT',
                'ROLE_COMPANY',
                'ROLE_PRIVATE_EMPLOYMENT_AGENT'
              ]) ? '/dashboard' : '/home';
            }
        );
  }

  toggleMobileSideNav() {
    this.open = !this.open;
  }

  toggleDesktopSideNav() {
    this.collapsed = !this.collapsed;
  }

}

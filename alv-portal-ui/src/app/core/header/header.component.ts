import { Component, OnInit } from '@angular/core';
import { MessageBusService, MessageType } from '../message-bus.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/user.model';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../shared/components/abstract-subscriber';

@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractSubscriber implements OnInit {

  user: User;

  constructor(private messageBusService: MessageBusService,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(user => {
      this.user = user;
    });
  }

  toggleNavigation() {
    this.messageBusService.emit(MessageType.TOGGLE_NAVIGATION);
  }

  login() {
    // TODO: replace fake login with modal
    this.authenticationService.login({
      username: 'admin',
      password: 'admin',
      rememberMe: true
    }).subscribe();
  }

  logout() {
    this.authenticationService.logout();
  }
}

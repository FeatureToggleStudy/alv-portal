import { Component, OnInit } from '@angular/core';
import { MessageBusService, MessageType } from '../message-bus.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/user.model';

@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private messageBusService: MessageBusService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.messageBusService.of<User>(MessageType.CURRENT_USER).subscribe(user => {
      this.user = user;
    });
  }

  toggleNavigation() {
    this.messageBusService.emit(MessageType.TOGGLE_NAVIGATION);
  }

  login() {
    // TODO: remove fake login with modal
    this.authenticationService.login({
      username: 'admin',
      password: 'admin',
      rememberMe: true
    }).subscribe(user => {
      //this.user = user;
    });
  }

  logout() {
    this.authenticationService.logout().subscribe();
  }
}

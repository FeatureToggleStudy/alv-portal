import { Component, OnInit } from '@angular/core';
import { MessageBusService, MessageType } from '../message-bus.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private messageBusService: MessageBusService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.session().subscribe();
  }

  toggleNavigation() {
    this.messageBusService.emit<string>(MessageType.TOGGLE_NAVIGATION, 'toggle');
  }

}

import { Component, OnInit } from '@angular/core';
import { MessageBusService, MessageType } from '../message-bus.service';

@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private messageBusService: MessageBusService) { }

  ngOnInit() {
  }

  toggleNavigation() {
    this.messageBusService.emit(MessageType.TOGGLE_NAVIGATION, 'toggle');
  }

}

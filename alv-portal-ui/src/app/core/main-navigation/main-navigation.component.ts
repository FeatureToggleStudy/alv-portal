import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
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

  constructor(private router: Router,
              private messageBusService: MessageBusService) {
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
  }

  toggleMobileSideNav() {
    this.open = !this.open;
  }

  toggleDesktopSideNav() {
    this.collapsed = !this.collapsed;
  }

}

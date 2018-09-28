import { Component, OnInit } from '@angular/core';
import { MessageBusService, MessageType } from '../message-bus.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/user.model';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../shared/components/abstract-subscriber';
import { ProfileInfoService } from '../profile-info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalLoginComponent } from '../local-login/local-login.component';

@Component({
  selector: 'os-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractSubscriber implements OnInit {

  user: User;
  noEiam: boolean;

  constructor(private messageBusService: MessageBusService,
              private authenticationService: AuthenticationService,
              private profileInfoService: ProfileInfoService,
              private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(user => {
      this.user = user;
    });
    this.profileInfoService.getProfileInfo()
        .subscribe(profileInfo => {
          this.noEiam = profileInfo.noEiam;
        });
  }

  toggleNavigation() {
    this.messageBusService.emit(MessageType.TOGGLE_NAVIGATION);
  }

  login() {
    const modalRef = this.modalService.open(LocalLoginComponent);
    // TODO: replace fake login with modal

  }

  logout() {
    this.authenticationService.logout();
  }
}

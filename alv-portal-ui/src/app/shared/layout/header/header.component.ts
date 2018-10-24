import { Component, OnInit } from '@angular/core';
import { MessageBusService, MessageType } from '../../../core/message-bus.service';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { User } from '../../../core/auth/user.model';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { ProfileInfoService } from './profile-info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalLoginComponent } from '../../../core/auth/local-login/local-login.component';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n.service';

@Component({
  selector: 'alv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractSubscriber implements OnInit {

  user: User;
  noEiam: boolean;

  constructor(private messageBusService: MessageBusService,
              private authenticationService: AuthenticationService,
              private profileInfoService: ProfileInfoService,
              private router: Router,
              private modalService: NgbModal,
              private i18n: I18nService) {
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
    if (this.noEiam) {
      const modalRef = this.modalService.open(LocalLoginComponent);
    } else {
      document.location.href = '/login';
    }
  }

  changeLanguage(lang) {
    this.i18n.changeLanguage(lang);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { VersionComponent } from './version/version.component';
import { HeaderComponent } from './header/header.component';
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbPopoverModule
} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PanelComponent } from './panel/panel.component';
import { PanelGroupComponent } from './panel-group/panel-group.component';
import { NotificationComponent } from './notifications/notification/notification.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { SharedAuthModule } from '../auth/shared-auth.module';
import { NotificationsContainerComponent } from './notifications/notifications-container/notifications-container.component';
import { NotificationsService } from '../../core/notifications.service';
import { AlertComponent } from './notifications/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPopoverModule,
    NgbModalModule,
    RouterModule,
    HttpClientModule,
    SharedAuthModule
  ],
  declarations: [
    UserMenuComponent,
    MainNavigationComponent,
    NavigationContainerComponent,
    VersionComponent,
    HeaderComponent,
    PanelComponent,
    PanelGroupComponent,
    NotificationComponent,
    HelpButtonComponent,
    NotificationsContainerComponent,
    AlertComponent
  ],
  exports: [
    NavigationContainerComponent,
    HeaderComponent,
    VersionComponent,
    PanelComponent,
    PanelGroupComponent,
    NotificationComponent,
    HelpButtonComponent,
    NotificationsContainerComponent,
    AlertComponent
  ],
  providers: [
    NotificationsService
  ]
})
export class LayoutModule {
}

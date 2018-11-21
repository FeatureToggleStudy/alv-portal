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
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { NotificationsService } from '../../core/notifications.service';
import { AlertComponent } from './notifications/alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '../forms/forms.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPopoverModule,
    NgbModalModule,
    RouterModule,
    HttpClientModule,
    SharedAuthModule,
    FormsModule,
    TranslateModule
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
    NotificationsComponent,
    AlertComponent,
    ModalComponent,
    ConfirmModalComponent,
    StepIndicatorComponent
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    NavigationContainerComponent,
    HeaderComponent,
    VersionComponent,
    PanelComponent,
    PanelGroupComponent,
    NotificationComponent,
    HelpButtonComponent,
    NotificationsComponent,
    AlertComponent,
    ModalComponent,
    StepIndicatorComponent
  ],
  providers: [
    NotificationsService
  ]
})
export class LayoutModule {
}

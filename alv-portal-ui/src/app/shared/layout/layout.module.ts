import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { VersionComponent } from './version/version.component';
import { HeaderComponent } from './header/header.component';
import {
  NgbAccordion,
  NgbAccordionModule,
  NgbAlert,
  NgbAlertModule,
  NgbDropdown,
  NgbDropdownModule,
  NgbModalModule,
  NgbPanel,
  NgbPanelContent,
  NgbPanelTitle,
  NgbPopoverModule,
  NgbTooltip,
  NgbTooltipModule,
  ɵp,
  ɵq,
  ɵr
} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { PanelGroupComponent } from './panel-group/panel-group.component';
import { NotificationComponent } from './notifications/notification/notification.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { SharedAuthModule } from '../auth/shared-auth.module';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { AlertComponent } from './notifications/alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '../forms/forms.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { LanguageComponent } from './language.component';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { LocalLoginComponent } from './local-login/local-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuEntryComponent } from './main-navigation/menu-entry/menu-entry.component';
import { InlineBadgesComponent } from './inline-badges/inline-badges.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    SharedAuthModule,
    FormsModule,
    TranslateModule,
    NgbDropdownModule,
    NgbPopoverModule,
    NgbModalModule,
    NgbAlertModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbDropdownModule,
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
    StepIndicatorComponent,
    ConfirmModalComponent,
    LanguageComponent,
    ConfirmModalComponent,
    LocalLoginComponent,
    MenuEntryComponent,
    InlineBadgesComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    LocalLoginComponent
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
    NgbAlert,
    NgbTooltip,
    NgbAccordion,
    NgbPanel,
    NgbPanelContent,
    NgbPanelTitle,
    NgbDropdown,
    ɵq, // needed for the Dropdown menu to work
    ɵp,
    ɵr,
    LanguageComponent,
    ModalComponent,
    StepIndicatorComponent,
    ReactiveFormsModule,
    InlineBadgesComponent
  ]
})
export class LayoutModule {
}

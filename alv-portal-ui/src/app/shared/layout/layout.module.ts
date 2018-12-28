import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { VersionComponent } from './version/version.component';
import { HeaderComponent } from './header/header.component';
import {
  NgbAlert,
  NgbAlertModule,
  NgbCollapseModule,
  NgbDropdown,
  NgbDropdownModule,
  NgbModalModule,
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
import { LanguageSkillsComponent } from './language-skills/language-skills.component';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { LocalLoginComponent } from './local-login/local-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuEntryComponent } from './main-navigation/menu-entry/menu-entry.component';
import { InlineBadgesComponent } from './inline-badges/inline-badges.component';
import { CollapsePanelComponent } from './collapse-panel/collapse-panel.component';
import { PostAddressComponent } from './post-address/post-address.component';
import { ResultListItemComponent } from './result-list-item/result-list-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { ThreeColumnLayoutComponent } from './three-column-layout/three-column-layout.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

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
    NgbCollapseModule,
    NgbModalModule,
    NgbAlertModule,
    NgbTooltipModule,
    NgbDropdownModule,
    PipesModule
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
    LanguageSkillsComponent,
    ConfirmModalComponent,
    LocalLoginComponent,
    MenuEntryComponent,
    InlineBadgesComponent,
    CollapsePanelComponent,
    PostAddressComponent,
    ResultListItemComponent,
    ThreeColumnLayoutComponent,
    ScrollToTopComponent
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
    NgbDropdown,
    ɵq, // needed for the Dropdown menu to work
    ɵp,
    ɵr,
    LanguageSkillsComponent,
    ModalComponent,
    StepIndicatorComponent,
    ReactiveFormsModule,
    InlineBadgesComponent,
    CollapsePanelComponent,
    PostAddressComponent,
    ResultListItemComponent,
    ThreeColumnLayoutComponent,
    ScrollToTopComponent
  ]
})
export class LayoutModule {
}

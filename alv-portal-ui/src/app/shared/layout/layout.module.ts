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
import { ThreeColumnLayoutComponent } from './column-layout/three-column-layout/three-column-layout.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ListItemContentComponent } from './list-item-content/list-item-content.component';
import { ContactModalComponent } from '../../candidate-search/candidate-detail/contact-modal/contact-modal.component';
import { CandidateContactRepository } from '../backend-services/candidate/candidate-contact-repository';
import { UserNameAndCompanyComponent } from './user-name-and-company/user-name-and-company.component';
import { TwoColumnLayoutComponent } from './column-layout/two-column-layout/two-column-layout.component';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { SvgFixingDirective } from './svg-fixing.directive';

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
    NotificationComponent,
    HelpButtonComponent,
    NotificationsComponent,
    AlertComponent,
    ModalComponent,
    StepIndicatorComponent,
    LanguageSkillsComponent,
    ConfirmModalComponent,
    LocalLoginComponent,
    MenuEntryComponent,
    InlineBadgesComponent,
    CollapsePanelComponent,
    PostAddressComponent,
    ResultListItemComponent,
    ThreeColumnLayoutComponent,
    ScrollToTopComponent,
    ListItemContentComponent,
    ContactModalComponent,
    UserNameAndCompanyComponent,
    ContactModalComponent,
    TwoColumnLayoutComponent,
    CustomIconComponent,
    SvgFixingDirective
  ],
  providers: [
    CandidateContactRepository
  ],
  entryComponents: [
    ConfirmModalComponent,
    LocalLoginComponent,
    ContactModalComponent
  ],
  exports: [
    NavigationContainerComponent,
    HeaderComponent,
    VersionComponent,
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
    ScrollToTopComponent,
    ListItemContentComponent,
    TwoColumnLayoutComponent,
    CustomIconComponent,
    SvgFixingDirective
  ]
})
export class LayoutModule {
}

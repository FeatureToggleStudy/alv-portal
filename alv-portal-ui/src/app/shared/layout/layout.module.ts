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
import { NotificationComponent } from './message/notification/notification.component';
import { StampComponent } from './message/stamp/stamp.component';
import { StampGroupComponent } from './message/stamp-group/stamp-group.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { IsAuthenticatedDirective } from './is-authenticated/is-authenticated.directive';
import { HasAnyAuthorityDirective } from './has-any-authority/has-any-authority.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPopoverModule,
    NgbModalModule,
    RouterModule,
    HttpClientModule
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
    StampComponent,
    StampGroupComponent,
    HelpButtonComponent,
    IsAuthenticatedDirective,
    HasAnyAuthorityDirective
  ],
  exports: [
    NavigationContainerComponent,
    HeaderComponent,
    VersionComponent,
    PanelComponent,
    PanelGroupComponent,
    NotificationComponent,
    StampComponent,
    StampGroupComponent,
    HelpButtonComponent,
    IsAuthenticatedDirective,
    HasAnyAuthorityDirective
  ]
})
export class LayoutModule {
}

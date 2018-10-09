import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { VersionComponent } from './version/version.component';
import { HeaderComponent } from './header/header.component';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PanelComponent } from './panel/panel.component';
import { PanelGroupComponent } from './panel-group/panel-group.component';
import { NotificationComponent } from './message/notification/notification.component';
import { StampComponent } from './message/stamp/stamp.component';
import { StampGroupComponent } from './message/stamp-group/stamp-group.component';
import { HelpButtonComponent } from './help-button/help-button.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPopoverModule,
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
  ]
})
export class LayoutModule {
}

import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { VersionComponent } from './version/version.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { SharedModule } from '../shared/shared.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HasAnyAuthorityDirective } from './auth/has-any-authority/has-any-authority.directive';
import { IsAuthenticatedDirective } from './auth/is-authenticated/is-authenticated.directive';
import { AuthModule } from './auth/auth.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [
    VersionComponent,
    HeaderComponent,
    NavigationContainerComponent,
    MainNavigationComponent,
    UserMenuComponent,
    MainNavigationComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule
  ],
  entryComponents: [],
  exports: [
    VersionComponent,
    HeaderComponent,
    NavigationContainerComponent,
    HasAnyAuthorityDirective,
    IsAuthenticatedDirective,
    LandingPageComponent,
    NotificationService
  ],
  providers: []
})
export class CoreModule {
  /**
   * Prevent reimport of CoreModule
   * @param parentModule will be `null` if {@link CoreModule} is not reimported by another module,
   * otherwise it will throw an error.
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}


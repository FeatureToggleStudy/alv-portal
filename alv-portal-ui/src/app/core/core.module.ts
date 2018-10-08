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
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './dashboard/pages/landing-page/landing-page.component';
import { JobSeekerHomePageComponent } from './home-page/job-seeker-home-page/job-seeker-home-page.component';
import { CompanyHomePageComponent } from './home-page/company-home-page/company-home-page.component';
import { PavHomePageComponent } from './home-page/pav-home-page/pav-home-page.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority/has-any-authority.directive';
import { IsAuthenticatedDirective } from './auth/is-authenticated/is-authenticated.directive';
import { AuthModule } from './auth/auth.module';

import { ToolbarComponent } from './home-page/toolbar/toolbar.component';
import { ToolbarItemComponent } from './home-page/toolbar-item/toolbar-item.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    VersionComponent,
    HeaderComponent,
    NavigationContainerComponent,
    MainNavigationComponent,
    UserMenuComponent,
    MainNavigationComponent,
    HomePageComponent,
    JobSeekerHomePageComponent,
    CompanyHomePageComponent,
    PavHomePageComponent,
    ToolbarComponent,
    ToolbarItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    DashboardModule
  ],
  entryComponents: [],
  exports: [
    VersionComponent,
    HeaderComponent,
    NavigationContainerComponent,
    HasAnyAuthorityDirective,
    IsAuthenticatedDirective
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


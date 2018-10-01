import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { VersionComponent } from './version/version.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { JobSeekerLandingPageComponent } from './landing/job-seeker-landing-page/job-seeker-landing-page.component';
import { PvaLandingPageComponent } from './landing/pva-landing-page/pva-landing-page.component';
import { OrganizationLandingPageComponent } from './landing/organization-landing-page/organization-landing-page.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';

@NgModule({
  declarations: [
    VersionComponent,
    HeaderComponent,
    NavigationContainerComponent,
    MainNavigationComponent,
    JobSeekerLandingPageComponent,
    PvaLandingPageComponent,
    OrganizationLandingPageComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HttpClientModule
  ],
  exports: [
    VersionComponent,
    HeaderComponent,
    NavigationContainerComponent
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


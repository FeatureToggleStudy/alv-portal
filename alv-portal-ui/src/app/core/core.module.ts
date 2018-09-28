import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { VersionComponent } from './version/version.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { LocalLoginComponent } from './local-login/local-login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VersionComponent,
    HeaderComponent,
    NavigationContainerComponent,
    MainNavigationComponent,
    LocalLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HttpClientModule,
    SharedModule
  ],
  entryComponents: [
      LocalLoginComponent
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


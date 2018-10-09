import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HasAnyAuthorityDirective } from './auth/has-any-authority/has-any-authority.directive';
import { IsAuthenticatedDirective } from './auth/is-authenticated/is-authenticated.directive';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AuthModule
  ],
  entryComponents: [],
  exports: [
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


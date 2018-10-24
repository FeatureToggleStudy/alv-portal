import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthModule } from './auth/auth.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [],
  imports: [
    AuthModule
  ],
  entryComponents: [],
  exports: [
    AuthModule
  ],
  providers: [
    CookieService
  ]
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


import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthModule } from './auth/auth.module';
import { CookieService } from 'ngx-cookie-service';
import { GlobalErrorHandler } from './error-handler/global-error-handler';

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
    CookieService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }

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


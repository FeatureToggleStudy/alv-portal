import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthModule } from './auth/auth.module';
import { CookieService } from 'ngx-cookie-service';
import { GlobalErrorHandler } from './error-handler/global-error-handler';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { coreReducers } from './state-management/reducers/core.reducers';
import { CoreEffects } from './state-management/effects/core.effects';

@NgModule({
  declarations: [],
  imports: [
    AuthModule,
    StoreModule.forRoot({ coreState: coreReducers }),
    EffectsModule.forRoot([CoreEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
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


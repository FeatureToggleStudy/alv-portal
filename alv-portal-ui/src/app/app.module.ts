import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { SessionManagerService } from './core/authentication/session-manager.service';
import { AuthExpiredInterceptor } from './core/interceptor/auth-expired.interceptor';
import { AuthenticationService } from './core/authentication/authentication.service';

/**
 * Setting up the ngx-translate
 * @param http
 */
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, environment.translationBaseUrl, '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbTabsetModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [
        SessionManagerService
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [
        AuthenticationService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

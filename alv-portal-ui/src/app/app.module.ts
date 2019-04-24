import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowcaseComponent } from './showcase/showcase.component';
import { WINDOW_PROVIDERS } from './core/window.service';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [AppComponent, ShowcaseComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbTabsetModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BlockUIModule.forRoot({
      delayStart: 2000,
      delayStop: 300
    })
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}

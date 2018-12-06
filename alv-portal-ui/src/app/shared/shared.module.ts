import { NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LayoutModule } from './layout/layout.module';
import { FormsModule as AlvFormsModule } from './forms/forms.module';
import { SharedAuthModule } from './auth/shared-auth.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    AlvFormsModule,
    PrettyJsonModule,
    LayoutModule,
    SharedAuthModule
  ],
  entryComponents: [],
  exports: [
    CommonModule,
    TranslateModule,
    AlvFormsModule,
    LandingPageComponent,
    LayoutModule
  ]
})
export class SharedModule {
}



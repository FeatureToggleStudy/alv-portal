import { NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from './layout/layout.module';
import { FormsModule as AlvFormsModule } from './forms/forms.module';
import { SharedAuthModule } from './auth/shared-auth.module';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { PipesModule } from './pipes/pipes.module';
import { GeoLocationSelectionComponent } from './localities/geo-location-selection/geo-location-selection.component';
import { LandingPageGuard } from './landing-page/landing-page.guard';
import { DummyComponent } from './dummy/dummy.component';
import { LegalTermsComponent } from './legal-terms/legal-terms.component';

@NgModule({
  declarations: [
    GeoLocationSelectionComponent,
    DummyComponent,
    LegalTermsComponent
  ],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    AlvFormsModule,
    PrettyJsonModule,
    LayoutModule,
    SharedAuthModule,
    ClipboardModule,
    PipesModule
  ],
  entryComponents: [],
  exports: [
    CommonModule,
    TranslateModule,
    AlvFormsModule,
    DummyComponent,
    LayoutModule,
    PipesModule,
    ClipboardModule,
    MarkdownModule,
    SharedAuthModule,
    GeoLocationSelectionComponent,
    LegalTermsComponent
  ],
  providers: [
    LandingPageGuard
  ]
})
export class SharedModule {

}



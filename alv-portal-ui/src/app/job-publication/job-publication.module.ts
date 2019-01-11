import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../widgets/widgets.module';
import { JobPublicationRoutingModule } from './job-publication-routing.module';
import { JobPublicationComponent } from './job-publication.component';
import { JobPublicationFormComponent } from './job-publication-form/job-publication-form.component';
import { OccupationComponent } from './job-publication-form/occupation/occupation.component';
import { JobDescriptionComponent } from './job-publication-form/job-description/job-description.component';
import { LanguagesComponent } from './job-publication-form/languages/languages.component';
import { EmploymentComponent } from './job-publication-form/employment/employment.component';
import { LocationComponent } from './job-publication-form/location/location.component';
import { CompanyComponent } from './job-publication-form/company/company.component';
import { IsoCountryService } from './job-publication-form/iso-country.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobPublicationRoutingModule,
    WidgetsModule
  ],
  declarations: [
    JobPublicationComponent,
    JobPublicationFormComponent,
    OccupationComponent,
    JobDescriptionComponent,
    LanguagesComponent,
    EmploymentComponent,
    LocationComponent,
    CompanyComponent
  ],
  providers: [
    IsoCountryService
  ]
})
export class JobPublicationModule {

}

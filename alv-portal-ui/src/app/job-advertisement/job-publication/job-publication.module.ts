import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../../widgets/widgets.module';
import { JobPublicationRoutingModule } from './job-publication-routing.module';
import { JobPublicationComponent } from './job-publication.component';
import { JobPublicationFormComponent } from './job-publication-form/job-publication-form.component';
import { OccupationComponent } from './job-publication-form/occupation/occupation.component';
import { JobDescriptionComponent } from './job-publication-form/job-description/job-description.component';
import { LanguagesComponent } from './job-publication-form/languages/languages.component';
import { EmploymentComponent } from './job-publication-form/employment/employment.component';
import { ContactComponent } from './job-publication-form/contact/contact.component';
import { LocationComponent } from './job-publication-form/location/location.component';
import { CompanyComponent } from './job-publication-form/company/company.component';
import { IsoCountryService } from '../../shared/localities/iso-country.service';
import { ZipCityInputComponent } from './job-publication-form/zip-city-input/zip-city-input.component';
import { PublicContactComponent } from './job-publication-form/public-contact/public-contact.component';
import { PublicationComponent } from './job-publication-form/publication/publication.component';
import { EmployerComponent } from './job-publication-form/employer/employer.component';
import { ApplicationComponent } from './job-publication-form/application/application.component';
import { PostAddressFormComponent } from './job-publication-form/post-address-form/post-address-form.component';
import { JobPublicationFormValueFactory } from './job-publication-form/job-publication-form-value-factory';
import { JobPublicationResolver } from './job-publication.resolver';
import { JobPublicationGuard } from './job-publication.guard';

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
    ContactComponent,
    LocationComponent,
    CompanyComponent,
    ZipCityInputComponent,
    PublicContactComponent,
    PublicationComponent,
    EmployerComponent,
    ApplicationComponent,
    PostAddressFormComponent
  ],
  exports: [
    PostAddressFormComponent
  ],
  providers: [
    IsoCountryService,
    JobPublicationFormValueFactory,
    JobPublicationResolver,
    JobPublicationGuard
  ]
})
export class JobPublicationModule {

}

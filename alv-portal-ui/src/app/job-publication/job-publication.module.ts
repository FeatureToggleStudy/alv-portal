import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../widgets/widgets.module';
import { JobPublicationRoutingModule } from './job-publication-routing.module';
import { JobPublicationComponent } from './job-publication.component';
import { JobPublicationFormComponent } from './job-publication-form/job-publication-form.component';
import { OccupationComponent } from './job-publication-form/occupation/occupation.component';

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
    OccupationComponent
  ],
  providers: []
})
export class JobPublicationModule {

}

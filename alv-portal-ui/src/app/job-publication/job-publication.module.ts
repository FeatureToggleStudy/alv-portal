import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../widgets/widgets.module';
import { JobPublicationRoutingModule } from './job-publication-routing.module';
import { JobPublicationComponent } from './job-publication.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobPublicationRoutingModule,
    WidgetsModule
  ],
  declarations: [
    JobPublicationComponent
  ],
  providers: []
})
export class JobPublicationModule {

}

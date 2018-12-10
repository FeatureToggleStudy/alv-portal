import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OccupationPresentationService } from './reference-service/occupation-presentation.service';
import { OccupationLabelService } from './reference-service/occupation-label.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    OccupationPresentationService,
    OccupationLabelService,
  ]
})
export class BackendServicesModule {
}

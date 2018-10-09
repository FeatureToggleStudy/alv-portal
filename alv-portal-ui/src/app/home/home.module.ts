import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page.component';
import { JobSeekerHomePageComponent } from './pages/job-seeker-home-page/job-seeker-home-page.component';
import { CompanyHomePageComponent } from './pages/company-home-page/company-home-page.component';
import { PavHomePageComponent } from './pages/pav-home-page/pav-home-page.component';
import { ToolbarButtonComponent } from './pages/toolbar-button/toolbar-button.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FindCandidateHomeWidgetComponent } from './widgets/find-candidate-home-widget/find-candidate-home-widget.component';
import { FindJobHomeWidgetComponent } from './widgets/find-job-home-widget/find-job-home-widget.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    CommonModule,
    HomeRoutingModule,
    NgbTooltipModule
  ],
  declarations: [
    HomePageComponent,
    JobSeekerHomePageComponent,
    CompanyHomePageComponent,
    PavHomePageComponent,
    ToolbarButtonComponent,
    FindCandidateHomeWidgetComponent,
    FindJobHomeWidgetComponent
  ],
  exports: [
    FindCandidateHomeWidgetComponent,
    FindJobHomeWidgetComponent
  ]
})
export class HomeModule {
}

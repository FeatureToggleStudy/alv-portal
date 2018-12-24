import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSeekerHomeComponent } from './job-seeker-home/job-seeker-home.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { PavHomeComponent } from './pav-home/pav-home.component';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsModule } from '../widgets/widgets.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    CommonModule,
    HomeRoutingModule,
    NgbTooltipModule,
    WidgetsModule
  ],
  declarations: [
    HomeComponent,
    JobSeekerHomeComponent,
    CompanyHomeComponent,
    PavHomeComponent,
    ToolbarButtonComponent,
  ],
  exports: []
})
export class HomeModule {
}

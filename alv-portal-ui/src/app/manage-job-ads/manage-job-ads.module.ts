import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobAdSearchComponent } from './manage-job-ad-search/manage-job-ad-search.component';
import { ManageJobAdDetailComponent } from './manage-job-ad-detail/manage-job-ad-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ManageJobAdSearchComponent, ManageJobAdDetailComponent]
})
export class ManageJobAdsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobAdSearchComponent } from './manage-job-ad-search/manage-job-ad-search.component';
import { ManageJobAdDetailComponent } from './manage-job-ad-detail/manage-job-ad-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ManageJobAdsEffects } from './state-management/effects';
import { manageJobAdsReducer } from './state-management/reducers';
import { JobAdManagementRowComponent } from './manage-job-ad-search/job-ad-management-row/job-ad-management-row.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('manageJobAds', manageJobAdsReducer),
    EffectsModule.forFeature([ManageJobAdsEffects]),
  ],
  declarations: [ManageJobAdSearchComponent, ManageJobAdDetailComponent, JobAdManagementRowComponent]
})
export class ManageJobAdsModule {
}

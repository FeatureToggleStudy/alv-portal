import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobAdSearchComponent } from './manage-job-ad-search/manage-job-ad-search.component';
import { ManageJobAdDetailComponent } from './manage-job-ad-detail/manage-job-ad-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ManageJobAdsEffects } from './state-management/effects';
import { manageJobAdsReducer } from './state-management/reducers';
import { ManageJobAdsRoutingModule } from './manage-job-ads-routing.module';
import { ManagedJobAdSearchGuard } from './manage-job-ad-search/managed-job-ad-search.guard';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('manageJobAds', manageJobAdsReducer),
    EffectsModule.forFeature([ManageJobAdsEffects]),
    ManageJobAdsRoutingModule
  ],
  declarations: [ManageJobAdSearchComponent, ManageJobAdDetailComponent],
  providers: [
    ManagedJobAdSearchGuard
  ]
})
export class ManageJobAdsModule {
}

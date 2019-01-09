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
import { JobAdManagementRowComponent } from './manage-job-ad-search/job-ad-management-row/job-ad-management-row.component';
import { SharedModule } from '../shared/shared.module';
import { JobAdCancellationComponent } from './shared/job-ad-cancellation/job-ad-cancellation.component';
import { ModalService } from '../shared/layout/modal/modal.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('manageJobAds', manageJobAdsReducer),
    EffectsModule.forFeature([ManageJobAdsEffects]),
    SharedModule,
    ManageJobAdsRoutingModule
  ],
  declarations: [
    ManageJobAdSearchComponent,
    ManageJobAdDetailComponent,
    JobAdManagementRowComponent,
    JobAdCancellationComponent
  ],
  providers: [
    ModalService,
    ManagedJobAdSearchGuard
  ],
  entryComponents: [
    JobAdCancellationComponent
  ]
})
export class ManageJobAdsModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ManageJobAdSearchComponent
} from './manage-job-ad-search/manage-job-ad-search.component';
import { ManageJobAdDetailComponent } from './manage-job-ad-detail/manage-job-ad-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ManageJobAdsEffects } from './state-management/effects';
import { manageJobAdsReducer } from './state-management/reducers';
import { ManageJobAdsRoutingModule } from './manage-job-ads-routing.module';
import { ManagedJobAdSearchGuard } from './manage-job-ad-search/managed-job-ad-search.guard';
import { SharedModule } from '../../shared/shared.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { ManageJobAdDetailGuard } from './manage-job-ad-detail/manage-job-ad-detail.guard';
import { SharedJobAdvertisementModule } from '../shared/shared-job-advertisement.module';
import { FilterManagedJobAdsComponent } from './manage-job-ad-search/filter-managed-job-ads/filter-managed-job-ads.component';
import { WidgetsModule } from '../../widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('manageJobAds', manageJobAdsReducer),
    EffectsModule.forFeature([ManageJobAdsEffects]),
    SharedModule,
    InfiniteScrollModule,
    ManageJobAdsRoutingModule,
    SharedJobAdvertisementModule,
    NgbPopoverModule,
    WidgetsModule
  ],
  declarations: [
    ManageJobAdSearchComponent,
    ManageJobAdDetailComponent,
    FilterManagedJobAdsComponent,
  ],
  providers: [
    ModalService,
    ManageJobAdDetailGuard,
    ManagedJobAdSearchGuard,
  ],
  entryComponents: [
    FilterManagedJobAdsComponent
  ]
})
export class ManageJobAdsModule {
}

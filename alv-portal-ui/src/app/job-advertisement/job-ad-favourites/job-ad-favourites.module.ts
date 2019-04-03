import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { JobAdFavouritesRoutingModule } from './job-ad-favourites-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SharedJobAdvertisementModule } from '../shared/shared-job-advertisement.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { jobAdSearchReducer } from '../job-ad-search/state-management/reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobAdFavouritesRoutingModule,
    InfiniteScrollModule,
    WidgetsModule,
    SharedJobAdvertisementModule
  ],
  declarations: [
    JobSearchComponent,
    FilterPanelComponent,
    JobDetailComponent,
    ComplaintModalComponent
  ],
  entryComponents: [
    ComplaintModalComponent
  ],
  providers: [
    JobSearchFilterParameterService,
    JobDetailGuard,
    JobSearchGuard,
    JobFingerprintGuard,
    ModalService
  ]
})
export class JobAdFavouritesModule {
}

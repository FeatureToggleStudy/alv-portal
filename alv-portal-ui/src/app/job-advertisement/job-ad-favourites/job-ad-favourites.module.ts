import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { JobAdFavouritesRoutingModule } from './job-ad-favourites-routing.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SharedJobAdvertisementModule } from '../shared/shared-job-advertisement.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { JobAdFavouritesComponent } from './job-ad-favourites/job-ad-favourites.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { jobAdFavouritesReducer } from './state-management/reducers';
import { JobAdFavouritesEffects } from './state-management/effects';
import { JobAdFavouriteDetailComponent } from './job-ad-favourite-detail/job-ad-favourite-detail.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('jobAdFavourites', jobAdFavouritesReducer),
    EffectsModule.forFeature([JobAdFavouritesEffects]),
    SharedModule,
    JobAdFavouritesRoutingModule,
    InfiniteScrollModule,
    WidgetsModule,
    SharedJobAdvertisementModule
  ],
  declarations: [
    JobAdFavouritesComponent,
    JobAdFavouriteDetailComponent
  ],
  entryComponents: [],
  providers: [
    ModalService
  ]
})
export class JobAdFavouritesModule {
}

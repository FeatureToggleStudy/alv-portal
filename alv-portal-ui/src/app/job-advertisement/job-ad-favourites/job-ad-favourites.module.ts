import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { JobAdFavouritesRoutingModule } from './job-ad-favourites-routing.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SharedJobAdvertisementModule } from '../shared/shared-job-advertisement.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { JobAdFavouritesComponent } from './job-ad-favourites/job-ad-favourites.component';

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
  JobAdFavouritesComponent],
  entryComponents: [
  ],
  providers: [
    ModalService
  ]
})
export class JobAdFavouritesModule {
}

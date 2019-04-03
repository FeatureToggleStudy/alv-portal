import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobAdFavouritesGuard } from './job-ad-favourites/job-ad-favourites.guard';
import { JobAdFavouritesComponent } from './job-ad-favourites/job-ad-favourites.component';
import { JobAdFavouriteDetailComponent } from './job-ad-favourite-detail/job-ad-favourite-detail.component';

const routes: Routes = [
  {
    path: '',
    component: JobAdFavouritesComponent,
    canActivate: [JobAdFavouritesGuard]
  },
  {
    path: ':id',
    component: JobAdFavouriteDetailComponent,
    canActivate: [JobAdFavouritesGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})

export class JobAdFavouritesRoutingModule {
}

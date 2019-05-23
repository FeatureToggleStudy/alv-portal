import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from '../../core/auth/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: JobAdFavouritesComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      collapseNavigation: true
    }
  },
  {
    path: ':id',
    component: JobAdFavouriteDetailComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      collapseNavigation: true
    }
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

export class WorkEffortsRoutingModule {
}

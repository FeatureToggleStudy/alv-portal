import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from '../../core/auth/authenticated.guard';
import { JobAdSearchProfilesComponent } from './job-ad-search-profiles/job-ad-search-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: JobAdSearchProfilesComponent,
    canActivate: [AuthenticatedGuard]
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

export class JobAdSearchProfilesRoutingModule {
}

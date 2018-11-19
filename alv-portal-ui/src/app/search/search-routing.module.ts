import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSearchPageComponent } from './pages/job-search-page/job-search-page.component';

const routes: Routes = [
  {
    path: 'job',
    component: JobSearchPageComponent
  },
  {
    path: '**',
    redirectTo: 'job'
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

export class SearchRoutingModule {
}

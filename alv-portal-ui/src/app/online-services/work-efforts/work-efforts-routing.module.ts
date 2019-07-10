import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkEffortsOverviewComponent } from './work-efforts/work-efforts-overview.component';
import { WorkEffortFormComponent } from './work-effort-form/work-effort-form.component';
import { WorkEffortFormGuard } from './work-effort-form/work-effort-form.guard';
import { WorkEffortFormResolverService } from './work-effort-form/work-effort-form-resolver.service';
import { AuthenticatedGuard } from '../../core/auth/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkEffortsOverviewComponent,
    data: {
      collapseNavigation: true
    }
  },
  {
    path: 'edit/:proof-id/:id',
    component: WorkEffortFormComponent,
    canActivate: [AuthenticatedGuard],
    canDeactivate: [WorkEffortFormGuard],
    data: {
      collapseNavigation: true,
      scrollToTop: true
    },
    resolve: {
      initialFormValue: WorkEffortFormResolverService
    },
  },
  {
    path: 'create',
    component: WorkEffortFormComponent,
    canActivate: [AuthenticatedGuard],
    canDeactivate: [WorkEffortFormGuard],
    data: {
      collapseNavigation: true,
      scrollToTop: true
    },
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

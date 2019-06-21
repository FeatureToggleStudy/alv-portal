import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkEffortsComponent } from './work-efforts/work-efforts.component';
import { WorkEffortFormComponent } from './work-effort-form/work-effort-form.component';
import { WorkEffortFormGuard } from './work-effort-form/work-effort-form.guard';
import { WorkEffortFormResolverService } from './work-effort-form/work-effort-form-resolver.service';
import { AuthenticatedGuard } from '../../core/auth/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkEffortsComponent,
    data: {
      collapseNavigation: true
    }
  },
  {
    path: 'edit/:report-id/:id',
    component: WorkEffortFormComponent,
    canActivate: [AuthenticatedGuard],
    canDeactivate: [WorkEffortFormGuard],
    data: {
      collapseNavigation: true
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
      collapseNavigation: true
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

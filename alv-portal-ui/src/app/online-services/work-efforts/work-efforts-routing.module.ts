import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from '../../core/auth/authenticated.guard';
import { WorkEffortsComponent } from './work-efforts/work-efforts.component';
import { WorkEffortFormComponent } from './work-effort-form/work-effort-form.component';
import { WorkEffortFormGuard } from './work-effort-form/work-effort-form.guard';
import { WorkEffortFormResolverService } from './work-effort-form/work-effort-form-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: WorkEffortsComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      collapseNavigation: true
    }
  },
  {
    path: 'edit/:id',
    component: WorkEffortFormComponent,
    canActivate: [AuthenticatedGuard],
    canDeactivate: [WorkEffortFormGuard],
    data: {
      collapseNavigation: true
    },
    resolve: {
      initialFormValueConfig: WorkEffortFormResolverService
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
    resolve: {
      initialFormValueConfig: WorkEffortFormResolverService
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
